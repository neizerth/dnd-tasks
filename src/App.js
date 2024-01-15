import { HTMLComponent } from './components/HTMLComponent';
import { BoardList } from './components/BoardList';

import {createElement} from "./util";
import {DragController} from "./components/DragController";

export class App extends HTMLComponent {
    get template() {
        return createElement('div', { className: 'app' },
            createElement('h1', { className: 'app__title' }, 'Доска задач'),
            createElement('div', { className: 'app__container'})
        );
    }

    init() {
        const { boards } = this.options;
        this.render();

        const boarsContainer = this.container.querySelector('.app__container');
        this.boardList = BoardList.of(boarsContainer, {
           boards
        }).render();

        const options = {
            item: {
                selector: '.task',
                draggedClassName: 'task_dragged'
            },
            target: {
                selector: '.board'
            },
            onDrop: this.boardList.moveTask
        };

        DragController
            .of(options)
            .init();
    }
}