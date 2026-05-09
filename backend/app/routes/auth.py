from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.database.db import users_collection

from app.auth.hash_password import (
    hash_password,
    verify_password
)

from app.auth.jwt_handler import (
    create_access_token
)

router = APIRouter()

class SignupModel(BaseModel):

    name: str
    email: str
    password: str

class LoginModel(BaseModel):

    email: str
    password: str

@router.post("/signup")

async def signup(data: SignupModel):

    existing = users_collection.find_one({
        "email": data.email
    })

    if existing:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    user = {

        "name": data.name,

        "email": data.email,

        "password": hash_password(
            data.password
        )
    }

    users_collection.insert_one(user)

    return {
        "message": "Signup successful"
    }

@router.post("/login")

async def login(data: LoginModel):

    user = users_collection.find_one({
        "email": data.email
    })

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid email"
        )

    valid = verify_password(
        data.password,
        user["password"]
    )

    if not valid:
        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )

    token = create_access_token({
        "user_id": str(user["_id"]),
        "email": user["email"]
    })

    return {
        "access_token": token
    }