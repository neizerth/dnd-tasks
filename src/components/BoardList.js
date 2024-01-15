import { HTMLComponent } from './HTMLComponent';
import {createElement} from "../util";
import {Board} from "./Board";

export class BoardList extends HTMLComponent {
    constructor(parent, options) {
        super(parent, options);

        this.moveTask = this.moveTask.bind(this);
    }

    findBoard(element) {
        return this.boards.find(board => board.is(element));
    }

    moveTask(options) {
        const { target, item, originalItem} = options;
        const board = this.findBoard(target);
        board.moveTask(originalItem, item);
    }

    get template() {
        return createElement('div', { className: 'board-list' })
    }

    render() {
        const { boards = []} = this.options
        super.render();

        this.boards = boards.map(options =>
            Board
                .of(this.container, options)
                .render()
        );

        return this;
    }
}