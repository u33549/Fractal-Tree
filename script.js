const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

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

    if (type === "d") {
        ctx.lineTo(0, -length);
    } else {
        ctx.quadraticCurveTo(random(-15, 15), -length * 0.5, 0, -length);
    }
    ctx.stroke();

    if (length < 10) {
        ctx.restore();
        return;
    }

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

let animationId = 0;

function animateTree(params) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let currentDepth = 1;
    const {
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
    const stepTime = duration / maxDepth;
    const thisAnimation = ++animationId;

    function drawStep() {
        if (thisAnimation !== animationId) return; // başka bir animasyon başladıysa iptal et
        ctx.save();
        drawTree(
            startX,
            startY,
            length,
            angle,
            branchWidth,
            baseHue,
            baseSat,
            baseLight,
            currentDepth,
            type,
            lengthMultiplier,
            angleMultiplier,
            branchWidthMultiplier
        );
        ctx.restore();
        if (currentDepth < maxDepth) {
            currentDepth++;
            setTimeout(drawStep, stepTime);
        }
    }
    drawStep();
}

// Başlangıçta bir ağaç çiz
// drawTree(
//   canvas.width / 2,
//   canvas.height,
//   110,
//   0,
//   25,
//   0,
//   100,
//   26,
//   10,
//   "d",
//   false,
//   0.8,
//   1.2,
//   0.9
// );

// Diğer kodlar (UI tarafı)
function hexToHsl(hex) {
    let r = 0,
        g = 0,
        b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return [h * 360, s * 100, l * 100];
}

// UI elemanlarını al
const sideMenu = document.getElementById("sideMenu");
const menuToggleButton = document.getElementById("menuToggleButton");
const closeMenuButton = document.getElementById("closeMenuButton");

const mainColorPicker = document.getElementById("mainColorPicker");

const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const angleSlider = document.getElementById("angleSlider");
const angleValue = document.getElementById("angleValue");
const branchWidthSlider = document.getElementById("branchWidthSlider");
const branchWidthValue = document.getElementById("branchWidthValue");
const depthSlider = document.getElementById("depthSlider");
const depthValue = document.getElementById("depthValue");
const typeStraightRadio = document.getElementById("typeStraight");
const typeCurvedRadio = document.getElementById("typeCurved");
const lengthMultiplierSlider = document.getElementById("lengthMultiplierSlider");
const lengthMultiplierValue = document.getElementById("lengthMultiplierValue");
const angleMultiplierSlider = document.getElementById("angleMultiplierSlider");
const angleMultiplierValue = document.getElementById("angleMultiplierValue");
const branchWidthMultiplierSlider = document.getElementById("branchWidthMultiplierSlider");
const branchWidthMultiplierValue = document.getElementById("branchWidthMultiplierValue");

// Animasyon süresi sliderı ve değeri
const animationDurationSlider = document.getElementById("animationDurationSlider");
const animationDurationValue = document.getElementById("animationDurationValue");

animationDurationSlider.addEventListener("input", () => {
    animationDurationValue.textContent = animationDurationSlider.value;
    updateTreeParameters();
});

function updateSliderValue(slider, valueSpan) {
    valueSpan.textContent = slider.value;
}

[lengthSlider, angleSlider, branchWidthSlider, depthSlider,
    lengthMultiplierSlider, angleMultiplierSlider, branchWidthMultiplierSlider
].forEach(slider => {
    const span = document.getElementById(slider.id.replace("Slider", "Value"));
    slider.addEventListener("input", () => {
        updateSliderValue(slider, span);
        updateTreeParameters();
    });
});

mainColorPicker.addEventListener("input", updateTreeParameters);


[typeStraightRadio, typeCurvedRadio].forEach(r => {
    r.addEventListener("change", updateTreeParameters);
});

function updateTreeParameters() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const startX = canvas.width / 2;
    const startY = canvas.height;
    const length = parseFloat(lengthSlider.value);
    const angle = parseFloat(angleSlider.value);
    const branchWidth = parseFloat(branchWidthSlider.value);

    const selectedHexColor = mainColorPicker.value;
    const [baseHue, baseSat, baseLight] = hexToHsl(selectedHexColor);

    const depth = parseInt(depthSlider.value);
    const type = typeStraightRadio.checked ? typeStraightRadio.value : typeCurvedRadio.value;
    const lengthMultiplier = parseFloat(lengthMultiplierSlider.value);
    const angleMultiplier = parseFloat(angleMultiplierSlider.value);
    const branchWidthMultiplier = parseFloat(branchWidthMultiplierSlider.value);
    const duration = parseInt(animationDurationSlider.value);

    animateTree({
        startX,
        startY,
        length,
        angle,
        branchWidth,
        baseHue,
        baseSat,
        baseLight,
        maxDepth: depth,
        type,
        lengthMultiplier,
        angleMultiplier,
        branchWidthMultiplier,
        duration
    });
}

function openMenu() {
    sideMenu.classList.remove("-translate-x-full");
    menuToggleButton.classList.add("hidden");
}

function closeMenu() {
    sideMenu.classList.add("-translate-x-full");
    menuToggleButton.classList.remove("hidden");
}

menuToggleButton.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);

// Menü dışına tıklanınca kapat
window.addEventListener("mousedown", function(e) {
    if (!sideMenu.classList.contains("-translate-x-full")) {
        if (!sideMenu.contains(e.target) && e.target !== menuToggleButton) {
            closeMenu();
        }
    }
});

window.onload = () => {
    updateSliderValue(lengthSlider, lengthValue);
    updateSliderValue(angleSlider, angleValue);
    updateSliderValue(branchWidthSlider, branchWidthValue);
    updateSliderValue(depthSlider, depthValue);
    updateSliderValue(lengthMultiplierSlider, lengthMultiplierValue);
    updateSliderValue(angleMultiplierSlider, angleMultiplierValue);
    updateSliderValue(branchWidthMultiplierSlider, branchWidthMultiplierValue);
    animationDurationValue.textContent = animationDurationSlider.value;
    updateTreeParameters();
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateTreeParameters();
}


window.addEventListener("resize", resizeCanvas);
resizeCanvas();