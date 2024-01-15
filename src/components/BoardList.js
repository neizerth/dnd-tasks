import { HTMLComponent } from './HTMLComponent';
import {createElement} from "../util";
import {Board} from "./Board";

export class BoardList extends HTMLComponent {
    get template() {
        return createElement('div', { className: 'board-list' })
    }

    render() {
        const { boards = []} = this.options
        super.render();

        boards.forEach(options =>
            Board
                .of(this.container, options)
                .render()
        );

        return this;
    }
}