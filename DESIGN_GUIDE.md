# 🎨 EchoCalc Design Guide

## Brand Identity

### Logo Philosophy
The EchoCalc logo represents the fusion of **voice technology** and **mathematical computation** in a futuristic AI aesthetic.

#### Logo Elements
1. **Microphone + Calculator Icon**
   - Rectangular calculator body with button grid
   - Microphone elements on top
   - Sound wave arcs surrounding the icon

2. **Color Scheme**
   - **Neon Blue** (#00f3ff): Intelligence, technology, trust
   - **Neon Purple** (#bf00ff): Innovation, creativity, AI
   - **Dark Background**: Depth, professionalism, modernity

3. **Visual Effects**
   - Glow filters for neon illumination
   - Circuit pattern representing AI neural networks
   - Gradient fills for depth
   - Glassmorphism for modern aesthetics

---

## Color Palette

### Primary Colors

```css
/* Neon Accents */
--neon-blue: #00f3ff;          /* Cyan electric blue */
--neon-purple: #bf00ff;        /* Vibrant magenta */
--neon-blue-dark: #0066ff;     /* Deep blue */
--neon-purple-dark: #7b00ff;   /* Deep purple */

/* Background Gradients */
--bg-gradient-1: #0a0e27;      /* Dark navy */
--bg-gradient-2: #1a0524;      /* Deep purple */
--bg-gradient-3: #0f1c3a;      /* Navy blue */
```

### Glassmorphism

```css
--glass-bg: rgba(10, 14, 39, 0.6);        /* Translucent dark */
--glass-border: rgba(0, 243, 255, 0.15);  /* Neon edge */
--glass-shadow: rgba(0, 243, 255, 0.1);   /* Soft glow */
```

### Text Colors

```css
--text-primary: #ffffff;           /* Pure white */
--text-secondary: rgba(255, 255, 255, 0.85);  /* Off-white */
--text-muted: rgba(255, 255, 255, 0.6);       /* Dimmed */
```

---

## Typography

### Font Family
```
Inter (Google Fonts)
-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

### Font Weights & Usage

| Weight | Usage | Example |
|--------|-------|---------|
| 300 | Light text | Subtle descriptions |
| 400 | Regular | Body text, subtitles |
| 500 | Medium | Button labels |
| 600 | Semibold | Section headers |
| 700 | Bold | Main titles |
| 800 | Extra bold | Logo, CTAs |

### Text Effects

```css
/* Neon Glow Text */
text-shadow: 0 0 20px var(--accent-glow);

/* Letter Spacing */
letter-spacing: 0.5px;  /* Standard */
letter-spacing: 1px;    /* Uppercase subtitles */
```

---

## Layout & Spacing

### Container Structure

```
┌─────────────────────────────────────┐
│         Header Section              │
│  [Logo]  [Title]  [Theme/History]   │
├─────────────────────────────────────┤
│                                     │
│         Display Screen              │
│    Expression + Result              │
│                                     │
├─────────────────────────────────────┤
│     Control Buttons Row             │
│  [Voice] [Clear] [Backspace]        │
├─────────────────────────────────────┤
│                                     │
│      Calculator Button Grid         │
│         4 columns × 5 rows          │
│                                     │
└─────────────────────────────────────┘
```

### Spacing System

```css
/* Margins & Padding */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 20px;
--spacing-2xl: 24px;
--spacing-3xl: 28px;

/* Border Radius */
--radius-sm: 10px;
--radius-md: 12px;
--radius-lg: 14px;
--radius-xl: 18px;
--radius-2xl: 24px;
```

---

## Component Design

### Calculator Buttons

#### Standard Buttons
```css
.btn {
    background: rgba(0, 243, 255, 0.08);
    border: 1px solid rgba(0, 243, 255, 0.15);
    border-radius: 14px;
    padding: 20px;
    font-size: 1.3rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
        0 12px 30px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(0, 243, 255, 0.3);
}
```

#### Operator Buttons
```css
.btn-operator {
    background: rgba(0, 243, 255, 0.15);
    color: #00f3ff;
    border-color: rgba(0, 243, 255, 0.3);
}
```

#### Equals Button (Primary Action)
```css
.btn-equals {
    background: linear-gradient(135deg, #00f3ff, #bf00ff);
    color: white;
    font-weight: 800;
    box-shadow: 0 4px 20px rgba(0, 243, 255, 0.4);
}
```

### Display Screen

```css
.display {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 18px;
    padding: 28px;
    min-height: 140px;
    border: 1px solid rgba(0, 243, 255, 0.15);
    box-shadow: 
        inset 0 2px 15px rgba(0, 0, 0, 0.3),
        0 0 30px rgba(0, 243, 255, 0.1);
}

.result {
    font-size: 2.8rem;
    font-weight: 800;
    text-shadow: 0 0 20px rgba(0, 243, 255, 0.6);
}
```

### Voice Button (Special)

```css
.btn-voice.listening {
    background: rgba(239, 68, 68, 0.25);
    border-color: rgba(239, 68, 68, 0.6);
    animation: pulse 1.5s ease-in-out infinite;
    box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
}

@keyframes pulse {
    0%, 100% { 
        transform: scale(1);
        box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
    }
    50% { 
        transform: scale(1.08);
        box-shadow: 0 0 50px rgba(239, 68, 68, 0.8);
    }
}
```

### Theme Toggle

```css
.theme-toggle {
    background: rgba(0, 243, 255, 0.08);
    border: 1px solid rgba(0, 243, 255, 0.15);
    border-radius: 12px;
    padding: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-toggle:hover {
    transform: translateY(-3px) scale(1.05);
    border-color: #00f3ff;
    box-shadow: 0 8px 25px rgba(0, 243, 255, 0.3);
}
```

---

## Animations

### Gradient Background Shift

```css
@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.background-animation {
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
}
```

### Shimmer Scan Effect

```css
@keyframes shimmerScan {
    0% { transform: translate(-50%, -50%) rotate(45deg); }
    100% { transform: translate(50%, 50%) rotate(45deg); }
}

.display::before {
    animation: shimmerScan 4s linear infinite;
}
```

### Toast Notifications

```css
@keyframes toastIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.toast {
    animation: toastIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Badge Pulse

```css
@keyframes badgePulse {
    0%, 100% { 
        box-shadow: 0 0 20px var(--accent-glow), 0 0 40px var(--purple-glow);
    }
    50% { 
        box-shadow: 0 0 30px var(--accent-glow), 0 0 60px var(--purple-glow);
    }
}

.ai-badge {
    animation: badgePulse 3s ease-in-out infinite;
}
```

---

## Responsive Breakpoints

### Desktop (> 900px)
- Full layout with sidebar
- Large buttons and display
- All features visible

### Tablet (481px - 900px)
- Stacked layout
- Medium-sized buttons
- Slide-up history panel

### Mobile (≤ 480px)
- Compact layout
- Smaller buttons
- Hidden subtitle
- Optimized for touch

---

## Accessibility

### Contrast Ratios
- Normal text: Minimum 4.5:1
- Large text: Minimum 3:1
- UI components: Minimum 3:1

### Focus States
```css
button:focus {
    outline: 2px solid #00f3ff;
    outline-offset: 2px;
}
```

### Interactive Feedback
- Hover states with lift effect
- Active states with scale change
- Loading states with shimmer
- Error states with red glow

---

## Design Principles

### 1. Futuristic Minimalism
- Clean lines and simple geometry
- Limited color palette
- Purposeful animations

### 2. Neon Aesthetics
- Glowing edges and shadows
- Electric blue primary accent
- Vibrant purple secondary accent

### 3. Glassmorphism
- Translucent backgrounds
- Blur effects (backdrop-filter)
- Subtle borders and shadows

### 4. Micro-interactions
- Hover lift effects
- Click feedback
- Smooth transitions
- Loading indicators

### 5. Depth & Layering
- Z-axis hierarchy
- Shadow casting
- Overlapping elements
- Floating panels

---

## Export Assets

### Logo Files
- `logo.svg` - Primary vector logo (200×60)
- Recommended sizes:
  - Header: 50px height
  - Favicon: 32×32, 16×16
  - Social: 1200×630

### Color Profiles
- sRGB for web display
- Hex codes for CSS
- RGBA for transparency

---

<div align="center">

**EchoCalc AI Design System v1.0**

*Futuristic • Minimal • Neon • Glassmorphism*

</div>
