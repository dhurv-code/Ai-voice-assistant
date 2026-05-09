from fastapi import FastAPI, WebSocket
from app.routes.voice import router as voice_router

from app.routes.chat import router as chat_router
from fastapi.staticfiles import StaticFiles
from app.routes.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from app.websocket.voice_socket import websocket_endpoint

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(voice_router)
app.include_router(chat_router)
app.include_router(auth_router)
app.mount(
    "/audio",
    StaticFiles(directory="storage/audio"),
    name="audio"
)

@app.get("/")
def root():
    return{"message":"AI assistant Backend running"}



@app.websocket("/ws/voice")
async def websocket_route(websocket:WebSocket):
    await websocket_endpoint(websocket)