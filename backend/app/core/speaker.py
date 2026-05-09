# ṇow this file helps to conver text-speech

# now instead of pytts, we use edge-tts because, it is more humanizr voice, support hindi , emotional sounding voicesm ,free

import edge_tts
import asyncio
from playsound import playsound

VOICE="hi-IN-SwaraNeural"

async def generate_voice(text, output_files="response.mp3"):

    communicate=edge_tts.Communicate(
        text=text,
        voice=VOICE
    )
    await communicate.save(output_files)

def speak_text(text):

    asyncio.run(generate_voice(text))
    playsound("response.mp3")