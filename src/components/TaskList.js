import {HTMLComponent} from "./HTMLComponent";
import {createElement} from "../util";
import {Task} from "./Task";

export class TaskList extends HTMLComponent {
    constructor(parent, options) {
        super(parent, options);

        this.addTask = this.addTask.bind(this);
    }

    get template() {
        return createElement('div', { className: 'task-list' })
    }

    addTask({ value }) {
        Task.of(this.container, { title: value }).render()
    }
}