from fastapi import APIRouter,Depends
from pydantic import BaseModel

from app.core.brain import generate_reply
from app.auth.depedencies import get_current_user


router=APIRouter()

class ChatRequest(BaseModel):
    message:str

@router.post("/chat")
async def chat(request:ChatRequest,current_user=Depends(get_current_user)):
    reply=generate_reply(
        current_user["user_id"],

        request.message
    )
    return{
        "reply":reply
    }