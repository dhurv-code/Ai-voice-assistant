# memory now comes from mongodb

from app.database.conversation import (
    save_message,get_recent_messages
)


def get_memory(user_id):
    messages=get_recent_messages(user_id)

    formatted=[]

    for msg in reversed(messages):
        formatted.append({
            "role":msg["role"],
            "content":msg["content"]
        })
    return formatted

def update_memory(user_id,user, assistant):

    save_message(
        user_id,
        "user",
        user
    )
    save_message(
        user_id,
        "assistant",
        assistant
    )
    
