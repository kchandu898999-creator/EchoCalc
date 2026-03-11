"""
Voice Engine using pyttsx3
Provides text-to-speech functionality for speaking calculation results
"""

import pyttsx3


class VoiceEngine:
    """Text-to-speech engine for speaking calculation results"""
    
    def __init__(self):
        """Initialize the pyttsx3 engine"""
        try:
            self.engine = pyttsx3.init()
            
            # Configure voice properties
            self.engine.setProperty('rate', 150)  # Speed of speech
            self.engine.setProperty('volume', 0.9)  # Volume (0.0 to 1.0)
            
            # Get available voices and select a good one
            voices = self.engine.getProperty('voices')
            if voices:
                # Select the first available voice (usually a good default)
                self.engine.setProperty('voice', voices[0].id)
            
            self.is_available = True
            
        except Exception as e:
            print(f"Voice engine initialization error: {e}")
            self.is_available = False
            self.engine = None
    
    def speak(self, text):
        """
        Speak the given text
        
        Args:
            text (str): Text to speak
            
        Returns:
            bool: True if successful, False otherwise
        """
        if not self.is_available or self.engine is None:
            return False
        
        try:
            # Clean up the text for better speech
            clean_text = self._clean_text_for_speech(text)
            
            # Queue the text for speech
            self.engine.say(clean_text)
            
            # Process the queue and speak
            self.engine.runAndWait()
            
            return True
            
        except Exception as e:
            print(f"Speech error: {e}")
            return False
    
    def _clean_text_for_speech(self, text):
        """
        Clean and format text for better speech output
        
        Args:
            text (str): Raw text
            
        Returns:
            str: Cleaned text optimized for speech
        """
        # Replace mathematical symbols with spoken words
        replacements = {
            '**': ' to the power of ',
            '^': ' to the power of ',
            '*': ' times ',
            '/': ' divided by ',
            '+': ' plus ',
            '-': ' minus ',
            '=': ' equals ',
            '(': ' open parenthesis ',
            ')': ' close parenthesis ',
            'sqrt': ' square root of ',
        }
        
        cleaned = text
        for symbol, spoken in replacements.items():
            cleaned = cleaned.replace(symbol, spoken)
        
        return cleaned.strip()
    
    def stop(self):
        """Stop any ongoing speech"""
        if self.engine:
            try:
                self.engine.stop()
            except:
                pass


# Global instance for easy access
_voice_engine_instance = None


def get_voice_engine():
    """
    Get or create the global voice engine instance
    
    Returns:
        VoiceEngine: The voice engine instance
    """
    global _voice_engine_instance
    if _voice_engine_instance is None:
        _voice_engine_instance = VoiceEngine()
    return _voice_engine_instance


def speak_text(text):
    """
    Convenience function to speak text using the global engine
    
    Args:
        text (str): Text to speak
        
    Returns:
        bool: True if successful, False otherwise
    """
    engine = get_voice_engine()
    return engine.speak(text)
