var snabbdom = require('snabbdom');
var patch = snabbdom.init([ // Init patch function with chosen modules
    require('snabbdom/modules/class'), // makes it easy to toggle classes
    require('snabbdom/modules/props'), // for setting properties on DOM elements
    require('snabbdom/modules/style'), // handles styling on elements with support for animations
    require('snabbdom/modules/eventlisteners'), // attaches event listeners
]);
var h = require('snabbdom/h');

import { isArray, isString, isObjectEmpty } from './is';

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

const bootstrapFn = (moduleId, Module, mountTarget?) => {

    if (!mountTarget)
        mountTarget = document.getElementById("cyan-app");

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

const createElementFn = (sel, props?, children?) => {

    if (!isString(sel)) {
        const { view, model, moduleId } = sel;
        const vnode = view(model);

        addToHierarchy(moduleId, sel, vnode);

        return vnode;

    } else {
        
        // Since h function needs children to be an Array
        if (!isString(children) && !isArray(children) && !isObjectEmpty(children)) {
            children = [children];
        }

        return h(sel, props, children);
    }


}


const Cyan = {
    bootstrap: bootstrapFn,
    update: updateFn,
    createElement: createElementFn
}


export default Cyan