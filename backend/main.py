from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# 1. Allow the Frontend to talk to this Backend
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Status": "System Operational", "Event": "HackaTUM 2025"}

@app.get("/api/health")
def health_check():
    # Logic to check DB connection goes here later
    return {"db_status": "connected (mock)"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
