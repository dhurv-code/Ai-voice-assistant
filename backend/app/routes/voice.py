from fastapi import APIRouter,UploadFile, File
from app.core.transcriber import transcribe_audio
from app.core.brain import generate_reply
from app.core.speaker import generate_voice
import shutil
import uuid
import os

router=APIRouter()

UPLOAD_DIR="storage/audio"

os.makedirs(UPLOAD_DIR,exist_ok=True)

@router.post("/voice")
async def voice_assistant(file:UploadFile=File(...)):
    audio_id=uuid.uuid4().hex
    input_path=f"{UPLOAD_DIR}/{audio_id}.wav"
    output_path=f"{UPLOAD_DIR}/{audio_id}_response.mp3"

    # ṣaving the audio
    audio_path= f"temp_{file.filename}"
    with open(audio_path,"wb")as buffer:
        shutil.copyfileobj(file.file,buffer)
        

    # step 1: speech->text
    text=transcribe_audio(input_path)

    # step 2: ai response
    reply=generate_reply(text)

    # step 3: text->speech

    await generate_voice(reply,output_path)

    return{
        "user_text":text,
        "assistant_text":reply,
        "audio_url":f"/audio/{audio_id}_response.mp3"
    }

