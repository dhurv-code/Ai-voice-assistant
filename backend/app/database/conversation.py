from app.database.db import conversation_collection
def save_message(user_id,role,content,emotion=None):
    message={
        "user_id": user_id,
        "role": role,
        "content": content,
        "emotion": emotion
    }

    conversation_collection.insert_one(message)

def get_recent_messages(user_id,limit=10):
    messages=conversation_collection.find({
        "user_id":user_id
    }).sort("_id",-1).limit(limit)

    return list(messages)