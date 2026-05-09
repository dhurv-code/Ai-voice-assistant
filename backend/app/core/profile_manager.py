from app.database.db import user_collection

DEFAULT_USER_ID="dhurv"

def create_default_profile():
    existing= users_collection.find_one({
        "user_id":DEFAULT_USER_ID
    })

    if existing:
        return 
    profile={
        "user_id":DEFAULT_USER_ID,
        "name":"Dhurv",
        "language":"Hindi",
        "personality":"friendly",
        "interests":[],
        "emotional_state":"neutral",
        "important_memories":[]

    }
    user_collection.insert_one(profile)

def get_profile():
    return user_collection.find_one({
        "user_id":DEFAULT_USER_ID
    })
def update_profile(data):

    user_collection.update_one(
        {"user_id":DEFAULT_USER_ID},
        {"$set":data}
    )