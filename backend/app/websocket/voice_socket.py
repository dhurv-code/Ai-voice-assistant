from fastapi import WebSocket,FastAPI


async def websocket_endpoint(websocket:WebSocket):
    await websocket.accept()

    while True:
        data=await websocket.receive_text()

        print("Received:",data)

        await websocket.send_text(
            f"AI Reply:{data}"
        )