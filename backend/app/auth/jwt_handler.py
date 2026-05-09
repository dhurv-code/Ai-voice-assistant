from jose import jwt

from datetime import datetime,timedelta
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM="HS256"

def create_access_token(data:dict):
    to_encode=data.copy()
    expire=datetime.utcnow() + timedelta(days=7)
    to_encode.update({
        "exp": expire
    })

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token

def verify_token(token:str):
    try:
        payload=jwt.decode(
            token,SECRET_KEY,algorithms=[ALGORITHM]
        )

        return payload
    
    except JWTError:
        return None