// Color utility function
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

// DOM element getter
function getUIElements() {
    return {
        mainColorPicker: document.getElementById("mainColorPicker"),
        lengthSlider: document.getElementById("lengthSlider"),
        lengthValue: document.getElementById("lengthValue"),
        angleSlider: document.getElementById("angleSlider"),
        angleValue: document.getElementById("angleValue"),
        branchWidthSlider: document.getElementById("branchWidthSlider"),
        branchWidthValue: document.getElementById("branchWidthValue"),
        depthSlider: document.getElementById("depthSlider"),
        depthValue: document.getElementById("depthValue"),
        typeStraightRadio: document.getElementById("typeStraight"),
        typeCurvedRadio: document.getElementById("typeCurved"),
        lengthMultiplierSlider: document.getElementById("lengthMultiplierSlider"),
        lengthMultiplierValue: document.getElementById("lengthMultiplierValue"),
        angleMultiplierSlider: document.getElementById("angleMultiplierSlider"),
        angleMultiplierValue: document.getElementById("angleMultiplierValue"),
        branchWidthMultiplierSlider: document.getElementById("branchWidthMultiplierSlider"),
        branchWidthMultiplierValue: document.getElementById("branchWidthMultiplierValue"),
        animationDurationSlider: document.getElementById("animationDurationSlider"),
        animationDurationValue: document.getElementById("animationDurationValue"),
        sideMenu: document.getElementById("sideMenu"),
        menuToggleButton: document.getElementById("menuToggleButton"),
        closeMenuButton: document.getElementById("closeMenuButton"),
        resetAllBtn: document.getElementById('resetAllBtn')
    };
}

// Update slider value display
function updateSliderValue(slider, valueSpan) {
    if (valueSpan) {
        valueSpan.textContent = slider.value;
    }
}

// Save settings to localStorage
function saveSettings(elements) {
    const settings = {
        mainColor: elements.mainColorPicker.value,
        length: elements.lengthSlider.value,
        angle: elements.angleSlider.value,
        branchWidth: elements.branchWidthSlider.value,
        depth: elements.depthSlider.value,
        treeType: elements.typeStraightRadio.checked ? 'd' : 'c',
        lengthMultiplier: elements.lengthMultiplierSlider.value,
        angleMultiplier: elements.angleMultiplierSlider.value,
        branchWidthMultiplier: elements.branchWidthMultiplierSlider.value,
        animationDuration: elements.animationDurationSlider.value
    };
    localStorage.setItem('treeSettings', JSON.stringify(settings));
}

// Load settings from localStorage or use defaults
function loadSettings() {
    let isComplated=localStorage.getItem("treeCompleted");
    if(isComplated !== "true") {
        localStorage.setItem("treeCompleted","true");
        localStorage.removeItem('treeSettings')
        return;
    }

    let elements = getUIElements();
    const savedSettings = localStorage.getItem('treeSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);

        elements.mainColorPicker.value = settings.mainColor || DEFAULT_SETTINGS.mainColor;
        elements.lengthSlider.value = settings.length || DEFAULT_SETTINGS.length;
        elements.angleSlider.value = settings.angle || DEFAULT_SETTINGS.angle;
        elements.branchWidthSlider.value = settings.branchWidth || DEFAULT_SETTINGS.branchWidth;
        elements.depthSlider.value = settings.depth || DEFAULT_SETTINGS.depth;

        if (settings.treeType === 'c') {
            elements.typeCurvedRadio.checked = true;
        } else {
            elements.typeStraightRadio.checked = true;
        }

        elements.lengthMultiplierSlider.value = settings.lengthMultiplier || DEFAULT_SETTINGS.lengthMultiplier;
        elements.angleMultiplierSlider.value = settings.angleMultiplier || DEFAULT_SETTINGS.angleMultiplier;
        elements.branchWidthMultiplierSlider.value = settings.branchWidthMultiplier || DEFAULT_SETTINGS.branchWidthMultiplier;
        elements.animationDurationSlider.value = settings.animationDuration || DEFAULT_SETTINGS.animationDuration;

        // Update value displays
        updateSliderValue(elements.lengthSlider, elements.lengthValue);
        updateSliderValue(elements.angleSlider, elements.angleValue);
        updateSliderValue(elements.branchWidthSlider, elements.branchWidthValue);
        updateSliderValue(elements.depthSlider, elements.depthValue);
        updateSliderValue(elements.lengthMultiplierSlider, elements.lengthMultiplierValue);
        updateSliderValue(elements.angleMultiplierSlider, elements.angleMultiplierValue);
        updateSliderValue(elements.branchWidthMultiplierSlider, elements.branchWidthMultiplierValue);
        elements.animationDurationValue.textContent = elements.animationDurationSlider.value;
    }
}

