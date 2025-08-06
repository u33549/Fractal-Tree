// Language selection and translation system

var currentLang = 'tr'; // Default language

// Load language selection from localStorage
function loadLanguage() {
    var savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && (savedLang === 'tr' || savedLang === 'en' || savedLang === 'fr' || savedLang === 'de' || savedLang === 'ar')) {
        currentLang = savedLang;
    }
}

// Load language selection on page load
loadLanguage();

// Translation strings for each language
var translations = {
    tr: {
        title: 'Ağaç Ayarları',
        mainColor: 'Ana Renk:',
        length: 'Uzunluk:',
        angle: 'Açı:',
        branchWidth: 'Dal Genişliği:',
        depth: 'Derinlik:',
        treeType: 'Ağaç Tipi:',
        straight: 'Düz',
        curved: 'Eğri',
        lengthMultiplier: 'Uzunluk Çarpanı:',
        angleMultiplier: 'Açı Çarpanı:',
        branchWidthMultiplier: 'Dal Genişliği Çarpanı:',
        animationDuration: 'Animasyon Süresi (ms):'
    },
    en: {
        title: 'Tree Settings',
        mainColor: 'Main Color:',
        length: 'Length:',
        angle: 'Angle:',
        branchWidth: 'Branch Width:',
        depth: 'Depth:',
        treeType: 'Tree Type:',
        straight: 'Straight',
        curved: 'Curved',
        lengthMultiplier: 'Length Multiplier:',
        angleMultiplier: 'Angle Multiplier:',
        branchWidthMultiplier: 'Branch Width Multiplier:',
        animationDuration: 'Animation Duration (ms):'
    },
    fr: {
        title: 'Paramètres de l\'Arbre',
        mainColor: 'Couleur Principale:',
        length: 'Longueur:',
        angle: 'Angle:',
        branchWidth: 'Largeur de Branche:',
        depth: 'Profondeur:',
        treeType: 'Type d\'Arbre:',
        straight: 'Droit',
        curved: 'Courbé',
        lengthMultiplier: 'Multiplicateur de Longueur:',
        angleMultiplier: 'Multiplicateur d\'Angle:',
        branchWidthMultiplier: 'Multiplicateur de Largeur de Branche:',
        animationDuration: 'Durée d\'Animation (ms):'
    },
    de: {
        title: 'Baum-Einstellungen',
        mainColor: 'Hauptfarbe:',
        length: 'Länge:',
        angle: 'Winkel:',
        branchWidth: 'Astbreite:',
        depth: 'Tiefe:',
        treeType: 'Baumtyp:',
        straight: 'Gerade',
        curved: 'Gebogen',
        lengthMultiplier: 'Längen-Multiplikator:',
        angleMultiplier: 'Winkel-Multiplikator:',
        branchWidthMultiplier: 'Astbreiten-Multiplikator:',
        animationDuration: 'Animationsdauer (ms):'
    },
    ar: {
        title: 'إعدادات الشجرة',
        mainColor: 'اللون الرئيسي:',
        length: 'الطول:',
        angle: 'الزاوية:',
        branchWidth: 'عرض الفرع:',
        depth: 'العمق:',
        treeType: 'نوع الشجرة:',
        straight: 'مستقيم',
        curved: 'منحني',
        lengthMultiplier: 'مضاعف الطول:',
        angleMultiplier: 'مضاعف الزاوية:',
        branchWidthMultiplier: 'مضاعف عرض الفرع:',
        animationDuration: 'مدة الرسوم المتحركة (مللي ثانية):'
    }
};

// Flag icons for each language
var flags = {
    tr: '🇹🇷',
    en: '🇬🇧',
    fr: '🇫🇷',
    de: '🇩🇪',
    ar: '🇸🇦'
};

// Language names for dropdown
var langNames = {
    tr: 'Türkçe',
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    ar: 'العربية'
};

// Create the language selector dropdown in the UI
function createLanguageSelector() {
    // Language selector container
    var langContainer = document.createElement('div');
    langContainer.className = 'fixed top-4 right-4 z-50';
    langContainer.id = 'langSelector';

    // Main language button (shows current flag)
    var langButton = document.createElement('button');
    langButton.className = 'bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 transition-all duration-200';
    langButton.innerHTML = flags[currentLang];
    langButton.id = 'langButton';

    // Dropdown menu for language options
    var dropdown = document.createElement('div');
    dropdown.className = 'absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 hidden';
    dropdown.id = 'langDropdown';

    // Add language options to dropdown
    Object.keys(flags).forEach(function(lang) {
        var langOption = document.createElement('button');
        langOption.className = 'flex items-center w-full px-4 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors duration-150';

        var flagSpan = document.createElement('span');
        flagSpan.textContent = flags[lang];
        flagSpan.className = 'mr-2';

        var nameSpan = document.createElement('span');
        nameSpan.textContent = langNames[lang];

        langOption.appendChild(flagSpan);
        langOption.appendChild(nameSpan);

        langOption.onclick = function() {
            changeLanguage(lang);
        };
        dropdown.appendChild(langOption);
    });

    langContainer.appendChild(langButton);
    langContainer.appendChild(dropdown);
    document.body.appendChild(langContainer);

    // Toggle dropdown on button click
    langButton.onclick = function() {
        dropdown.classList.toggle('hidden');
    };

    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!langContainer.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
}

// Change the language and update UI
function changeLanguage(lang) {
    currentLang = lang;

    // Save language selection to localStorage
    localStorage.setItem('selectedLanguage', lang);

    // Update flag icon
    document.getElementById('langButton').innerHTML = flags[lang];

    // Hide dropdown
    document.getElementById('langDropdown').classList.add('hidden');

    // Apply translations to UI
    applyTranslations();
}

// Apply translations to all relevant UI elements
function applyTranslations() {
    var t = translations[currentLang];

    // Update menu title
    var title = document.querySelector('#sideMenu h2');
    if (title) title.textContent = t.title;

    // Update labels for all controls
    var labels = {
        'mainColorPicker': t.mainColor,
        'lengthSlider': t.length,
        'angleSlider': t.angle,
        'branchWidthSlider': t.branchWidth,
        'depthSlider': t.depth,
        'lengthMultiplierSlider': t.lengthMultiplier,
        'angleMultiplierSlider': t.angleMultiplier,
        'branchWidthMultiplierSlider': t.branchWidthMultiplier,
        'animationDurationSlider': t.animationDuration,
    };

    Object.keys(labels).forEach(function(id) {
        var element = document.querySelector('label[for="' + id + '"]');
        if (element) {
            // If label contains a span, only update the text node, keep the span
            var span = element.querySelector('span');
            if (span) {
                var labelText = labels[id];
                element.childNodes.forEach(function(node) {
                    if (node.nodeType === 3) { // Text node
                        node.textContent = labelText;
                    }
                });
            } else {
                element.textContent = labels[id];
            }
        }
    });

    // Update label with id 'treeTypeLabel'
    var treeTypeLabel = document.getElementById('treeTypeLabel');
    if (treeTypeLabel) {
        treeTypeLabel.textContent = t.treeType;
    }

    // Update radio button labels for tree type
    var typeLabels = document.querySelectorAll('.flex.space-x-4 label span');
    if (typeLabels.length >= 2) {
        typeLabels[0].textContent = t.straight;
        typeLabels[1].textContent = t.curved;
    }
}

// Create language selector and apply translations on page load
window.addEventListener('load', function() {
    createLanguageSelector();
    applyTranslations();
});