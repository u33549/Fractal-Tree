// UI ile ilgili kodlar

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

function setupSlidersAndUI(options) {
    var onParamsChange = options.onParamsChange;
    var onMenuOpen = options.onMenuOpen;
    var onMenuClose = options.onMenuClose;
    // Tüm UI elementlerini al
    var mainColorPicker = document.getElementById("mainColorPicker");
    var lengthSlider = document.getElementById("lengthSlider");
    var lengthValue = document.getElementById("lengthValue");
    var angleSlider = document.getElementById("angleSlider");
    var angleValue = document.getElementById("angleValue");
    var branchWidthSlider = document.getElementById("branchWidthSlider");
    var branchWidthValue = document.getElementById("branchWidthValue");
    var depthSlider = document.getElementById("depthSlider");
    var depthValue = document.getElementById("depthValue");
    var typeStraightRadio = document.getElementById("typeStraight");
    var typeCurvedRadio = document.getElementById("typeCurved");
    var lengthMultiplierSlider = document.getElementById("lengthMultiplierSlider");
    var lengthMultiplierValue = document.getElementById("lengthMultiplierValue");
    var angleMultiplierSlider = document.getElementById("angleMultiplierSlider");
    var angleMultiplierValue = document.getElementById("angleMultiplierValue");
    var branchWidthMultiplierSlider = document.getElementById("branchWidthMultiplierSlider");
    var branchWidthMultiplierValue = document.getElementById("branchWidthMultiplierValue");
    var animationDurationSlider = document.getElementById("animationDurationSlider");
    var animationDurationValue = document.getElementById("animationDurationValue");
    var sideMenu = document.getElementById("sideMenu");
    var menuToggleButton = document.getElementById("menuToggleButton");
    var closeMenuButton = document.getElementById("closeMenuButton");

    function updateSliderValue(slider, valueSpan) {
        valueSpan.textContent = slider.value;
    }

    [lengthSlider, angleSlider, branchWidthSlider, depthSlider,
        lengthMultiplierSlider, angleMultiplierSlider, branchWidthMultiplierSlider
    ].forEach(function(slider) {
        var span = document.getElementById(slider.id.replace("Slider", "Value"));
        slider.addEventListener("input", function() {
            updateSliderValue(slider, span); // Değer anında güncellensin
            onParamsChange(); // Debounced fonksiyon gelmeli
        });
    });

    mainColorPicker.addEventListener("input", onParamsChange);
    animationDurationSlider.addEventListener("input", function() {
        animationDurationValue.textContent = animationDurationSlider.value;
        onParamsChange();
    });
    [typeStraightRadio, typeCurvedRadio].forEach(function(r) {
        r.addEventListener("change", onParamsChange);
    });

    // Menü açma/kapama
    function openMenu() {
        sideMenu.classList.remove("-translate-x-full");
        menuToggleButton.classList.add("hidden");
        if (onMenuOpen) onMenuOpen();
    }

    function closeMenu() {
        sideMenu.classList.add("-translate-x-full");
        menuToggleButton.classList.remove("hidden");
        if (onMenuClose) onMenuClose();
    }
    menuToggleButton.addEventListener("click", openMenu);
    closeMenuButton.addEventListener("click", closeMenu);
    window.addEventListener("mousedown", function(e) {
        if (!sideMenu.classList.contains("-translate-x-full")) {
            if (!sideMenu.contains(e.target) && e.target !== menuToggleButton) {
                closeMenu();
            }
        }
    });

    // Başlangıçta değerleri güncelle
    updateSliderValue(lengthSlider, lengthValue);
    updateSliderValue(angleSlider, angleValue);
    updateSliderValue(branchWidthSlider, branchWidthValue);
    updateSliderValue(depthSlider, depthValue);
    updateSliderValue(lengthMultiplierSlider, lengthMultiplierValue);
    updateSliderValue(angleMultiplierSlider, angleMultiplierValue);
    updateSliderValue(branchWidthMultiplierSlider, branchWidthMultiplierValue);
    animationDurationValue.textContent = animationDurationSlider.value;

    // Parametreleri döndür
    function getParams() {
        var startX = window.innerWidth / 2;
        var startY = window.innerHeight;
        var length = parseFloat(lengthSlider.value);
        var angle = parseFloat(angleSlider.value);
        var branchWidth = parseFloat(branchWidthSlider.value);
        var selectedHexColor = mainColorPicker.value;
        var hsl = hexToHsl(selectedHexColor);
        var baseHue = hsl[0],
            baseSat = hsl[1],
            baseLight = hsl[2];
        var depth = parseInt(depthSlider.value);
        var type = typeStraightRadio.checked ? typeStraightRadio.value : typeCurvedRadio.value;
        var lengthMultiplier = parseFloat(lengthMultiplierSlider.value);
        var angleMultiplier = parseFloat(angleMultiplierSlider.value);
        var branchWidthMultiplier = parseFloat(branchWidthMultiplierSlider.value);
        var duration = parseInt(animationDurationSlider.value);
        return {
            startX: startX,
            startY: startY,
            length: length,
            angle: angle,
            branchWidth: branchWidth,
            baseHue: baseHue,
            baseSat: baseSat,
            baseLight: baseLight,
            maxDepth: depth,
            type: type,
            lengthMultiplier: lengthMultiplier,
            angleMultiplier: angleMultiplier,
            branchWidthMultiplier: branchWidthMultiplier,
            duration: duration
        };
    }

    return { getParams: getParams, openMenu: openMenu, closeMenu: closeMenu };
}