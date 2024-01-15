import {HTMLComponent} from "./HTMLComponent";
import {createElement} from "../util";
import {Task} from "./Task";

export class TaskList extends HTMLComponent {
    constructor(parent, options) {
        super(parent, options);

        this.addTask = this.addTask.bind(this);
        this.moveTask = this.moveTask.bind(this);
    }

    get template() {
        return createElement('div', { className: 'task-list' })
    }

    moveTask(task, existingTask) {
        if (!existingTask) {
            this.container.append(task);
            return;
        }

        this.container.insertBefore(task, existingTask);
    }

    addTask({ value }) {
        Task.of(this.container, { title: value }).render()
    }
}