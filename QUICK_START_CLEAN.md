# 🚀 Quick Start Guide - Clean Edition
## EchoCalc AI Calculator

---

## 📁 PROJECT STRUCTURE (Clean)

```
ai smart calculator/
├── app.py                    # Main Flask application
├── calculator.py             # Calculation logic
├── voice_engine.py           # Voice synthesis
├── requirements.txt          # Dependencies
│
├── templates/
│   └── index.html           # Main HTML template
│
├── static/
│   ├── style.css            # Stylesheet
│   ├── script.js            # JavaScript
│   └── logo.svg             # Logo
│
└── database/
    └── history.db           # History storage
```

---

## ⚡ QUICK START (3 Steps)

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Run Application
```bash
python app.py
```

### Step 3: Open Browser
```
http://localhost:5000
```

---

## 🎯 KEY FILES

### Frontend Files
- **`templates/index.html`** - Main UI (only template)
- **`static/style.css`** - All styles (single file)
- **`static/script.js`** - All JavaScript (single file)
- **`static/logo.svg`** - Brand logo

### Backend Files
- **`app.py`** - Flask server
- **`calculator.py`** - Math engine
- **`voice_engine.py`** - Voice output

---

## 🔧 COMMON TASKS

### Test Locally
```bash
cd "ai smart calculator"
python app.py
# Open http://localhost:5000
```

### Deploy to Render
1. Push to GitHub
2. Connect repo to Render
3. Build: `pip install -r requirements.txt`
4. Start: `gunicorn app:app`
5. Deploy! ✨

### Update Styles
Edit: `static/style.css`  
Auto-reloads in development mode

### Update Logic
Edit: `static/script.js`  
Refresh browser to see changes

---

## 📝 FEATURES CHECKLIST

- ✅ Voice Input (microphone button)
- ✅ Voice Output (speaks results)
- ✅ Dark/Light Mode Toggle
- ✅ Calculation History Panel
- ✅ Keyboard Shortcuts
- ✅ Responsive Design
- ✅ Glassmorphism UI
- ✅ Neon Glow Effects

---

## 🆘 TROUBLESHOOTING

### Issue: App won't start
**Fix:** 
```bash
pip install -r requirements.txt --upgrade
python app.py
```

### Issue: Styles not loading
**Fix:** Clear browser cache (Ctrl+Shift+Delete)

### Issue: Voice not working
**Fix:** Use Chrome/Edge, grant microphone permission

### Issue: Port 5000 in use
**Fix:** Change port in app.py line 95

---

## 📞 SUPPORT

**Documentation:** See other `.md` files in project root  
**Developer:** Chandu Kalahasti  
**License:** MIT License  

---

<div align="center">

### ✨ Clean & Ready to Deploy!

**One Template. One Stylesheet. One Script.**

*Simple. Professional. Efficient.*

</div>
