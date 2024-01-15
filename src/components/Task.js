import {HTMLComponent} from "./HTMLComponent";
import {createElement} from "../util";

export class Task extends HTMLComponent {
    get template() {
        const { title } = this.options;
        return createElement('div', { className: 'task' }, title);
    }
}