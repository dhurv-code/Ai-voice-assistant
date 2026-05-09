def detect_emotion(text):
    text=text.lower()

    sad_words=[
        "sad",
        "lonely",
        "depressed",
        "cry",
        "upset",
        "hurt",
    ]

    happy_words=[
        "happy",
        "excited",
        "good",
        "amazing"
    ]
    angry_words = [
        "angry",
        "frustrated",
        "hate"
    ]

    for word in sad_words:
        if word in text:
            return "sad"
    for word in happy_words:
        if word in text:
            return "happy"
    for word in angry_words:
        if word in text:
            return "angry"
    
    return "neutral"