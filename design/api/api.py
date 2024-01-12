from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request, Response
from connect_db import ConnectDatabase
from pydantic import BaseModel
from datetime import datetime
import uvicorn
import bcrypt
import base64
import json
import glob
import jwt
import os

app = FastAPI()
conn_db = ConnectDatabase()




