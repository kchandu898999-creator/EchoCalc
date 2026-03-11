# 🎙️ EchoCalc AI – Voice Powered Smart Calculator

A futuristic, AI-powered calculator with voice input capabilities and modern glassmorphism UI design.

![EchoCalc Logo](/static/logo.svg)

## ✨ Features

### Core Functionality
- **🎤 Voice Input**: Speak your calculations and let EchoCalc understand and solve them
- **🧮 Advanced Calculations**: Supports complex mathematical expressions including powers, percentages, and parentheses
- **📊 Calculation History**: Track all your calculations with timestamps
- **🌓 Dark/Light Mode**: Toggle between beautiful neon dark theme and clean light theme
- **⌨️ Keyboard Support**: Full keyboard integration for fast typing

### Design Features
- **🎨 Glassmorphism UI**: Modern frosted glass aesthetic
- **💫 Neon Glow Effects**: Futuristic neon blue and purple accents
- **✨ Smooth Animations**: Polished transitions and hover effects
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🔮 Animated Gradients**: Dynamic background color shifts
- **⚡ Micro-interactions**: Satisfying button feedback and visual responses

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- Modern web browser (Chrome, Edge, Firefox, Safari)
- Microphone (for voice input)

### Installation

1. **Clone or download the project**
   ```bash
   cd "ai smart calculator"
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Open in browser**
   Navigate to: `http://127.0.0.1:5000`

## 🎯 Usage Guide

### Basic Operations
- Click buttons or use keyboard to input numbers and operators
- Press `=` or Enter to calculate
- Use voice button for hands-free operation

### Voice Commands
Say mathematical expressions naturally:
- "Five plus three" → 5 + 3
- "Ten divided by two" → 10 / 2
- "Seven times eight" → 7 * 8
- "Two to the power of three" → 2 ** 3
- "Square root of sixteen" → sqrt(16)

### Keyboard Shortcuts
- `0-9`, `+`, `-`, `*`, `/`, `(`, `)`: Input
- `Enter` or `=`: Calculate result
- `Escape`: Clear all
- `Backspace`: Delete last character
- `Delete`: Clear all

## 🎨 Design Philosophy

EchoCalc combines Apple's minimalist aesthetics with OpenAI's futuristic tech style:

### Color Palette
- **Neon Blue**: `#00f3ff` - Primary accent, energy, intelligence
- **Neon Purple**: `#bf00ff` - Secondary accent, creativity, AI
- **Dark Background**: Deep space blues and purples
- **Glassmorphism**: Translucent panels with blur effects

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Usage**: Clean, readable, modern

### Visual Effects
- **Glow Filters**: Neon elements with soft glows
- **Gradient Backgrounds**: Animated color transitions
- **Hover States**: Lift and glow on interaction
- **Sound Waves**: Visual feedback for voice input
- **Circuit Patterns**: AI-themed decorative elements

## 📁 Project Structure

```
ai smart calculator/
├── static/
│   ├── logo.svg          # EchoCalc brand logo
│   ├── style.css         # Futuristic styling
│   └── script.js         # Interactive functionality
├── templates/
│   └── index.html        # Main HTML structure
├── app.py                # Flask backend server
├── calculator.py         # Calculation engine
├── voice_engine.py       # Voice recognition
└── requirements.txt      # Python dependencies
```

## 🔧 Technical Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Advanced animations, gradients, glassmorphism
- **JavaScript (ES6+)**: Interactive logic, Web Speech API

### Backend
- **Flask**: Lightweight Python web framework
- **Web Speech API**: Browser-native voice recognition
- **NumPy**: Advanced mathematical operations

## 🌟 Logo Design

The EchoCalc logo features:
- **Combined Icon**: Microphone + Calculator fusion
- **Sound Waves**: Representing voice input capability
- **AI Circuit Pattern**: Technology and intelligence
- **Neon Gradients**: Futuristic aesthetic
- **Color Scheme**: Blue (trust) + Purple (innovation)

## 🎛️ Customization

### Change Theme Colors
Edit CSS variables in `static/style.css`:
```css
:root {
    --neon-blue: #00f3ff;
    --neon-purple: #bf00ff;
    /* Add custom colors here */
}
```

### Modify Logo
The logo is an SVG file located at `static/logo.svg`. You can edit it in any vector graphics editor.

### Add Sound Effects
Implement actual audio in the JavaScript functions:
```javascript
function playClickSound() {
    const audio = new Audio('/static/sounds/click.mp3');
    audio.play();
}
```

## 🐛 Troubleshooting

### Voice Input Not Working
1. Ensure microphone permissions are granted
2. Use a supported browser (Chrome, Edge recommended)
3. Check microphone connection
4. Speak clearly and at moderate pace

### Display Issues
1. Clear browser cache (Ctrl + Shift + Delete)
2. Ensure modern browser version
3. Check JavaScript console for errors

### Server Won't Start
1. Verify Python 3.8+ is installed
2. Install dependencies: `pip install -r requirements.txt`
3. Check if port 5000 is available
4. Review app.py configuration

## 📱 Browser Compatibility

| Browser | Voice Input | Visual Quality | Performance |
|---------|------------|----------------|-------------|
| Chrome  | ✅ Full    | ⭐⭐⭐⭐⭐         | Excellent   |
| Edge    | ✅ Full    | ⭐⭐⭐⭐⭐         | Excellent   |
| Firefox | ⚠️ Limited | ⭐⭐⭐⭐          | Good        |
| Safari  | ⚠️ Limited | ⭐⭐⭐⭐          | Good        |

## 🔮 Future Enhancements

- [ ] Text-to-speech output (speak results aloud)
- [ ] Advanced scientific functions
- [ ] Customizable themes and color schemes
- [ ] Calculation history export
- [ ] Multi-language support
- [ ] Desktop application version
- [ ] Mobile app (iOS/Android)
- [ ] Cloud sync for history

## 📄 License

This project is created for educational and demonstration purposes.

## 👨‍💻 Credits

**Design & Development**: AI-Powered Full Stack Development
**Concept**: Modern voice-powered calculator with futuristic UI
**Inspiration**: Apple Design Guidelines + OpenAI Interface Style

---

<div align="center">

### 🎙️ EchoCalc AI – The Future of Calculation

**Built with ❤️ and cutting-edge web technologies**

</div>
