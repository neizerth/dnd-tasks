import {HTMLComponent} from "./HTMLComponent";
import {createElement} from "../util";

export class AddTaskWidget extends HTMLComponent {
    constructor(parent, options) {
        super(parent, options);

        this.start = this.start.bind(this);
        this.cancel = this.cancel.bind(this);
        this.add = this.add.bind(this);
    }
    get template() {
        const startButton = createElement('button', {
                type: 'button',
                className: 'add-task__button add-task__button_new'
            },
            'Добавить задачу'
        );

        const addButton = createElement('button', {
                className: 'add-task__button add-task__button_add',
                type: 'button'
            },
            'Добавить'
        );

        const cancelButton = createElement('button', {
                className: 'add-task__button add-task__button_cancel',
                type: 'button'
            },
            'Отменить'
        );

        const form = createElement('form', { className: 'add-task__form' },
            createElement('input', {
                    className: 'add-task__input',
                    placeholder: 'Введите текст задачи'
                }
            ),
            createElement('div', { className: 'add-task__buttons' },
                addButton,
                cancelButton
            )
        );

        startButton.addEventListener('click', this.start);
        cancelButton.addEventListener('click', this.cancel);
        addButton.addEventListener('click', this.add);

        form.addEventListener('submit', this.add);

        return createElement('div', { className: 'add-task' },
            startButton,
            form
        );
    }

    start() {
        this.container.classList.add('add-task_active');
    }

    cancel() {
        this.input.value = '';
        this.container.classList.remove('add-task_active');
    }

    add(e) {
        e.preventDefault();

        const { value } = this.input;

        this.options.onAdd({
            value
        });
        this.cancel();
    }

    render() {
        super.render();

        this.input = this.container.querySelector('.add-task__input');

        return this;
    }
}