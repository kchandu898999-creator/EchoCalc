/* ====================================
   AI Smart Calculator - JavaScript Controller
   Handles user interactions and API communication
   ==================================== */

// DOM Elements
const display = {
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
    voice: document.getElementById('voiceBtn'),
    theme: document.getElementById('themeToggle'),
    historyToggle: document.getElementById('historyToggle'),
    closeHistory: document.getElementById('closeHistory'),
    clearHistory: document.getElementById('clearHistory')
};

// Voice Recognition State
let recognition = null;
let isListening = false;

const sidebar = {
    element: document.getElementById('historySidebar'),
    list: document.getElementById('historyList')
};

// State
let currentExpression = '';

// History
const HISTORY_STORAGE_KEY = 'ai_smart_calculator_history_v1';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeButtons();
    initializeVoiceRecognition();
    loadTheme();
    // Load history from localStorage on startup
    setTimeout(() => {
        loadHistory();
    }, 300);
    console.log('🚀 AI Smart Calculator initialized');
    console.log('🎤 Voice input initialized');
});

// Button Event Listeners
function initializeButtons() {
    // Number buttons
    buttons.numbers.forEach(btn => {
        btn.addEventListener('click', () => {
            playClickSound();
            appendToExpression(btn.dataset.value);
        });
    });
    
    // Operator buttons
    buttons.operators.forEach(btn => {
        btn.addEventListener('click', () => {
            playClickSound();
            appendToExpression(btn.dataset.value);
        });
    });
    
    // Function buttons
    buttons.functions.forEach(btn => {
        btn.addEventListener('click', () => {
            playClickSound();
            appendToExpression(btn.dataset.value);
        });
    });
    
    // Equals button - THIS IS THE KEY FIX
    if (buttons.equals) {
        buttons.equals.addEventListener('click', () => {
            playClickSound();
            calculateResult();
        });
    }
    
    // Clear button
    if (buttons.clear) {
        buttons.clear.addEventListener('click', () => {
            playClickSound();
            clearAll();
        });
    }
    
    // Backspace button
    if (buttons.backspace) {
        buttons.backspace.addEventListener('click', () => {
            playClickSound();
            backspace();
        });
    }
    
    // Voice button - NEW
    if (buttons.voice) {
        buttons.voice.addEventListener('click', () => {
            playClickSound();
            toggleVoiceInput();
        });
    }
    
    // Theme toggle
    if (buttons.theme) {
        buttons.theme.addEventListener('click', () => {
            playClickSound();
            toggleTheme();
        });
    }
    
    // History toggle
    if (buttons.historyToggle) {
        buttons.historyToggle.addEventListener('click', () => {
            playClickSound();
            toggleHistoryPanel();
        });
    }
    if (buttons.closeHistory) {
        buttons.closeHistory.addEventListener('click', () => {
            playClickSound();
            closeHistory();
        });
    }

    if (buttons.clearHistory) {
        buttons.clearHistory.addEventListener('click', () => {
            playClickSound();
            clearHistory();
        });
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

// ====================================
// VOICE INPUT - FIXED & IMPLEMENTED
// ====================================

function initializeVoiceRecognition() {
    // Check browser support for Web Speech API
   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
       console.warn('Web Speech API not supported in this browser');
        if (buttons.voice) {
            buttons.voice.disabled = true;
            buttons.voice.title = 'Voice input not supported';
        }
       return;
    }
    
    // Create recognition instance
   recognition = new SpeechRecognition();
   recognition.lang = 'en-US';
   recognition.continuous = false;
   recognition.interimResults = false;
    
    // When recognition starts
   recognition.onstart = function() {
        isListening = true;
        if (buttons.voice) {
            buttons.voice.classList.add('listening');
        }
       const voiceStatus = document.getElementById('voiceStatus');
        if (voiceStatus) {
            voiceStatus.style.display = 'flex';
        }
      console.log('Voice recognition started');
    };
    
    // When we get a result
   recognition.onresult = function(event) {
       const speechText = event.results[0][0].transcript;
      console.log('Heard:', speechText);
        
        // Convert speech to math expression
       const mathExpression = convertSpeechToMath(speechText);
      console.log('Converted to:', mathExpression);
        
        // Update display
        currentExpression = mathExpression;
        updateDisplay();
        
        // Stop listening
        stopVoiceInput();
        
        // Auto-calculate after 500ms
        setTimeout(() => {
            calculateResult();
        }, 500);
    };
    
    // When error occurs
   recognition.onerror = function(event) {
      console.error('Speech recognition error:', event.error);
        stopVoiceInput();
        
        let errorMessage = 'Voice recognition failed';
        if (event.error === 'no-speech') {
            errorMessage = 'No speech detected. Please try again.';
        } else if (event.error === 'audio-capture') {
            errorMessage = 'No microphone found. Please enable microphone access.';
        } else if (event.error === 'not-allowed') {
            errorMessage = 'Microphone permission denied. Please allow microphone access.';
        }
        
        showToast(errorMessage, 'error');
    };
    
    // When recognition ends
   recognition.onend = function() {
        stopVoiceInput();
    };
}

function toggleVoiceInput() {
    if (!recognition) {
        showToast('Voice input not supported in your browser', 'error');
       return;
    }
    
    if (isListening) {
       recognition.stop();
    } else {
        try {
           recognition.start();
        } catch (error) {
          console.error('Failed to start recognition:', error);
            showToast('Failed to start voice recognition', 'error');
        }
    }
}

function stopVoiceInput() {
    isListening = false;
    if (buttons.voice) {
        buttons.voice.classList.remove('listening');
    }
   const voiceStatus = document.getElementById('voiceStatus');
    if (voiceStatus) {
        voiceStatus.style.display = 'none';
    }
}

function convertSpeechToMath(speech) {
    let text = speech.toLowerCase().trim();
    
    // Number words mapping
   const numberWords = {
        'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
        'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
        'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13',
        'fourteen': '14', 'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
        'eighteen': '18', 'nineteen': '19', 'twenty': '20', 'thirty': '30',
        'forty': '40', 'fifty': '50', 'sixty': '60', 'seventy': '70',
        'eighty': '80', 'ninety': '90', 'hundred': '100', 'thousand': '1000'
    };
    
    // Operator words mapping
   const operatorWords = {
        'plus': '+', 'add': '+',
        'minus': '-', 'subtract': '-', 'take': '-',
        'times': '*', 'multiply': '*', 'multiplication': '*',
        'divided by': '/', 'divide': '/', 'division': '/',
        'to the power of': '**', 'power': '**', 'raised to': '**',
        'point': '.', 'decimal': '.',
        'open parenthesis': '(', 'close parenthesis': ')',
        'sqrt': 'sqrt', 'square root': 'sqrt'
    };
    
    // Replace multi-word operators first
    text = text.replace(/divided by/g, '/')
               .replace(/to the power of/g, '**')
               .replace(/square root/g, 'sqrt');
    
    // Split into words and convert
   const words = text.split(/\s+/);
   const converted = words.map(word => {
        // Check if it's an operator
        if (operatorWords[word]) {
           return operatorWords[word];
        }
        // Check if it's a number word
        if (numberWords[word]) {
           return numberWords[word];
        }
       return word;
    });
    
    // Join and clean up
    let result = converted.join(' ');
   result = result.replace(/\s+/g, '');  // Remove spaces
    
   return result;
}

// Calculate Result - FIXED VERSION
async function calculateResult() {
    if (!currentExpression) {
        showToast('Please enter an expression', 'error');
        return;
    }
    
    try {
        // Show loading state
        setLoading(true);
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
            
            // Save to history
            saveCalculation(currentExpression, data.result);
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
    } finally {
        setLoading(false);
    }
}

function setLoading(isLoading) {
    if (!display.result) return;
    if (isLoading) {
        display.result.classList.add('loading');
    } else {
        display.result.classList.remove('loading');
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

// History Management
function toggleHistoryPanel() {
    if (!sidebar.element) return;
    sidebar.element.classList.toggle('open');
}

function openHistory() {
    sidebar.element.classList.add('open');
}

function closeHistory() {
    sidebar.element.classList.remove('open');
}

function saveCalculation(expression, result) {
    const trimmedExpression = (expression || '').trim();
    if (!trimmedExpression) return;

    const history = loadHistoryFromStorage();
    const entry = {
        expression: trimmedExpression,
        result: String(result),
        timestamp: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        })
    };

    // Latest first
    history.unshift(entry);

    // Optional: keep only the latest 100 items
    const limitedHistory = history.slice(0, 100);
    saveHistoryToStorage(limitedHistory);
    renderHistory(limitedHistory);
}

function loadHistoryFromStorage() {
    try {
        const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed;
    } catch (e) {
        console.warn('Failed to load history from storage', e);
        return [];
    }
}

function saveHistoryToStorage(history) {
    try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
        console.warn('Failed to save history to storage', e);
    }
}

