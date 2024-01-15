import {delay} from "../util";

export class DragController {

    #shiftX = 0;
    #shiftY = 0;
    #_item = null;
    #dragged;
    constructor(options) {
        this.options = options;

        this.#start = this.#start.bind(this);
        this.#stop = this.#stop.bind(this);
        this.#move = this.#move.bind(this);
    }

    static of(options) {
        return new this(options);
    }

    set #item(item) {
        if (!item) {
            this.#dragged.remove();
            this.#_item = null;
            return;
        }

        this.#_item = item;
        this.#dragged = this.#cloneItem(item);
    }

    get #item() {
        return this.#_item;
    }

    #cloneItem(item) {
        const clone = item.cloneNode(true);

        clone.classList.add(this.options.item.draggedClassName);

        const itemStyle = this.#cloneItemStyle(item);

        Object.assign(clone.style, itemStyle);

        document.body.append(clone)

        return clone;
    }

    #cloneItemStyle(item) {
        const px = 'px';
        const { clientWidth, clientHeight } = item;
        const style = getComputedStyle(item);

        const _px = prop => +prop.replace('px', '');

        const width = (clientWidth - _px(style.paddingLeft) - _px(style.paddingRight)) + 'px';
        const height = (clientHeight - _px(style.paddingTop) - _px(style.paddingBottom)) + 'px';

        return {
            width,
            height
        }
    }

    #start = (e) => {
        const { selector } = this.options.item;
        const target = e.target.closest(selector);

        if (!target) {
            return;
        }

        this.#item = target;

        const rect = target.getBoundingClientRect();

        this.#shiftX = e.clientX - rect.left;
        this.#shiftY = e.clientY - rect.top;

        this.#moveDragged(e);
    }

    #move = (e) => {
        if (!this.#item) {
            return;
        }
        e.preventDefault();
        this.#moveDragged(e);
    }

    #moveDragged(mouseEvent) {
        const { pageX, pageY } = mouseEvent;

        const top = pageY - this.#shiftY + 'px';
        const left = pageX - this.#shiftX + 'px';

        Object.assign(this.#dragged.style, {
            left,
            top
        })
    }

    #stop = async (e) => {
        if (!this.#item) {
            return;
        }

        this.#hide();
        await delay(0);

        const element = document
            .elementFromPoint(e.pageX, e.pageY);

        const target = element.closest(this.options.target.selector);

        this.#show();

        if (!target) {
            return;
        }

        const item = element.closest(this.options.item.selector);

        this.options.onDrop({
            originalItem: this.#item,
            target,
            item
        });

        this.#shiftX = 0;
        this.#shiftY = 0;
        this.#item = null;
    }

    #hide() {
        this.#dragged.classList.add('task_hidden')
    }

    #show() {
        this.#dragged.classList.remove('task_hidden')
    }

    init() {
        document.addEventListener('mousedown', this.#start);
        document.addEventListener('mousemove', this.#move);
        document.addEventListener('mouseup', this.#stop);

        return this;
    }
}