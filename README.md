>Scroll for English

# Fraktal Ağaç Görselleştirici 🌳

Uygulamaya erişmek için [buraya tıklayın](https://u33549.github.io/Fractal-Tree/) veya `index.html` dosyasını bir tarayıcıda açabilirsiniz.

Fraktal Ağaç Görselleştirici, tamamen tarayıcıda çalışan, interaktif bir web uygulamasıdır. Farklı parametrelerle fraktal ağaçlar oluşturmanıza ve ağacı dilediğiniz gibi özelleştirmenize olanak tanır. Tüm ayarlarınız tarayıcınızda saklanır ve uygulama çevrimdışı olarak da kullanılabilir.

**Fraktal Ağaç Nedir?**  
Fraktal ağaçlar, doğadaki ağaçların dallanma yapısını matematiksel olarak modelleyen, her dalın kendisinin daha küçük bir kopyasını oluşturduğu, tekrar eden (fraktal) yapılardır. Bu uygulama ile, matematiksel olarak sonsuza kadar devam edebilecek bu yapının farklı varyasyonlarını görselleştirebilir ve kendi fraktal ağacınızı oluşturabilirsiniz.

---

## Özellikler ✨

* **Tamamen Özelleştirilebilir Fraktal Ağaç:** Ağacın görünümünü etkileyen tüm parametreleri kolayca değiştirebilirsiniz.
* **Gerçek Zamanlı Önizleme:** Yaptığınız değişiklikler anında ağaca yansır.
* **Çoklu Dil Desteği:** Türkçe, İngilizce, Almanca, Fransızca ve Arapça arayüz desteği.
* **Duyarlı Tasarım:** Masaüstü ve mobil cihazlarda uyumlu arayüz.
* **Ayarları Sıfırlama:** Her parametreyi ayrı ayrı veya tüm ayarları tek tuşla varsayılana döndürebilirsiniz.
* **Tarayıcıda Saklama:** Ayarlarınız otomatik olarak kaydedilir ve tekrar giriş yaptığınızda korunur.
* **Animasyonlu Çizim:** Ağacın çizilme süresini ayarlayarak animasyonlu şekilde oluşmasını izleyebilirsiniz.

---

## Parametreler ve Açıklamaları 🌱

Aşağıdaki tüm parametreler sol menüden değiştirilebilir:

- **Ana Renk (Main Color):** Ağacın ana gövde ve dallarının rengini belirler.
- **Uzunluk (Length):** Ana gövdenin başlangıç uzunluğunu ayarlar.
- **Açı (Angle):** Ana gövdenin başlangıç açısını belirler.
- **Dal Genişliği (Branch Width):** Gövde ve dalların kalınlığını ayarlar.
- **Derinlik (Depth):** Ağacın kaç defa dallanacağını (yani kaç seviye fraktal oluşturulacağını) belirler. Daha yüksek değerler daha karmaşık ağaçlar üretir.
- **Ağaç Tipi (Tree Type):** Düz (Straight) veya eğri (Curved) dallı ağaçlar arasında seçim yapabilirsiniz.
- **Uzunluk Çarpanı (Length Multiplier):** Her yeni dalın bir önceki dala göre ne kadar kısa olacağını belirler (ör. 0.8 değeri, her dalın bir öncekinden %80 uzun olacağı anlamına gelir).
- **Açı Çarpanı (Angle Multiplier):** Dalların ayrılma açısının her seviyede nasıl değişeceğini belirler.
- **Dal Genişliği Çarpanı (Branch Width Multiplier):** Her yeni dalın kalınlığının bir önceki dala göre ne kadar azalacağını ayarlar.
- **Animasyon Süresi (Animation Duration):** Ağacın çizilme hızını milisaniye cinsinden belirler.

Her parametrenin yanında bir sıfırlama butonu bulunur. Ayrıca menüdeki "Reset All Settings" butonuyla tüm ayarları varsayılana döndürebilirsiniz.

---

## Nasıl Kullanılır? 🚀

1. **Uygulamayı Açın:** [Fraktal Ağaç Görselleştirici](https://u33549.github.io/Fractal-Tree/) adresine gidin veya `index.html` dosyasını bir web tarayıcısında açın.
2. **Ayarları Değiştirin:** Sol menüyü açarak renk, uzunluk, açı, derinlik ve diğer parametreleri değiştirin.
3. **Ağaç Tipini Seçin:** Düz veya eğri dallı ağaç tiplerinden birini seçin.
4. **Animasyon Süresini Ayarlayın:** Ağacın çizilme hızını belirleyin.
5. **Sıfırlama:** Her parametrenin yanındaki sıfırla butonunu veya menüdeki "Reset All Settings" butonunu kullanarak ayarları varsayılana döndürebilirsiniz.
6. **Dil Değiştirin:** Sağ üstteki bayrak simgesine tıklayarak arayüz dilini anında değiştirebilirsiniz.

---

## Geliştirme Notları 🛠️

* **Teknolojiler:** HTML, Tailwind CSS, Vanilla JavaScript, Canvas API.
* **Veri Saklama:** Tüm ayarlar tarayıcının `localStorage` alanında tutulur.
* **Çoklu Dil:** Yeni dil eklemek için `lang.js` dosyasındaki `translations` nesnesine yeni bir dil ekleyin.

---

## 🌍 Çoklu Dil Desteği

- 🇹🇷 **Türkçe** (varsayılan)
- 🇬🇧 **İngilizce**
- 🇩🇪 **Almanca**
- 🇫🇷 **Fransızca**
- 🇸🇦 **Arapça**

### 🔽 Dil Nasıl Değiştirilir?

1. Sağ üstteki bayrak simgesine tıklayın.
2. Açılan listeden istediğiniz dili seçin.
3. Seçiminiz kaydedilir ve arayüz anında güncellenir.

---

# Fractal Tree Visualizer 🌳

You can access the app [here](https://u33549.github.io/Fractal-Tree/) or by opening the `index.html` file in your browser.

The Fractal Tree Visualizer is an interactive web application that lets you create and fully customize fractal trees with various parameters. All your settings are saved in your browser, and the app works offline.

**What is a Fractal Tree?**  
A fractal tree is a mathematical structure that models the branching patterns of real trees, where each branch recursively splits into smaller copies of itself. With this app, you can visualize and experiment with different variations of this endlessly repeating structure.

---

## Features ✨

* **Fully Customizable Fractal Tree:** Easily change all parameters that affect the tree's appearance.
* **Live Preview:** All changes are instantly reflected on the tree.
* **Multi-language Support:** Interface available in Turkish, English, German, French, and Arabic.
* **Responsive Design:** Works on both desktop and mobile devices.
* **Reset Settings:** Reset each parameter individually or all at once.
* **Persistent Storage:** Your settings are automatically saved and restored on revisit.
* **Animated Drawing:** Watch the tree being drawn with adjustable animation speed.

---

## Parameters Explained 🌱

All parameters can be adjusted from the side menu:

- **Main Color:** Sets the main color of the tree trunk and branches.
- **Length:** Sets the initial length of the main trunk.
- **Angle:** Sets the initial angle of the trunk.
- **Branch Width:** Sets the thickness of the trunk and branches.
- **Depth:** Determines how many times the tree will branch (i.e., the fractal recursion depth). Higher values create more complex trees.
- **Tree Type:** Choose between straight or curved branches.
- **Length Multiplier:** Determines how much shorter each new branch will be compared to the previous one (e.g., 0.8 means each branch is 80% the length of its parent).
- **Angle Multiplier:** Controls how the branch split angle changes at each level.
- **Branch Width Multiplier:** Sets how much thinner each new branch will be compared to the previous one.
- **Animation Duration:** Sets how fast the tree is drawn, in milliseconds.

Each parameter has a reset button next to it. You can also use the "Reset All Settings" button in the menu to restore all defaults.

---

## How to Use? 🚀

1. **Open the App:** Go to [Fractal Tree Visualizer](https://u33549.github.io/Fractal-Tree/) or open `index.html` in your web browser.
2. **Adjust Settings:** Use the side menu to change color, length, angle, depth, and other parameters.
3. **Select Tree Type:** Choose between straight or curved branches.
4. **Set Animation Duration:** Control how fast the tree is drawn.
5. **Reset:** Use the reset button next to each parameter or the "Reset All Settings" button to restore defaults.
6. **Change Language:** Click the flag icon in the top-right corner to instantly change the interface language.

---

## Development Notes 🛠️

* **Technologies:** HTML, Tailwind CSS, Vanilla JavaScript, Canvas API.
* **Data Storage:** All settings are stored locally in the browser's `localStorage`.
* **Multi-language:** To add a new language, add it to the `translations` object in `lang.js`.

---

## 🌍 Multi-Language Support

- 🇹🇷 **Turkish** (default)
- 🇬🇧 **English**
- 🇩🇪 **German**
- 🇫🇷 **French**
- 🇸🇦 **Arabic**

### 🔽 How to Change Language?

1. Click the flag icon in the top-right corner.
2. Select your preferred language from the dropdown.
3. Your choice is saved and the interface updates instantly.