// Debounce utility to limit how often a function can run
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

// Get the canvas element and set up its properties
var canvas = document.getElementById('board');
setCanvasElements(canvas);

// Function to draw the animated tree using current UI parameters
function drawAnimatedTree() {
    var ui = setupSlidersAndUI({
        onParamsChange: debouncedDrawAnimatedTree
    });
    animateTree(ui.getParams());
}

// Debounced version of drawAnimatedTree for performance
var debouncedDrawAnimatedTree = debounce(drawAnimatedTree, 50);

// On window load, resize the canvas and draw the tree
window.onload = function() {
    resizeCanvas();
    drawAnimatedTree();
};

// On window resize, resize the canvas and redraw the tree
window.addEventListener('resize', function() {
    resizeCanvas();
    drawAnimatedTree();
});