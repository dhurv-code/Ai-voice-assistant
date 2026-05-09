from groq import Groq
from app.core.memory import (
    get_memory,
    update_memory
)

import os

from dotenv import load_dotenv

from app.core.emotions import detect_emotion

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

SYSTEM_PROMPT = """
You are a human-like AI companion.

You speak naturally like a close friend.
You understand emotions deeply.
You can speak Hindi, English, and Hinglish naturally.
You are warm, emotionally intelligent, calm, and supportive.
You never sound robotic or overly formal.
Keep responses conversational and realistic.
"""

def generate_reply(user_id, user_text):

    history = get_memory(user_id)

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ] + history

    messages.append({
        "role": "user",
        "content": user_text
    })

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages
    )

    reply = response.choices[0].message.content

    update_memory(user_id,user_text, reply)

    return reply