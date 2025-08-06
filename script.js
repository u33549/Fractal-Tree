// import { setCanvasElements, animateTree, resizeCanvas } from './tree-canvas.js';
// import { setupSlidersAndUI } from './ui.js';

function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

var canvas = document.getElementById('board');
setCanvasElements(canvas);

function drawAnimatedTree() {
    var ui = setupSlidersAndUI({
        onParamsChange: debouncedDrawAnimatedTree
    });
    animateTree(ui.getParams());
}

var debouncedDrawAnimatedTree = debounce(drawAnimatedTree, 50);

window.onload = function() {
    resizeCanvas();
    drawAnimatedTree();
};
window.addEventListener('resize', function() {
    resizeCanvas();
    drawAnimatedTree();
});