var h = require('snabbdom/h'); // helper function for creating vnodes
import Cyan from './cyan';

const moudleId = 'App';

// Model
interface Model {
    name: string,
    numbers: Array<Number>
}
const model: Model = initModel();

function initModel() {
    const numbers = [];
    for(let i = 0; i < 1000; i++) numbers.push(i);

    return {
        name: "nithin",
        numbers: numbers
    }
}


// Update

interface Action {
    type: string,
    payload: any
}


function update(model: Model, action: Action): Model {
    const { type, payload } = action;

    switch(type) {
        case "TOGGLE_NAME":
            return model.name == "nithin" ? {
                numbers: model.numbers,
                name: "peter"
            } : {
                numbers: model.numbers,
                name: "nithin"
            };
        case "REVERSE_NUMBERS":
            const numbersRev = [ ...model.numbers ].reverse();
            return {
                numbers: numbersRev,
                name: model.name
            };
        default:

    }
}


// View

interface View {

}

function view(model: Model): View {
    var vnode = h('div#container.two.classes', { }, [
        h('span', { style: { fontWeight: 'bold' }, on: { click: () => Cyan.update(moudleId, {type: "TOGGLE_NAME"}) } }, model.name),
        h('br', {}, {}),
        h('button', { on : { click: () => Cyan.update(moudleId, { type: "REVERSE_NUMBERS" }) } }, 'Reverse'),
        h('div', {}, model.numbers.map((n) => (
            h('div', {}, n)
        )))
    ]);

    return vnode;
}

// App
interface App {
    model: Model,
    update: (Model, Action) => Model,
    view: (Model) => View
}

const App: App = {
    model: model,
    update: update,
    view: view
}

const mountTarget = document.getElementById('container');
Cyan.bootstrap(moudleId, App, mountTarget);