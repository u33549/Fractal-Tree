// Canvas and tree drawing functions

var canvas = null;
var ctx = null;

// Set the canvas element and its 2D context
function setCanvasElements(canvasElement) {
    canvas = canvasElement;
    ctx = canvas.getContext("2d");
}

// Generate a random number between min and max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Recursive function to draw the fractal tree
function drawTree(
    startX,
    startY,
    length,
    angle,
    branchWidth,
    hue,
    sat,
    light,
    depth,
    type,
    lengthMultiplier,
    angleMultiplier,
    branchWidthMultiplier
) {
    if (depth <= 0) {
        return;
    }

    // Clamp multipliers to minimum values for stability
    lengthMultiplier = Math.max(0.7, lengthMultiplier);
    angleMultiplier = Math.max(0.5, angleMultiplier);
    branchWidthMultiplier = Math.max(0.5, branchWidthMultiplier);

    ctx.lineWidth = branchWidth;
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = `hsl(${random(hue - 10, hue + 10)},${sat}%,${light}%)`;
    ctx.translate(startX, startY);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.moveTo(0, 0);

    // Draw either a straight or curved branch
    if (type === "d") {
        ctx.lineTo(0, -length);
    } else {
        ctx.quadraticCurveTo(random(-15, 15), -length * 0.5, 0, -length);
    }
    ctx.stroke();

    // Stop recursion if the branch is too short
    if (length < 10) {
        ctx.restore();
        return;
    }

    // Recursively draw left and right branches
    drawTree(
        0, -length,
        length * lengthMultiplier,
        angle - 12.5 * angleMultiplier,
        branchWidth * branchWidthMultiplier,
        hue + 2,
        sat,
        light + 1,
        depth - 1,
        type,
        lengthMultiplier,
        angleMultiplier,
        branchWidthMultiplier
    );
    drawTree(
        0, -length,
        length * lengthMultiplier,
        angle + 12.5 * angleMultiplier,
        branchWidth * branchWidthMultiplier,
        hue + 2,
        sat,
        light + 1,
        depth - 1,
        type,
        lengthMultiplier,
        angleMultiplier,
        branchWidthMultiplier
    );

    ctx.restore();
}

var animationId = 0;

// Animate the tree drawing process by depth
function animateTree(params) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var {
        startX,
        startY,
        length,
        angle,
        branchWidth,
        baseHue,
        baseSat,
        baseLight,
        maxDepth,
        type,
        lengthMultiplier,
        angleMultiplier,
        branchWidthMultiplier,
        duration
    } = params;

    var animationIdLocal = ++animationId;
    var startTime = null;
    var stepTime = duration / maxDepth;

    // Draw the tree up to a certain depth
    function drawDepth(targetDepth) {
        function drawBranch(x, y, len, ang, bw, hue, sat, light, depth) {
            if (depth > targetDepth || depth <= 0) return;
            ctx.save();
            ctx.lineWidth = bw;
            ctx.strokeStyle = `hsl(${random(hue - 10, hue + 10)},${sat}%,${light}%)`;
            ctx.translate(x, y);
            ctx.rotate((ang * Math.PI) / 180);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            if (type === "d") {
                ctx.lineTo(0, -len);
            } else {
                ctx.quadraticCurveTo(random(-15, 15), -len * 0.5, 0, -len);
            }
            ctx.stroke();
            if (len < 10) {
                ctx.restore();
                return;
            }
            drawBranch(0, -len, len * lengthMultiplier, ang - 12.5 * angleMultiplier, bw * branchWidthMultiplier, hue + 2, sat, light + 1, depth - 1);
            drawBranch(0, -len, len * lengthMultiplier, ang + 12.5 * angleMultiplier, bw * branchWidthMultiplier, hue + 2, sat, light + 1, depth - 1);
            ctx.restore();
        }
        drawBranch(startX, startY, length, angle, branchWidth, baseHue, baseSat, baseLight, targetDepth);
    }

    // Animation step function, increases depth over time
    function animateStep(timestamp) {
        if (animationIdLocal !== animationId) return;
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var targetDepth = Math.min(maxDepth, Math.floor(elapsed / stepTime) + 1);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawDepth(targetDepth);
        if (targetDepth < maxDepth) {
            requestAnimationFrame(animateStep);
        }
    }
    requestAnimationFrame(animateStep);
}

// Resize the canvas to fit the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}