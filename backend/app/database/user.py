from app.database.db import users_collection

def create_user(name, language="Hindi", personality="friendly"):

    user={
        "name":name,
        "language":language,
        "personality":personality
    }
    result=users_collection.insert_one(user):
    return str(result.inserted_id)

def get_user(user_id):
    return users_collection.find_one({"_id":user_id})