"""
AI Smart Calculator - Flask Backend API
Main application file for the calculator server
"""

from flask import Flask, render_template, request, jsonify
import sympy as sp
from sympy.core.sympify import SympifyError
from voice_engine import speak_text

app = Flask(__name__)


@app.route('/')
def index():
    """Serve the main calculator interface"""
    return render_template('index.html')


@app.route('/calculate', methods=['POST'])
def calculate():
    """Calculate mathematical expression"""
    try:
        data = request.get_json()

        if not data or "expression" not in data:
            return jsonify({
                "success": False,
                "result": "Error",
                "error": "No expression provided"
            })

        expression = data["expression"].strip()

        if expression == "":
            return jsonify({
                "success": False,
                "result": "Error",
                "error": "Empty expression"
            })

        # Replace calculator symbols
        expression = expression.replace("×", "*").replace("÷", "/")

        # Evaluate expression
        result = sp.sympify(expression)

        # Convert result to string
        if result.is_number:
            result_value = str(result.evalf())
        else:
            result_value = str(result)

        # Remove .0 for integers
        try:
            num = float(result_value)
            if num == int(num):
                result_value = str(int(num))
        except:
            pass

        # Voice output
        try:
            speak_text("The answer is " + result_value)
        except Exception as voice_error:
            print("Voice output error:", voice_error)

        return jsonify({
            "success": True,
            "result": result_value
        })

    except SympifyError:
        return jsonify({
            "success": False,
            "result": "Error",
            "error": "Invalid mathematical expression"
        })

    except Exception as e:
        print("Server error:", e)
        return jsonify({
            "success": False,
            "result": "Error",
            "error": "Calculation failed"
        })


if __name__ == "__main__":
    print("=" * 50)
    print("🚀 AI Smart Calculator Server Starting...")
    print("📍 Server: http://localhost:5000")
    print("=" * 50)

    app.run(debug=True, host="0.0.0.0", port=5000)