// UI related code

function hexToHsl(hex) {
    let r = 0, g = 0, b = 0;
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

// Centralized default settings
const DEFAULT_SETTINGS = {
    mainColor: '#850005',
    length: 100,
    angle: 0,
    branchWidth: 10,
    depth: 12,
    treeType: 'd',
    lengthMultiplier: 0.8,
    angleMultiplier: 0.8,
    branchWidthMultiplier: 0.9,
    animationDuration: 1000
};

function setupSlidersAndUI(options) {
    var onParamsChange = options.onParamsChange;
    var onMenuOpen = options.onMenuOpen;
    var onMenuClose = options.onMenuClose;

    // Get all UI elements
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

    // Update slider value display
    function updateSliderValue(slider, valueSpan) {
        if (valueSpan) {
            valueSpan.textContent = slider.value;
        }
    }

    // Add input listeners to sliders for instant value update and saving
    [lengthSlider, angleSlider, branchWidthSlider, depthSlider,
        lengthMultiplierSlider, angleMultiplierSlider, branchWidthMultiplierSlider
    ].forEach(function(slider) {
        var span = document.getElementById(slider.id.replace("Slider", "Value"));
        slider.addEventListener("input", function() {
            updateSliderValue(slider, span);
            saveSettings();
            onParamsChange();
        });
    });

    // Color picker event
    mainColorPicker.addEventListener("input", function() {
        saveSettings();
        onParamsChange();
    });

    // Animation duration slider event
    animationDurationSlider.addEventListener("input", function() {
        animationDurationValue.textContent = animationDurationSlider.value;
        saveSettings();
        onParamsChange();
    });

    // Tree type radio buttons event
    [typeStraightRadio, typeCurvedRadio].forEach(function(r) {
        r.addEventListener("change", function() {
            saveSettings();
            onParamsChange();
        });
    });

    // Menu open/close logic
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

    // Initialize slider values on load
    updateSliderValue(lengthSlider, lengthValue);
    updateSliderValue(angleSlider, angleValue);
    updateSliderValue(branchWidthSlider, branchWidthValue);
    updateSliderValue(depthSlider, depthValue);
    updateSliderValue(lengthMultiplierSlider, lengthMultiplierValue);
    updateSliderValue(angleMultiplierSlider, angleMultiplierValue);
    updateSliderValue(branchWidthMultiplierSlider, branchWidthMultiplierValue);
    animationDurationValue.textContent = animationDurationSlider.value;

    // Save settings to localStorage
    function saveSettings() {
        var settings = {
            mainColor: mainColorPicker.value,
            length: lengthSlider.value,
            angle: angleSlider.value,
            branchWidth: branchWidthSlider.value,
            depth: depthSlider.value,
            treeType: typeStraightRadio.checked ? 'd' : 'c',
            lengthMultiplier: lengthMultiplierSlider.value,
            angleMultiplier: angleMultiplierSlider.value,
            branchWidthMultiplier: branchWidthMultiplierSlider.value,
            animationDuration: animationDurationSlider.value
        };
        localStorage.setItem('treeSettings', JSON.stringify(settings));
    }

    // Load settings from localStorage or use defaults
    function loadSettings() {
        var savedSettings = localStorage.getItem('treeSettings');
        if (savedSettings) {
            var settings = JSON.parse(savedSettings);

            mainColorPicker.value = settings.mainColor || DEFAULT_SETTINGS.mainColor;
            lengthSlider.value = settings.length || DEFAULT_SETTINGS.length;
            angleSlider.value = settings.angle || DEFAULT_SETTINGS.angle;
            branchWidthSlider.value = settings.branchWidth || DEFAULT_SETTINGS.branchWidth;
            depthSlider.value = settings.depth || DEFAULT_SETTINGS.depth;

            if (settings.treeType === 'c') {
                typeCurvedRadio.checked = true;
            } else {
                typeStraightRadio.checked = true;
            }

            lengthMultiplierSlider.value = settings.lengthMultiplier || DEFAULT_SETTINGS.lengthMultiplier;
            angleMultiplierSlider.value = settings.angleMultiplier || DEFAULT_SETTINGS.angleMultiplier;
            branchWidthMultiplierSlider.value = settings.branchWidthMultiplier || DEFAULT_SETTINGS.branchWidthMultiplier;
            animationDurationSlider.value = settings.animationDuration || DEFAULT_SETTINGS.animationDuration;

            // Update value displays
            updateSliderValue(lengthSlider, lengthValue);
            updateSliderValue(angleSlider, angleValue);
            updateSliderValue(branchWidthSlider, branchWidthValue);
            updateSliderValue(depthSlider, depthValue);
            updateSliderValue(lengthMultiplierSlider, lengthMultiplierValue);
            updateSliderValue(angleMultiplierSlider, angleMultiplierValue);
            updateSliderValue(branchWidthMultiplierSlider, branchWidthMultiplierValue);
            animationDurationValue.textContent = animationDurationSlider.value;
        }
    }

    // Load settings on page load
    loadSettings();

    // Add event listeners to reset buttons
    var resetButtons = document.querySelectorAll('.reset-btn');
    resetButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var resetType = this.getAttribute('data-reset');
            resetSingleSetting(resetType);
        });
    });

    // General reset button event
    var resetAllBtn = document.getElementById('resetAllBtn');
    if (resetAllBtn) {
        resetAllBtn.addEventListener('click', resetAllSettings);
    }

    // Reset a single setting to default
    function resetSingleSetting(settingType) {
        switch (settingType) {
            case 'mainColorPicker':
                mainColorPicker.value = DEFAULT_SETTINGS.mainColor;
                break;
            case 'lengthSlider':
                lengthSlider.value = DEFAULT_SETTINGS.length;
                updateSliderValue(lengthSlider, lengthValue);
                break;
            case 'angleSlider':
                angleSlider.value = DEFAULT_SETTINGS.angle;
                updateSliderValue(angleSlider, angleValue);
                break;
            case 'branchWidthSlider':
                branchWidthSlider.value = DEFAULT_SETTINGS.branchWidth;
                updateSliderValue(branchWidthSlider, branchWidthValue);
                break;
            case 'depthSlider':
                depthSlider.value = DEFAULT_SETTINGS.depth;
                updateSliderValue(depthSlider, depthValue);
                break;
            case 'treeType':
                typeStraightRadio.checked = (DEFAULT_SETTINGS.treeType === 'd');
                typeCurvedRadio.checked = (DEFAULT_SETTINGS.treeType === 'c');
                break;
            case 'lengthMultiplierSlider':
                lengthMultiplierSlider.value = DEFAULT_SETTINGS.lengthMultiplier;
                updateSliderValue(lengthMultiplierSlider, lengthMultiplierValue);
                break;
            case 'angleMultiplierSlider':
                angleMultiplierSlider.value = DEFAULT_SETTINGS.angleMultiplier;
                updateSliderValue(angleMultiplierSlider, angleMultiplierValue);
                break;
            case 'branchWidthMultiplierSlider':
                branchWidthMultiplierSlider.value = DEFAULT_SETTINGS.branchWidthMultiplier;
                updateSliderValue(branchWidthMultiplierSlider, branchWidthMultiplierValue);
                break;
            case 'animationDurationSlider':
                animationDurationSlider.value = DEFAULT_SETTINGS.animationDuration;
                animationDurationValue.textContent = animationDurationSlider.value;
                break;
        }
        saveSettings();
        onParamsChange();
    }

    // Reset all settings to default
    function resetAllSettings() {
        mainColorPicker.value = DEFAULT_SETTINGS.mainColor;

        lengthSlider.value = DEFAULT_SETTINGS.length;
        updateSliderValue(lengthSlider, lengthValue);

        angleSlider.value = DEFAULT_SETTINGS.angle;
        updateSliderValue(angleSlider, angleValue);

        branchWidthSlider.value = DEFAULT_SETTINGS.branchWidth;
        updateSliderValue(branchWidthSlider, branchWidthValue);

        depthSlider.value = DEFAULT_SETTINGS.depth;
        updateSliderValue(depthSlider, depthValue);

        typeStraightRadio.checked = (DEFAULT_SETTINGS.treeType === 'd');
        typeCurvedRadio.checked = (DEFAULT_SETTINGS.treeType === 'c');

        lengthMultiplierSlider.value = DEFAULT_SETTINGS.lengthMultiplier;
        updateSliderValue(lengthMultiplierSlider, lengthMultiplierValue);

        angleMultiplierSlider.value = DEFAULT_SETTINGS.angleMultiplier;
        updateSliderValue(angleMultiplierSlider, angleMultiplierValue);

        branchWidthMultiplierSlider.value = DEFAULT_SETTINGS.branchWidthMultiplier;
        updateSliderValue(branchWidthMultiplierSlider, branchWidthMultiplierValue);

        animationDurationSlider.value = DEFAULT_SETTINGS.animationDuration;
        animationDurationValue.textContent = animationDurationSlider.value;

        saveSettings();
        onParamsChange();
    }

    // Return parameters for drawing
    function getParams() {
        var startX = window.innerWidth / 2;
        var startY;
        if (window.innerWidth > 1400) {
            startY = window.innerHeight * 0.67;
        } else {
            if (window.innerHeight > 899) {
                startY = window.innerHeight * 0.76;
            } else if (window.innerHeight < 900 && window.innerHeight > 800) {
                startY = window.innerHeight * 0.73;
            } else if (window.innerHeight < 801 && window.innerHeight > 680) {
                startY = window.innerHeight * 0.70;
            } else if (window.innerHeight < 681 && window.innerHeight > 600) {
                startY = window.innerHeight * 0.67;
            } else if (window.innerHeight < 601 && window.innerHeight > 540) {
                startY = window.innerHeight * 0.64;
            } else {
                startY = window.innerHeight * 0.6;
            }
        }
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