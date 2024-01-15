import {HTMLComponent} from "./HTMLComponent";
import {createElement} from "../util";
import {TaskList} from "./TaskList";
import {AddTaskWidget} from "./AddTaskWidget";

export class Board extends HTMLComponent {

    get template() {
        return createElement('div', { className: 'board' },
            createElement('div', { className: 'board__tasks' }),
            createElement('div', { className: 'board__controls' }),
        );
    }

    render() {
        super.render();

        const tasksContainer = this.container.querySelector('.board__tasks');
        const controlsContainer = this.container.querySelector('.board__controls');

        const taskList = TaskList.of(tasksContainer).render()

        AddTaskWidget
            .of(controlsContainer, {
                onAdd: taskList.addTask
            })
            .render();

        return this;
    }
}