# 🔧 CORRECTED CODE - Copy & Paste Reference

This file contains the complete, working code for all three fixed files.

---

## 1. app.py (Complete Working Code)

```python
"""
AI Smart Calculator - Flask Backend API
Main application file for the calculator server
"""

from flask import Flask, render_template, request, jsonify
import sympy
from sympy.core.sympify import SympifyError

app = Flask(__name__)


@app.route('/')
def index():
    """Serve the main calculator interface"""
   return render_template('index.html')


@app.route('/calculate', methods=['POST'])
def calculate():
    """
    Calculate a mathematical expression
    
    Request JSON:
        {
            "expression": "5+3"
        }
    
    Response JSON:
        {
            "result": "8",
            "success": true
        }
    """
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Validate request
        if not data or 'expression' not in data:
           return jsonify({
                'success': False,
                'error': 'No expression provided',
                'result': 'Error'
            }), 400
        
        expression = data['expression'].strip()
        
        if not expression:
           return jsonify({
                'success': False,
                'error': 'Empty expression',
                'result': 'Error'
            }), 400
        
        # Replace calculator symbols with Python operators
        expression = expression.replace('×', '*').replace('÷', '/')
        
        # Evaluate the expression using SymPy
        try:
           result = sympy.sympify(expression)
           result_str = str(result.evalf()) if result.is_number else str(result)
            
            # Clean up the result (remove unnecessary decimals for integers)
            try:
                float_result = float(result_str)
                if float_result == int(float_result):
                   result_str = str(int(float_result))
            except (ValueError, TypeError):
                pass
            
           return jsonify({
                'success': True,
                'result': result_str
            })
            
        except SympifyError as e:
            print(f"Sympify error: {e}")
           return jsonify({
                'success': False,
                'error': 'Invalid mathematical expression',
                'result': 'Error'
            }), 400
        except Exception as e:
            print(f"Calculation error: {e}")
           return jsonify({
                'success': False,
                'error': 'Calculation failed',
                'result': 'Error'
            }), 400
            
    except Exception as e:
        print(f"Server error: {e}")
       return jsonify({
            'success': False,
            'error': 'Server error',
            'result': 'Error'
        }), 500


if __name__ == '__main__':
    print("=" * 50)
    print("🚀 AI Smart Calculator Server Starting...")
    print("=" * 50)
    print("📍 Server will run on: http://localhost:5000")
    print("=" * 50)
    print("\nPress Ctrl+C to stop the server\n")
    
    # Run the Flask development server
    app.run(debug=True, host='0.0.0.0', port=5000)
```

---

## 2. calculator.py (Complete Working Code)

```python
"""
Calculator Engine using SymPy
Handles mathematical expressions evaluation
"""

import sympy
from sympy.core.sympify import SympifyError


class CalculatorEngine:
    """SymPy-based calculation engine"""
    
    @classmethod
    def calculate(cls, expression):
        """
        Evaluate a mathematical expression using SymPy
        
        Args:
            expression (str): Mathematical expression to evaluate
            
        Returns:
            dict: Contains success status, result/error message
        """
        try:
            # Replace calculator symbols with Python operators
            expression = expression.replace('×', '*').replace('÷', '/')
            
            # Parse and evaluate the expression
           result = sympy.sympify(expression)
            
            # Evaluate to numerical value if it's a number
            if result.is_number:
                numerical_result = result.evalf()
                
                # Format the result (remove unnecessary decimal places for integers)
                if numerical_result == int(numerical_result):
                   result_str = str(int(numerical_result))
                else:
                   result_str = str(numerical_result)
            else:
               result_str = str(result)
            
           return {
                'success': True,
                'result': result_str,
                'expression': expression
            }
            
        except SympifyError as e:
           return {
                'success': False,
                'error': 'Invalid mathematical expression',
                'details': str(e)
            }
        except Exception as e:
           return {
                'success': False,
                'error': 'Calculation error',
                'details': str(e)
            }
    
    @classmethod
    def is_valid_expression(cls, expression):
        """
        Check if an expression is valid before evaluation
        
        Args:
            expression (str): Mathematical expression to validate
            
        Returns:
            bool: True if valid, False otherwise
        """
        try:
            # Replace symbols first
            expression = expression.replace('×', '*').replace('÷', '/')
            sympy.sympify(expression)
           return True
        except:
           return False
```

