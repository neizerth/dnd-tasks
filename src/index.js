import './sass/app.scss';

import boards from './data/boards.json';
import { App } from './App';

const root = document.querySelector('#root');
const options = {
    boards
};

App.of(root, options).init();