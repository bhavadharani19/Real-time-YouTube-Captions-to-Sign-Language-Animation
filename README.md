# Real-time-YouTube-Captions-to-Sign-Language-Animation
This project captures YouTube captions and converts them to sign language animations in real-time. It uses a browser extension to capture video captions, which are processed by a Django backend to render animations. The goal is to provide real-time sign language translations for the hearing-impaired community.
# YouTube Captions to Sign Language Conversion

This project captures YouTube video captions in real-time and converts them into sign language animations using a browser extension and a Django backend.

## Project Overview

The project consists of:
1. A **Django backend** that processes captions and returns corresponding sign language animations.
2. A **browser extension** that captures captions from YouTube videos and displays the animations on the screen.

### Features
- Real-time conversion of captions to sign language animations.
- Seamless integration with YouTube videos.
- Simple extension interface for ease of use.

## How It Works

1. The browser extension captures captions from YouTube videos using `content.js`.
2. The captions are sent to the backend via `background.js` for conversion.
3. The Django backend processes the captions using `convert_to_sign_language.py` and returns corresponding animation files.
4. The animations are displayed on the YouTube video as an overlay.

## Project Setup

### Backend (Django)

1. Clone the repository and navigate to the backend directory.
2. Install the required packages:
   ```bash
   pip install django

