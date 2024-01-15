import {HTMLComponent} from "./HTMLComponent";
import {createElement} from "../util";
import {TaskList} from "./TaskList";
import {AddTaskWidget} from "./AddTaskWidget";

export class Board extends HTMLComponent {

    is(element) {
        return this.container === element
    }

    moveTask(element, before) {
        return this.taskList.moveTask(element, before);
    }

    get template() {
        const { title } = this.options;

        return createElement('div', { className: 'board' },
            createElement('h2', { className: 'board__title' }, title ),
            createElement('div', { className: 'board__tasks' }),
            createElement('div', { className: 'board__controls' }),
        );
    }

    render() {
        super.render();

        const tasksContainer = this.container.querySelector('.board__tasks');
        const controlsContainer = this.container.querySelector('.board__controls');

        this.taskList = TaskList.of(tasksContainer).render()

        AddTaskWidget
            .of(controlsContainer, {
                onAdd: this.taskList.addTask
            })
            .render();

        return this;
    }
}