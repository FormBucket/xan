import {boot} from 'xander';
import routes from './routes';

let debug = process.env.NODE_ENV !== 'production';
let rootEl = document.getElementById('root');

boot({
    rootEl,
    debug,
    routes
});
