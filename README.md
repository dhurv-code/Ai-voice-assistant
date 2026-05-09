# AI Virtual Friend

An emotionally intelligent AI voice companion that can talk naturally in Hindi, English, and Hinglish using voice interaction.

This project is focused on creating a realistic AI friend experience instead of a traditional chatbot.

---

# Features

- Voice-based AI interaction
- Hindi, English, and Hinglish support
- Emotion-aware conversations
- User authentication system
- Persistent conversation memory
- Human-like voice responses
- Modern React frontend
- FastAPI backend
- MongoDB cloud storage
- JWT authentication
- Realistic AI personality

---

# Tech Stack

## Frontend
- React JS
- Tailwind CSS
- Axios
- Framer Motion
- React Router

## Backend
- FastAPI
- Python

## AI & Voice
- Whisper (Speech-to-Text)
- Groq API (LLM)
- LLaMA 3.3 70B
- edge-tts (Text-to-Speech)

## Database
- MongoDB Atlas

## Authentication
- JWT Authentication
- Passlib
- bcrypt

---

# Project Structure

```bash
- ai-virtual-friend/
- │
- ├── frontend/
- │
- ├── backend/
- │   ├── app/
- │   │
- │   ├── api/
- │   │   └── routes/
- │   │
- │   ├── auth/
- │   │
- │   ├── core/
- │   │
- │   ├── database/
- │   │
- │   ├── websocket/
- │   │
- │   └── main.py
- │
- └── README.md
- 
- How It Works
- User Voice
-    ↓
- Speech Recognition (Whisper)
-    ↓
- Emotion Detection
-    ↓
- Groq + LLaMA AI Response
-    ↓
- Text-to-Speech
-    ↓
- AI Voice Reply

#Backend Features

- User Signup/Login
- JWT Token Authentication
- Protected Routes
- Conversation Memory
- Emotion Detection
- Voice Processing
- Audio APIs
- WebSocket Preparation

#Frontend Features

- 
- Modern futuristic UI
- Voice interaction button
- Login/Register pages
- Emotional animations
- Audio playback
- Responsive design
- 
- oice Processing Flow
- Frontend records user voice
-         ↓
- Audio sent to FastAPI backend
-         ↓
- Whisper converts speech → text
-         ↓
- Emotion detector analyzes message
-         ↓
- Groq + LLaMA generates response
-         ↓
- edge-tts converts response → voice
-         ↓
- Frontend plays AI voice response
- 


- Author
- Dhurv Gupta