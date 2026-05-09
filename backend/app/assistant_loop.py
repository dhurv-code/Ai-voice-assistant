from app.core.listener import record_audio
from app.core.transcriber import transcribe_audio
from app.core.brain import generate_reply
from app.core.speaker import speak_text

def run_assitant():
    while True:
        # 1- Record user voice
        audio_path=record_audio()

        #  2- Convert speech->text
        user_text=transcribe_audio(audio_path)
        print(f"\nYou:{user_text}")

        # ignoring the empty speech
        if not user_text.strip():
            print("No speech detected...")
            continue
        # exit command
        if "stop" in user_text.lower():
            print("Stopping assistant...")
            break

        # 3- generate ai responses
        reply=generate_reply(user_text)
        # 4-speak responses
        speak_text(reply)
if __name__=="__main__":
    run_assitant()