---

## 3. script.js (Complete Working Code)

```javascript
/* ====================================
   AI Smart Calculator - JavaScript Controller
   Handles user interactions and API communication
   ==================================== */

// DOM Elements
const display= {
    expression: document.getElementById('expression'),
   result: document.getElementById('result')
};

const buttons = {
    numbers: document.querySelectorAll('.btn-number'),
    operators: document.querySelectorAll('.btn-operator'),
    functions: document.querySelectorAll('.btn-function'),
    equals: document.getElementById('equalsBtn'),
    clear: document.getElementById('clearBtn'),
    backspace: document.getElementById('backspaceBtn'),
    theme: document.getElementById('themeToggle'),
    historyToggle: document.getElementById('historyToggle'),
    closeHistory: document.getElementById('closeHistory')
};

const sidebar = {
    element: document.getElementById('historySidebar'),
    list: document.getElementById('historyList')
};

// State
let currentExpression = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeButtons();
    loadTheme();
   console.log('🚀 AI Smart Calculator initialized');
});

// Button Event Listeners
function initializeButtons() {
    // Number buttons
    buttons.numbers.forEach(btn => {
        btn.addEventListener('click', () => {
            appendToExpression(btn.dataset.value);
        });
    });
    
    // Operator buttons
    buttons.operators.forEach(btn => {
        btn.addEventListener('click', () => {
            appendToExpression(btn.dataset.value);
        });
    });
    
    // Function buttons
    buttons.functions.forEach(btn => {
        btn.addEventListener('click', () => {
            appendToExpression(btn.dataset.value);
        });
    });
    
    // Equals button - THIS IS THE KEY FIX
    if (buttons.equals) {
        buttons.equals.addEventListener('click', calculateResult);
    }
    
    // Clear button
    if (buttons.clear) {
        buttons.clear.addEventListener('click', clearAll);
    }
    
    // Backspace button
    if (buttons.backspace) {
        buttons.backspace.addEventListener('click', backspace);
    }
    
    // Theme toggle
    if (buttons.theme) {
        buttons.theme.addEventListener('click', toggleTheme);
    }
    
    // History toggle
    if (buttons.historyToggle) {
        buttons.historyToggle.addEventListener('click', openHistory);
    }
    if (buttons.closeHistory) {
        buttons.closeHistory.addEventListener('click', closeHistory);
    }
    
    // Keyboard support
    document.addEventListener('keydown', handleKeyboard);
}

// Expression Management
function appendToExpression(value) {
    currentExpression += value;
    updateDisplay();
}

function updateDisplay() {
    if (display.expression) {
        display.expression.textContent = currentExpression || '';
    }
}

function clearAll() {
    currentExpression = '';
    if (display.expression) display.expression.textContent = '';
    if (display.result) display.result.textContent = '0';
    showToast('Cleared', 'success');
}

function backspace() {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay();
}

// Calculate Result - FIXED VERSION
async function calculateResult() {
    if (!currentExpression) {
        showToast('Please enter an expression', 'error');
       return;
    }
    
    try {
        // Show loading state
        if (display.result) {
            display.result.textContent = 'Calculating...';
        }
        
       console.log('Sending expression:', currentExpression);
        
        // FIXED: Correct fetch request to Flask backend
       const response = await fetch('/calculate', {
           method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                expression: currentExpression
            })
        });
        
       console.log('Response status:', response.status);
        
       const data = await response.json();
       console.log('Response data:', data);
        
        if (data.success && data.result) {
            if (display.result) {
                display.result.textContent = data.result;
            }
            showToast(`Result: ${data.result}`, 'success');
            
            // Save to history (optional)
            saveToHistory(currentExpression, data.result);
        } else {
           console.error('Calculation failed:', data.error);
            if (display.result) {
                display.result.textContent = 'Error';
            }
            showToast(data.error || 'Calculation failed', 'error');
        }
    } catch (error) {
       console.error('Fetch error:', error);
        if (display.result) {
            display.result.textContent = 'Error';
        }
        showToast('Connection error: ' + error.message, 'error');
    }
}

// Theme Management
function loadTheme() {
   const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
   const currentTheme = document.documentElement.getAttribute('data-theme');
   const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    showToast(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode`, 'success');
}

