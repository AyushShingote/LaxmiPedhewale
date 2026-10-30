# लक्ष्मी पेढेवाले (Laxmi Pedhewale) – Official Business Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> **"गोडवा परंपरेचा, वारसा शुद्धतेचा..."**  
> १९७१ पासून सुरू झालेला घारगाव, संगमनेर (पुणे-नाशिक महामार्ग) येथील सुप्रसिद्ध कंदी पेढ्यांचा ऐतिहासिक वारसा.

---

## 📌 प्रकल्प परिचय (About the Project)

**लक्ष्मी पेढेवाले (Laxmi Pedhewale)** हे १९७१ मध्ये स्थापित झालेले महाराष्ट्र राज्यातील घारगाव (ता. संगमनेर, जि. अहिल्यानगर/अहमदनगर - पुणे-नाशिक राष्ट्रीय महामार्ग NH 60) येथील अग्रगण्य व सुप्रसिद्ध पेढ्यांचे दुकान आहे.

हे अधिकृत संकेतस्थळ (Official Business Website) दुकानाचा पाच दशकांहून अधिक काळाचा ऐतिहासिक वारसा, अस्सल महाराष्ट्रीयन खाद्यसंस्कृती, शुद्ध म्हशीच्या दुधाचे व खव्याचे पेढे आणि आधुनिक, मोबाइल-प्रथम वापरकर्ता अनुभव (Mobile-First UX) प्रभावीपणे सादर करते.

---

## ✨ प्रमुख वैशिष्ट्ये (Key Features)

### १. द्विभाषिक भाषा प्रणाली (Bilingual Architecture)
- **मराठी प्रथम (Default Marathi)**: संकेतस्थळ उघडताच संपूर्ण मजकूर, हेडिंग्ज व बटणे अस्सल मराठीमध्ये दिसतात.
- **इन्स्टंट भाषा स्विच (मराठी | English)**: हेडरमधील स्विचद्वारे पेज रीलोड न होता सेकंदात भाषा बदलते (`localStorage` द्वारे पसंती सेव्ह केली जाते).
- **SEO-फ्रेंडली ड्युएल URL स्ट्रक्चर**:
  - `/` किंवा `index.html` – मुख्य मराठी मुखपृष्ठ
  - `/en/index.html` – स्वतंत्र इंग्रजी पान (Google Bot crawlable with `hreflang` tags)

### २. डिझाइन आणि टायपोग्राफी (Maharashtrian Heritage Aesthetics)
- **रंगसंगती**: पारंपरिक भगवा (`#C8500C`), राजेशाही सुवर्ण (`#D4AF37`), गडद कुंकुम लाल (`#8E1616`) आणि आयव्हरी क्रीम (`#FAF6EF`).
- **देवनागरी टायपोग्राफी**: Google Fonts (`Noto Sans Devanagari`, `Mukta`, `Rozha One`, `Yatra One`).

### ३. थेट कॉल आणि व्हॉट्सॲप संपर्क (Verified CTAs)
- **अधिकृत संपर्क क्रमांक**:
  - **प्राथमिक संपर्क (Primary)**: `+91 98905 17950`
  - **दुय्यम संपर्क (Secondary)**: `+91 99709 56556`
- **मोबाईल फिक्स बॉटम बार**: समान रुंदी व उंचीचे `आत्ताच कॉल करा` आणि `WHATSAPP` बटन्स.
- **स्मार्ट व्हॉट्सॲप मेसेज**: भाषेनुसार व निवडलेल्या उत्पादनानुसार आपोआप मेसेज भरला जातो.

### ४. स्थानिक SEO आणि Structured Data (Local SEO)
- **JSON-LD Schema Markup**: `schema.org/Bakery` आणि `schema.org/BreadcrumbList` द्वारे बिझनेस माहिती, स्थापना वर्ष (1971), कामाच्या वेळा, जिओ-कोऑर्डिनेट्स व कॅटलॉग समाविष्ट.
- **मेटा टॅग्ज**: OpenGraph (Facebook/WhatsApp), Twitter Cards, Sitemap आणि Robots.txt.

---

## 📁 फोल्डर रचना (Project Structure)

```
LaxmiPedhewale/
├── index.html                  # मुख्य मराठी मुखपृष्ठ (Default Marathi Homepage)
├── en/
│   └── index.html              # इंग्रजी आवृत्ती (English Homepage)
├── sitemap.xml                 # XML Sitemap (hreflang mr-IN, en-IN & x-default)
├── robots.txt                  # Robots.txt (Search Engine Directives)
├── site.webmanifest            # Web App Manifest
├── assets/
│   ├── css/
│   │   └── style.css           # Responsive Design System & Heritage Styling
│   ├── js/
│   │   └── main.js             # Language Switcher, Lightbox & Dynamic WhatsApp
│   └── images/                 # Official Photographs & Optimized WebP Assets
│       ├── brand-logo.webp     # Official Trademarked Mascot Emblem
│       ├── shop-exterior.webp  # Pune-Nashik Highway Storefront Photo
│       ├── kandi-pedha-box.webp# Pedhas & Official Packaging Box
│       ├── kandi-pedha-closeup.webp # Golden Kandi Pedhas Close-up
│       ├── packaging-box-closeup.webp # Buffalo Milk Pedha Box
│       ├── product-shrimant-pedha.webp # Royal Shrimant Pedha
│       ├── product-basundi.webp # Saffron Basundi in Brass Bowl
│       ├── product-khava.webp  # Pure Fresh Khava (Mawa)
│       └── favicon.png         # Brand Favicon
└── README.md
```

---

## 🚀 स्थानिक पातळीवर कसे चालवायचे (How to Run Locally)

कोणत्याही लायब्ररी किंवा पॅकेज इन्स्टॉलेशनची गरज नाही (Zero Dependencies):

1. **ब्राउझरमध्ये थेट उघडा**:
   `index.html` फाईलवर डबल-क्लिक करा.
2. **VS Code Live Server**:
   VS Code मध्ये फोल्डर उघडून `Go Live` वर क्लिक करा.
3. **Python Local Server**:
   ```bash
   python -m http.server 8000
   ```
   ब्राउझरमध्ये `http://localhost:8000` उघडा.

---

## 🌐 डिप्लॉयमेंट (Deployment)

- **GitHub Pages**:
  - `Settings` > `Pages` वर जा.
  - `Source` म्हणून `Deploy from a branch` निवडा.
  - Branch: `main` (किंवा `master`), folder: `/ (root)`.
  - Save करा – संकेतस्थळ लाईव्ह होईल!
- **Netlify / Vercel**:
  - हे फोल्डर थेट Netlify वर ड्रॅग आणि ड्रॉप करून सेकंदात डिप्लॉय करता येते.

---

## 📞 संपर्क (Contact & Store Location)

- **दुकान**: लक्ष्मी पेढेवाले (Laxmi Pedhewale)
- **पत्ता**: पुणे-नाशिक महामार्ग (NH 60), घारगाव, ता. संगमनेर, जि. अहिल्यानगर, महाराष्ट्र - ४२२६२०
- **प्राथमिक फोन / WhatsApp**: [+91 98905 17950](tel:+919890517950)
- **दुय्यम फोन**: [+91 99709 56556](tel:+919970956556)
- **वेळ**: दररोज सकाळी ७:०० ते रात्री ११:०० (सोमवार - रविवार)

---

&copy; 2026 Laxmi Pedhewale. All Rights Reserved.