// Setup slider event listeners
function setupSliderEvents(elements, onParamsChange) {
    const sliders = [
        elements.lengthSlider,
        elements.angleSlider,
        elements.branchWidthSlider,
        elements.depthSlider,
        elements.lengthMultiplierSlider,
        elements.angleMultiplierSlider,
        elements.branchWidthMultiplierSlider
    ];

    sliders.forEach(function(slider) {
        const span = document.getElementById(slider.id.replace("Slider", "Value"));
        slider.addEventListener("input", function() {
            updateSliderValue(slider, span);
            saveSettings(elements);
            onParamsChange();
        });
    });
}

// Setup color picker events
function setupColorPickerEvents(elements, onParamsChange) {
    elements.mainColorPicker.addEventListener("input", function() {
        saveSettings(elements);
        onParamsChange();
    });
}

// Setup animation duration slider events
function setupAnimationEvents(elements, onParamsChange) {
    elements.animationDurationSlider.addEventListener("input", function() {
        elements.animationDurationValue.textContent = elements.animationDurationSlider.value;
        saveSettings(elements);
        onParamsChange();
    });
}

// Setup radio button events
function setupRadioEvents(elements, onParamsChange) {
    [elements.typeStraightRadio, elements.typeCurvedRadio].forEach(function(r) {
        r.addEventListener("change", function() {
            saveSettings(elements);
            onParamsChange();
        });
    });
}

// Menu control functions
function createMenuControls(elements, onMenuOpen, onMenuClose) {
    function openMenu() {
        elements.sideMenu.classList.remove("-translate-x-full");
        elements.menuToggleButton.classList.add("hidden");
        if (onMenuOpen) onMenuOpen();
    }

    function closeMenu() {
        elements.sideMenu.classList.add("-translate-x-full");
        elements.menuToggleButton.classList.remove("hidden");
        if (onMenuClose) onMenuClose();
    }

    return { openMenu, closeMenu };
}

// Setup menu event listeners
function setupMenuEvents(elements, menuControls) {
    elements.menuToggleButton.addEventListener("click", menuControls.openMenu);
    elements.closeMenuButton.addEventListener("click", menuControls.closeMenu);
    
    window.addEventListener("mousedown", function(e) {
        if (!elements.sideMenu.classList.contains("-translate-x-full")) {
            if (!elements.sideMenu.contains(e.target) && e.target !== elements.menuToggleButton) {
                menuControls.closeMenu();
            }
        }
    });
}

// Reset a single setting to default
function resetSingleSetting(settingType, elements, onParamsChange) {
    switch (settingType) {
        case 'mainColorPicker':
            elements.mainColorPicker.value = DEFAULT_SETTINGS.mainColor;
            break;
        case 'lengthSlider':
            elements.lengthSlider.value = DEFAULT_SETTINGS.length;
            updateSliderValue(elements.lengthSlider, elements.lengthValue);
            break;
        case 'angleSlider':
            elements.angleSlider.value = DEFAULT_SETTINGS.angle;
            updateSliderValue(elements.angleSlider, elements.angleValue);
            break;
        case 'branchWidthSlider':
            elements.branchWidthSlider.value = DEFAULT_SETTINGS.branchWidth;
            updateSliderValue(elements.branchWidthSlider, elements.branchWidthValue);
            break;
        case 'depthSlider':
            elements.depthSlider.value = DEFAULT_SETTINGS.depth;
            updateSliderValue(elements.depthSlider, elements.depthValue);
            break;
        case 'treeType':
            elements.typeStraightRadio.checked = (DEFAULT_SETTINGS.treeType === 'd');
            elements.typeCurvedRadio.checked = (DEFAULT_SETTINGS.treeType === 'c');
            break;
        case 'lengthMultiplierSlider':
            elements.lengthMultiplierSlider.value = DEFAULT_SETTINGS.lengthMultiplier;
            updateSliderValue(elements.lengthMultiplierSlider, elements.lengthMultiplierValue);
            break;
        case 'angleMultiplierSlider':
            elements.angleMultiplierSlider.value = DEFAULT_SETTINGS.angleMultiplier;
            updateSliderValue(elements.angleMultiplierSlider, elements.angleMultiplierValue);
            break;
        case 'branchWidthMultiplierSlider':
            elements.branchWidthMultiplierSlider.value = DEFAULT_SETTINGS.branchWidthMultiplier;
            updateSliderValue(elements.branchWidthMultiplierSlider, elements.branchWidthMultiplierValue);
            break;
        case 'animationDurationSlider':
            elements.animationDurationSlider.value = DEFAULT_SETTINGS.animationDuration;
            elements.animationDurationValue.textContent = elements.animationDurationSlider.value;
            break;
    }
    saveSettings(elements);
    onParamsChange();
}

