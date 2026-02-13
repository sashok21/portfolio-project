# CSS Architecture Documentation

## 🎨 Кольорова палітра

```css
--cyan: #00FFEA       /* Основний акцентний колір */
--black: #000000      /* Фон та текст */
--white: #FFFFFF      /* Світлий текст та фони */
--gray-dark: #333333  /* Темно-сірий */
--gray-medium: #666666 /* Середньо-сірий */
--gray-light: #999999 /* Світло-сірий */
--card-bg: #1a1a1a   /* Фон карток */
```

## 📐 Структура секцій

### 1. Hero Section (.hero)
```
.hero
├── .hero-badge          - Portfolio бейдж
├── .hero-title          - Заголовок "Я ВЛАД"
│   └── .text-cyan       - Бірюзовий акцент
├── .hero-subtitle       - Підзаголовок "графічний дизайнер"
│   └── .text-outline    - Outline ефект
└── .photo-wrapper
    └── .photo-circle
        └── .photo-inner
            └── .profile-photo
```

**Використання:**
- Мінімальна висота: 100vh
- Центрування: flexbox
- Анімація фото: photoFloat (6s)

### 2. Navigation (.nav)
```
.nav
└── .nav-pill
    └── .nav-link        - Навігаційні посилання
        └── .active      - Активний стан
```

**Стани:**
- `.active` - активний пункт (бірюзовий фон)
- `:hover` - hover стан (бірюзовий текст)

### 3. Experience Section (.experience-section)
```
.experience-section
└── .experience-container
    ├── .section-header
    │   └── .section-title
    └── .timeline
        ├── .timeline-line      - Вертикальна лінія
        └── .timeline-item
            ├── .timeline-dot
            ├── .timeline-left
            │   ├── .company-name
            │   └── .period
            └── .timeline-right
                ├── .position-name
                └── .description
```

**Особливості:**
- Grid layout: 2 колонки (1fr 1fr)
- Responsive: стає 1 колонка на mobile
- Timeline dots: 3 кольори (white+cyan, black+cyan, cyan)

### 4. Services Section (.services)
```
.services
└── .container
    ├── .section-title-main
    └── .services-grid
        └── .service-card
            └── .service-image-wrapper
                ├── .service-image
                ├── .service-overlay
                └── .service-content
                    ├── .service-title
                    └── .service-arrow
```

**Grid:**
- Desktop: repeat(auto-fit, minmax(320px, 1fr))
- Gap: 24px
- Card height: 420px

**Hover effects:**
- Transform: translateY(-8px)
- Border: cyan
- Arrow: rotate(45deg) + cyan background

### 5. About Section (.about)
```
.about
└── .container
    ├── .section-title-main
    └── .about-grid
        ├── .about-left
        │   ├── .about-text
        │   ├── .skills-title
        │   └── .skills-grid
        │       └── .skill-item
        │           ├── .skill-icon
        │           └── .skill-name
        └── .about-right
            └── .emoji-container
                ├── .emoji-decoration
                └── .emoji-main
```

**Skills:**
- Size: 88px x 88px
- Background: #0a0a0a
- Hover: cyan + scale(1.05)

**Emoji:**
- Main: 200px font-size
- Decorations: 32px + float animation
- Animation delays: 0s, 0.5s, 1s

### 6. Contact Section (.contact)
```
.contact
└── .container
    ├── .contact-title
    ├── .contact-divider
    ├── .contact-grid (3 columns)
    │   ├── .contact-column
    │   │   ├── .contact-subtitle
    │   │   └── .contact-links
    │   ├── .contact-column
    │   │   ├── .contact-subtitle
    │   │   └── .contact-info
    │   └── .contact-cta
    │       ├── .cta-subtitle
    │       ├── .cta-title
    │       └── .btn-contact
    ├── .social-divider
    └── .social-links
        └── .social-icon
```

**Button:**
```css
.btn-contact {
    background: var(--cyan);
    padding: 14px 32px;
    border-radius: 100px;
}
```

## 🎭 Анімації

### photoFloat
```css
@keyframes photoFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}
```
Використання: .photo-circle (6s ease-in-out infinite)

### float
```css
@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
}
```
Використання: .emoji-decoration (3s ease-in-out infinite)

## 📱 Breakpoints

```css
/* Large Desktop */
@media (min-width: 1200px) { }

/* Tablet */
@media (max-width: 1024px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Small Mobile */
@media (max-width: 480px) { }
```

## 🎯 Utility Classes

```css
.text-cyan          - Бірюзовий колір тексту
.text-outline       - Outline ефект для тексту
.no-data            - Placeholder для порожніх даних
.no-data-small      - Маленький placeholder
```

## 🔧 Transitions

Стандартні transition:
```css
transition: all 0.3s ease;
```

Для transform:
```css
transition: transform 0.3s ease;
```

Для opacity:
```css
transition: opacity 0.4s ease;
```

## 📏 Spacing System

```
Small:   8px, 12px, 16px
Medium:  24px, 32px, 48px
Large:   64px, 80px, 120px
```

## 🎨 Typography

```css
/* Hero Title */
font-size: clamp(48px, 10vw, 128px);
font-weight: 900;
letter-spacing: -0.02em;

/* Section Title */
font-size: clamp(36px, 5vw, 64px);
font-weight: 900;

/* Body Text */
font-size: 16px;
line-height: 1.8;

/* Small Text */
font-size: 14px;
line-height: 1.6;
```

## 🎪 Z-index Layers

```
1000 - Navigation
100  - Service overlays
10   - Timeline dots
1    - Base elements
```

## 💡 Best Practices

1. **Використовуйте CSS змінні** для кольорів
2. **clamp()** для адаптивних розмірів шрифтів
3. **Flexbox** для простих layouts
4. **Grid** для складних layouts
5. **Transform** замість position для анімацій (performance)
6. **will-change** для оптимізації складних анімацій

## 🔍 Доступність

```css
/* Focus states */
a:focus, button:focus {
    outline: 2px solid var(--cyan);
    outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

## 📝 Приклади використання

### Додавання нової секції:
```css
.my-section {
    padding: 80px 0;
}

.my-section .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
}
```

### Створення картки:
```css
.my-card {
    background: var(--card-bg);
    border-radius: 24px;
    padding: 32px;
    transition: all 0.3s ease;
}

.my-card:hover {
    transform: translateY(-8px);
    border-color: var(--cyan);
}
```