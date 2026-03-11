"""
Voice Engine using pyttsx3
Provides text-to-speech functionality for speaking calculation results
"""

import pyttsx3

# Initialize the engine
engine = pyttsx3.init()

# Configure voice properties
engine.setProperty('rate', 150)  # Speed of speech


def speak(text):
    """
    Speak the given text using text-to-speech
    
    Args:
        text (str): Text to speak
        
    Example:
        speak("The answer is 12")
    """
    try:
        engine.say(text)
        engine.runAndWait()
    except Exception as e:
        print(f"Speech error: {e}")


if __name__ == "__main__":
    # Test the voice engine
    print("Testing voice engine...")
    speak("Hello! The AI Smart Calculator voice output is working correctly.")
    speak("The answer is 12")
    print("Voice test completed!")
