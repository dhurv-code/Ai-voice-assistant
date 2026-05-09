import sounddevice as sd
from scipy.io.wavfile import write

def record_audio(filename="input.wav", duration=8, samplerate=16000):

    print("Listening...")
# here is the recording started
    audio=sd.rec(
        int(duration* samplerate),
        samplerate=samplerate,
        channels=1,
        dtype='int16',
        device=2
    )

    sd.wait()

    write(filename, samplerate, audio)

    print("Audio Recorded")
    print("Saved",filename)

    return filename