# 🚀 AI Smart Calculator - Premium Edition

A full-stack premium AI calculator built with Python Flask, featuring voice input/output, glassmorphism UI, and intelligent calculation capabilities.

## ✨ Features

### Core Functionality
- **Basic Calculator**: Addition, subtraction, multiplication, division with decimal support
- **SymPy Math Engine**: Advanced mathematical expression evaluation
- **Voice Input**: Speak your calculations using Web Speech API
- **Voice Output**: Results are spoken aloud using pyttsx3
- **History System**: All calculations saved to SQLite database

### Premium UI/UX
- **Glassmorphism Design**: Modern frosted glass aesthetic
- **Animated Gradient Background**: Smooth color transitions
- **Dark/Light Mode**: Toggle between themes
- **Smooth Animations**: Hover effects and button interactions
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Keyboard Support**: Full keyboard accessibility

## 📁 Project Structure

```
ai-smart-calculator/
│
├── app.py                  # Flask backend server
├── calculator.py           # SymPy calculation engine
├── voice_engine.py         # Text-to-speech module
├── requirements.txt        # Python dependencies
│
├── templates/
│   └── index.html         # Frontend HTML template
│
├── static/
│   ├── style.css          # Glassmorphism styles
│   └── script.js          # Frontend JavaScript
│
└── database/
    └── history.db         # SQLite database (auto-created)
```

## 🛠️ Installation

### Prerequisites
- Python 3.8 or higher
- Modern web browser (Chrome, Edge, Firefox)
- Microphone (for voice input)

### Step 1: Install Dependencies

Navigate to the project directory and install Python packages:

```bash
pip install -r requirements.txt
```

### Step 2: Run the Application

Start the Flask server:

```bash
python app.py
```

The server will start on `http://localhost:5000`

### Step 3: Open in Browser

Open your web browser and navigate to:
```
http://localhost:5000
```

## 🎮 How to Use

### Manual Input
1. Click number buttons (0-9) or use keyboard
2. Click operator buttons (+, -, ×, ÷) or use keyboard
3. Press `=` or Enter to calculate
4. Press `C` or Escape to clear

### Voice Input
1. Click the microphone button 🎤
2. Allow microphone access when prompted
3. Speak your calculation (e.g., "five plus three")
4. The calculator will convert and calculate automatically

### Voice Examples
- "Five plus three" → 5+3
- "Ten divided by two" → 10/2
- "Seven times eight" → 7*8
- "Twenty minus fifteen" → 20-15
- "Two to the power of three" → 2**3

### History Panel
1. Click the clock icon 🕐 to open history
2. View all past calculations
3. Click any item to reuse the expression
4. Use "Clear All" to reset history

### Theme Toggle
Click the sun/moon icon to switch between dark and light modes.

## 🔌 API Endpoints

### POST /calculate
Calculate a mathematical expression

**Request:**
```json
{
  "expression": "5+3"
}
```

**Response:**
```json
{
  "result": "8",
  "success": true,
  "expression": "5+3"
}
```

### GET /history
Get calculation history

**Query Parameters:**
- `limit` (optional): Maximum records to return (default: 50)

**Response:**
```json
{
  "calculations": [
    {
      "id": 1,
      "expression": "5+3",
      "result": "8",
      "timestamp": "2026-03-09T10:30:00"
    }
  ]
}
```

### POST /voice-convert
Convert voice text to mathematical expression

**Request:**
```json
{
  "text": "five plus three"
}
```

**Response:**
```json
{
  "expression": "5+3",
  "success": true
}
```

## 🎨 UI Features

### Glassmorphism Effects
- Frosted glass panels with backdrop blur
- Semi-transparent backgrounds
- Subtle borders and shadows
- Gradient overlays

### Animations
- Gradient background shifts
- Button hover effects
- Pulse animations for voice input
- Smooth sidebar transitions
- Toast notifications

### Responsive Breakpoints
- Desktop: Full layout with sidebar
- Tablet: Compact sidebar
- Mobile: Bottom sheet for history

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 0-9 | Input numbers |
| + - * / | Operators |
| Enter or = | Calculate |
| Escape or C | Clear all |
| Backspace | Delete last character |
| Delete | Clear all |
| ( ) | Parentheses |
| % | Modulo |
| . | Decimal point |

## 🗄️ Database Schema

**Table: calculations**
```sql
CREATE TABLE calculations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    expression TEXT NOT NULL,
    result TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Configuration

### Voice Engine Settings
Located in `voice_engine.py`:
- `rate`: Speech speed (default: 150)
- `volume`: Volume level (default: 0.9)
- `voice`: Voice selection (default: first available)

### Calculator Settings
Located in `calculator.py`:
- Number word mappings
- Operator word mappings
- Supported mathematical functions

## 🐛 Troubleshooting

### Voice Input Not Working
1. Ensure microphone permissions are granted
2. Use a modern browser (Chrome/Edge recommended)
3. Check microphone is connected and working
4. Enable HTTPS if accessing remotely

### Voice Output Not Working
1. Ensure system volume is not muted
2. Check pyttsx3 installation: `pip install pyttsx3`
3. On Windows, ensure SAPI5 is installed
4. Restart the Flask server

### Database Errors
1. Ensure `database/` folder exists
2. Check write permissions
3. Delete `history.db` to recreate

### Server Won't Start
1. Verify Python 3.8+ is installed
2. Install dependencies: `pip install -r requirements.txt`
3. Check port 5000 is not in use
4. Try different port in `app.py`

## 📝 Dependencies

- **Flask** (3.0.0): Web framework
- **SymPy** (1.12): Mathematical engine
- **pyttsx3** (2.90): Text-to-speech

## 🌟 Advanced Features

### Supported Mathematical Operations
- Basic arithmetic: +, -, ×, ÷
- Exponents: x^y
- Parentheses for grouping
- Modulo operations
- Decimal numbers
- Trigonometric functions (via SymPy)
- Logarithms (via SymPy)
- Square roots (via SymPy)

### Voice Recognition Language
Currently set to English (US). To change, modify:
```javascript
recognition.lang = 'en-US'; // In script.js
```

## 📄 License

This project is created for educational purposes. Feel free to use and modify as needed.

## 🤝 Contributing

Suggestions and improvements are welcome! This calculator can be enhanced with:
- More mathematical functions
- Graph plotting capabilities
- Unit conversion
- Currency conversion
- Multiple language support
- Custom themes

## 🎯 Future Enhancements

- [ ] Scientific calculator mode
- [ ] Graph visualization
- [ ] History search functionality
- [ ] Export calculations
- [ ] Cloud sync
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Custom voice commands
- [ ] Calculation history statistics

---

**Built with ❤️ using Python Flask and Modern Web Technologies**

Enjoy your premium AI Smart Calculator! 🎉