// Reset all settings to default
function resetAllSettings(elements, onParamsChange) {
    elements.mainColorPicker.value = DEFAULT_SETTINGS.mainColor;

    elements.lengthSlider.value = DEFAULT_SETTINGS.length;
    updateSliderValue(elements.lengthSlider, elements.lengthValue);

    elements.angleSlider.value = DEFAULT_SETTINGS.angle;
    updateSliderValue(elements.angleSlider, elements.angleValue);

    elements.branchWidthSlider.value = DEFAULT_SETTINGS.branchWidth;
    updateSliderValue(elements.branchWidthSlider, elements.branchWidthValue);

    elements.depthSlider.value = DEFAULT_SETTINGS.depth;
    updateSliderValue(elements.depthSlider, elements.depthValue);

    elements.typeStraightRadio.checked = (DEFAULT_SETTINGS.treeType === 'd');
    elements.typeCurvedRadio.checked = (DEFAULT_SETTINGS.treeType === 'c');

    elements.lengthMultiplierSlider.value = DEFAULT_SETTINGS.lengthMultiplier;
    updateSliderValue(elements.lengthMultiplierSlider, elements.lengthMultiplierValue);

    elements.angleMultiplierSlider.value = DEFAULT_SETTINGS.angleMultiplier;
    updateSliderValue(elements.angleMultiplierSlider, elements.angleMultiplierValue);

    elements.branchWidthMultiplierSlider.value = DEFAULT_SETTINGS.branchWidthMultiplier;
    updateSliderValue(elements.branchWidthMultiplierSlider, elements.branchWidthMultiplierValue);

    elements.animationDurationSlider.value = DEFAULT_SETTINGS.animationDuration;
    elements.animationDurationValue.textContent = elements.animationDurationSlider.value;

    saveSettings(elements);
    onParamsChange();
}

// Setup reset button events
function setupResetEvents(elements, onParamsChange) {
    const resetButtons = document.querySelectorAll('.reset-btn');
    resetButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const resetType = this.getAttribute('data-reset');
            resetSingleSetting(resetType, elements, onParamsChange);
        });
    });

    if (elements.resetAllBtn) {
        elements.resetAllBtn.addEventListener('click', function() {
            resetAllSettings(elements, onParamsChange);
        });
    }
}

// Initialize slider values
function initializeSliderValues(elements) {
    updateSliderValue(elements.lengthSlider, elements.lengthValue);
    updateSliderValue(elements.angleSlider, elements.angleValue);
    updateSliderValue(elements.branchWidthSlider, elements.branchWidthValue);
    updateSliderValue(elements.depthSlider, elements.depthValue);
    updateSliderValue(elements.lengthMultiplierSlider, elements.lengthMultiplierValue);
    updateSliderValue(elements.angleMultiplierSlider, elements.angleMultiplierValue);
    updateSliderValue(elements.branchWidthMultiplierSlider, elements.branchWidthMultiplierValue);
    elements.animationDurationValue.textContent = elements.animationDurationSlider.value;
}

// Calculate start position based on screen size
function calculateStartPosition() {
    const startX = window.innerWidth / 2;
    let startY;
    
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
    
    return { startX, startY };
}

// Get parameters for drawing
function getParams(elements) {
    const { startX, startY } = calculateStartPosition();
    const length = parseFloat(elements.lengthSlider.value);
    const angle = parseFloat(elements.angleSlider.value);
    const branchWidth = parseFloat(elements.branchWidthSlider.value);
    const selectedHexColor = elements.mainColorPicker.value;
    const hsl = hexToHsl(selectedHexColor);
    const baseHue = hsl[0], baseSat = hsl[1], baseLight = hsl[2];
    const depth = parseInt(elements.depthSlider.value);
    const type = elements.typeStraightRadio.checked ? elements.typeStraightRadio.value : elements.typeCurvedRadio.value;
    const lengthMultiplier = parseFloat(elements.lengthMultiplierSlider.value);
    const angleMultiplier = parseFloat(elements.angleMultiplierSlider.value);
    const branchWidthMultiplier = parseFloat(elements.branchWidthMultiplierSlider.value);
    const duration = parseInt(elements.animationDurationSlider.value);
    
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

// Main setup function - refactored to use separate functions
function setupSlidersAndUI(options) {
    const onParamsChange = options.onParamsChange;
    const onMenuOpen = options.onMenuOpen;
    const onMenuClose = options.onMenuClose;

    // Get all UI elements
    const elements = getUIElements();

    // Create menu controls
    const menuControls = createMenuControls(elements, onMenuOpen, onMenuClose);

    // Setup all event listeners
    setupSliderEvents(elements, onParamsChange);
    setupColorPickerEvents(elements, onParamsChange);
    setupAnimationEvents(elements, onParamsChange);
    setupRadioEvents(elements, onParamsChange);
    setupMenuEvents(elements, menuControls);
    setupResetEvents(elements, onParamsChange);

    // Initialize values and load settings
    initializeSliderValues(elements);

    // Return public methods
    return { 
        getParams: () => getParams(elements), 
        openMenu: menuControls.openMenu, 
        closeMenu: menuControls.closeMenu 
    };
}