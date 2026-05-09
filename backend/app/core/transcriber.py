from faster_whisper import WhisperModel

model = WhisperModel(
    "tiny",
    device="cpu",
    compute_type="int8"
)

def transcribe_audio(audio_path):

    segments, info = model.transcribe(
        audio_path,
        language="hi"
    )

    text = ""

    for segment in segments:
        text += segment.text

    print("Transcribed:", text)

    return text