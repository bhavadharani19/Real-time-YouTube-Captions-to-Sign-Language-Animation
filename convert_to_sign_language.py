import os

# Path to your animations folder (adjust according to your setup)
ANIMATIONS_PATH = 'static/animations/'

def convert_to_sign_language(text):
    # Split the text into words
    words = text.lower().split()

    # List to store the corresponding animations
    animations = []

    # Map each word to its corresponding animation file (if available)
    for word in words:
        animation_file = f"{word}.mp4"
        if os.path.exists(os.path.join(ANIMATIONS_PATH, animation_file)):
            animations.append(animation_file)
        else:
            # Fallback for words without a specific animation (could be ignored or handled)
            print(f"No animation available for: {word}")

    # Return the list of animations
    return animations
