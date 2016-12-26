var snabbdom = require('snabbdom');
var eventListeners = require('snabbdom/modules/eventlisteners'); // attaches event listeners
var patch = snabbdom.init([ // Init patch function with chosen modules
    require('snabbdom/modules/class'), // makes it easy to toggle classes
    require('snabbdom/modules/props'), // for setting properties on DOM elements
    require('snabbdom/modules/style'), // handles styling on elements with support for animations
    require('snabbdom/modules/eventlisteners'), // attaches event listeners
]);

let ModuleHierarchy = {

}

const addToHierarchy = (moduleId, Module, vnode) => {

    const { model, update, view } = Module;

    ModuleHierarchy[moduleId] = {
        model: model,
        update: update,
        view: view,
        vnode: vnode
    }
}

const upadateHierarchy = (moduleId, newModel, newVnode) => {
    ModuleHierarchy[moduleId]["model"] = newModel;
    ModuleHierarchy[moduleId]["vnode"] = newVnode;
}

const bootstrapFn = (moduleId, Module, mountTarget) => {

    const vnode = Module.view(Module.model);

    addToHierarchy(moduleId, Module, vnode);

    patch(mountTarget, vnode);

}

const updateFn = (moduleId, action) => {

    const Module = ModuleHierarchy[moduleId];

    const newModel = Module.update(Module.model, action);

    const newVnode = Module.view(newModel);

    patch(Module.vnode, newVnode);

    upadateHierarchy(moduleId, newModel, newVnode);

}


const Cyan = {
    bootstrap: bootstrapFn,
    update: updateFn
}


export default Cyan