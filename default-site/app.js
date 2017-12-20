import {boot} from 'xander'

let routes = [{
    path: "/",
    load: () => System.import('./home')
}, {
    path: "*",
    component: ((props) => "No Page Found" )
}];

boot({
    rootEl: document.getElementById('root'),
    debug: true,
    routes
});