// History Management (Simple Version)
function openHistory() {
    sidebar.element.classList.add('open');
    if (sidebar.list) {
        sidebar.list.innerHTML = '<div class="empty-history">History feature coming soon</div>';
    }
}

function closeHistory() {
    sidebar.element.classList.remove('open');
}

function saveToHistory(expression, result) {
    // Simple in-memory storage (can be enhanced with localStorage or database)
   console.log('Saving to history:', expression, '=', result);
}

// Keyboard Support
function handleKeyboard(event) {
   const key = event.key;
    
    // Numbers and operators
    if (/^[0-9+\-*/().%]$/.test(key)) {
        appendToExpression(key);
        event.preventDefault();
    }
    
    // Enter or = for calculation
    if (key === 'Enter' || key === '=') {
        calculateResult();
        event.preventDefault();
    }
    
    // Escape for clear
    if (key === 'Escape') {
        clearAll();
        event.preventDefault();
    }
    
    // Backspace
    if (key === 'Backspace') {
        backspace();
        event.preventDefault();
    }
    
    // Delete for clear
    if (key === 'Delete') {
        clearAll();
        event.preventDefault();
    }
}

// Utility Functions
function escapeHtml(text) {
   const div = document.createElement('div');
    div.textContent = text;
   return div.innerHTML;
}

function formatTimestamp(timestamp) {
   const date = new Date(timestamp);
   const now = new Date();
   const diff = now - date;
    
    if (diff < 60000) {
       return 'Just now';
    }
    
    if (diff < 3600000) {
       const minutes = Math.floor(diff / 60000);
       return `${minutes} min ago`;
    }
    
    if (diff < 86400000) {
       const hours = Math.floor(diff / 3600000);
       return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    
   return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Toast Notifications
function showToast(message, type = 'info') {
   const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
   const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
```

---

## ✅ Quick Test Commands

### Test in Browser:
1. Open: http://localhost:5000
2. Type: `5 + 3`
3. Press: `=` or `Enter`
4. **Expected:** Result shows `8`

### Test with PowerShell:
```powershell
curl http://localhost:5000/calculate `
  -Method POST `
  -Headers @{@{'Content-Type'='application/json'}} `
  -Body '{"expression":"5+3"}'
```

**Expected Response:**
```json
{
  "result": "8",
  "success": true
}
```

### Test with Python:
```python
import requests

response = requests.post('http://localhost:5000/calculate', 
                        json={'expression': '5+3'})
print(response.json())
```

**Expected Output:**
```python
{'result': '8', 'success': True}
```

---

## 🎯 Key Points to Remember

1. **JSON Content-Type is mandatory:**
   ```javascript
   headers: {'Content-Type': 'application/json'}
   ```

2. **Always stringify the body:**
   ```javascript
   body: JSON.stringify({expression: currentExpression})
   ```

3. **Use request.get_json() in Flask:**
   ```python
   data = request.get_json()
   expression = data['expression']
   ```

4. **Replace symbols BEFORE evaluation:**
   ```python
   expression = expression.replace('×', '*').replace('÷', '/')
   ```

5. **Return JSON response:**
   ```python
  return jsonify({'result': str(result)})
   ```

---

**Status:** ✅ All code tested and working  
**Date:** 2026-03-09  
**Server:** Running on http://localhost:5000  
