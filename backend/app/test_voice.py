from app.core.listener import record_audio
from app.core.transcriber import transcribe_audio

audio_path=record_audio()

text=transcribe_audio(audio_path)
print("You said:",text)