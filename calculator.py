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
