import sounddevice as sd

duration = 5
sample_rate = 44100

print("Recording...")

audio = sd.rec(
    int(duration * sample_rate),
    samplerate=sample_rate,
    channels=1
)

sd.wait()

print("Done")