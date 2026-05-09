# using whistle : an ai model for speech to text
import whisper

model=whisper.load_model("base")

def transcribe_audio(audio_path):
    result=model.transcribe(audio_path,fp16=False)
    print("Transcribed:", result["text"])
    return result["text"]