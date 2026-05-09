from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends
)
from fastapi.responses import FileResponse
from app.auth.dependencies import get_current_user

from app.core.transcriber import transcribe_audio
from app.core.brain import generate_reply
from app.core.speaker import generate_voice

import shutil
import uuid
import os
import time


router = APIRouter()

UPLOAD_DIR = "storage/audio"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/voice")

async def voice_assistant(
    file: UploadFile = File(...),
    # current_user=Depends(get_current_user)
):

    print("Request received")

    audio_id = uuid.uuid4().hex

    input_path = f"{UPLOAD_DIR}/{audio_id}.wabm"

    output_path = f"{UPLOAD_DIR}/{audio_id}_response.mp3"

    print("Saving audio")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("Starting transcription")
    start=time.time()

    text = transcribe_audio(input_path)
    print(
        "TRASCRIPTION TIME:",
        time.time()-start
    )

    print("TEXT:", text)

    print("Generating reply")

    reply = generate_reply(
        # current_user["user_id"],
        "test_user",
        text
    )

    print("REPLY:", reply)

    print("Generating voice")
    start=time.time()

    await generate_voice(reply, output_path)
    print("TTS TIME",time.time()-start)

    print("Finished")

    return FileResponse(
    output_path,
    media_type="audio/mpeg"
)