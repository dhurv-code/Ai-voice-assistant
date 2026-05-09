from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client=MongoClient(os.getenv("MONGO_URI"))

db=client["ai_friend"]

users_collection= db["users"]

conversation_collection=db["conversations"]