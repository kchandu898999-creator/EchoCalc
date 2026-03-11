"""
Test Script for AI Smart Calculator
Verifies the /calculate endpoint is working correctly
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def test_calculation(expression, expected_result):
    """Test a single calculation"""
    url = f"{BASE_URL}/calculate"
    data = {"expression": expression}
    
    try:
        response = requests.post(url, json=data)
        result = response.json()
        
        success = result.get('success', False)
        calc_result = result.get('result', 'N/A')
        
        status = "[PASS]" if (success and str(calc_result) == str(expected_result)) else "[FAIL]"
        
        print(f"{status} | Expression: {expression:15} | Expected: {expected_result:10} | Got: {calc_result}")
        
        return success and str(calc_result) == str(expected_result)
        
    except Exception as e:
        print(f"[ERROR] | Expression: {expression:15} | Error: {str(e)}")
        return False


def main():
    print("=" * 70)
    print("🧪 AI Smart Calculator - Test Suite")
    print("=" * 70)
    print()
    
    # Test cases
    test_cases = [
        # Basic arithmetic
        ("1+3", 4),
        ("5*6", 30),
        ("10/2", 5),
        ("7-3", 4),
        
        # Complex expressions
        ("(5+3)*2", 16),
        ("10+20+30", 60),
        ("100-50-25", 25),
        
        # Decimals
        ("5.5+4.5", 10),
        ("2.5*4", 10),
        
        # Exponents
        ("2**3", 8),
        ("5**2", 25),
        
        # Modulo
        ("15%4", 3),
        ("10%3", 1),
        
        # Parentheses
        ("((2+3)*(4+5))", 45),
        ("(10-5)*(3+2)", 25),
    ]
    
    passed = 0
    failed = 0
    
    print("Running tests...")
    print("-" * 70)
    
    for expression, expected in test_cases:
        if test_calculation(expression, expected):
            passed += 1
        else:
            failed += 1
    
    print("-" * 70)
    print()
    print("=" * 70)
    print(f"📊 Test Results: {passed} passed, {failed} failed out of {len(test_cases)} tests")
    print("=" * 70)
    
    if failed == 0:
        print("\n[SUCCESS] All tests passed! Calculator is working perfectly!")
    else:
        print(f"[WARNING] {failed} test(s) failed. Check the output above.")
    
    print()
    print("Manual Testing:")
    print("1. Open http://localhost:5000 in your browser")
    print("2. Click buttons or use keyboard to enter expressions")
    print("3. Press '=' or Enter to calculate")
    print("4. Result should display instantly")
    print()


if __name__ == "__main__":
    try:
        # Check if server is running
        try:
            response = requests.get(BASE_URL)
            print(f"[OK] Server is running on {BASE_URL}")
            print()
        except requests.exceptions.ConnectionError:
            print("[ERROR] Server is not running!")
            print(f"Please start Flask server: python app.py")
            print()
            exit(1)
        
        main()
        
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
