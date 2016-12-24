var snabbdom = require('snabbdom');
var eventListeners = require('snabbdom/modules/eventlisteners'); // attaches event listeners
var patch = snabbdom.init([
    require('snabbdom/modules/class'),
    require('snabbdom/modules/props'),
    require('snabbdom/modules/style'),
    require('snabbdom/modules/eventlisteners'),
]);
var h = require('snabbdom/h'); // helper function for creating vnodes
var container = document.getElementById('container');
var vnode = h('div#container.two.classes', { on: { click: someFn } }, [
    h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
    ' and this is just normal text',
    h('br', {}, null),
    ' and this is some other text',
    h('a', { props: { href: '/bar' } }, [
        h('span', null, 'bar')
    ]),
    h('a', { props: { href: '/foo' } }, 'I\'ll take you places!')
]);
// var vnode = <div id="another">
//   <div key={1} on={ {click: someFn} }>
//     <span>10</span>
//   </div>
// </div>
// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode);
function someFn() {
    console.log("someFn");
}