function renderHistory(history) {
    if (!sidebar.list) return;

    if (!history || history.length === 0) {
        sidebar.list.innerHTML = '<div class="empty-history">No calculations yet</div>';
        return;
    }

    sidebar.list.innerHTML = '';

    history.forEach(entry => {
        const item = document.createElement('div');
        item.className = 'history-item';

        const safeExpression = escapeHtml(entry.expression);
        const safeResult = escapeHtml(entry.result);
        const timeLabel = entry.timestamp;

        item.innerHTML = `
            <div class="history-expression">${safeExpression}</div>
            <div class="history-result">${safeResult}</div>
            <div class="history-time">${timeLabel}</div>
        `;

        // Allow clicking history item to reuse expression
        item.addEventListener('click', () => {
            currentExpression = entry.expression;
            updateDisplay();
            if (display.result) {
                display.result.textContent = entry.result;
            }
            closeHistory();
        });

        sidebar.list.appendChild(item);
    });
}

function handleClearHistoryClick() {
    clearHistoryStorage();
    renderHistory([]);
    showToast('History cleared', 'success');
}

function clearHistory() {
    clearHistoryStorage();
    renderHistory([]);
    showToast('History cleared', 'success');
}

function clearHistoryStorage() {
    try {
        localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (e) {
        console.warn('Failed to clear history from storage', e);
    }
}

function loadHistory() {
    const history = loadHistoryFromStorage();
    renderHistory(history);
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

// Sound Effects for UI Feedback
function playClickSound() {
    // Optional: Add subtle click sound effect
    // This can be expanded with actual audio files
}

function playSuccessSound() {
    // Optional: Add success chime
}

function playErrorSound() {
    // Optional: Add error tone
}

// Toast Notifications
function showToast(message, type = 'info') {
   const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
   const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Play notification sound based on type
    if (type === 'success') {
        playSuccessSound();
    } else if (type === 'error') {
        playErrorSound();
    }
    
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
setTimeout(() => {
   fetchHistory();
}, 300);