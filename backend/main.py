from fastapi import FastAPI
import schemas
from helpers.predictSpam import SpamPrediction
import helpers.ocr as ocr

calls = 0
app = FastAPI()
checker = SpamPrediction()


@app.get('/')
def func():
    return "hello from fastapi server"


@app.post('/checkspam')
async def checkSpam(request: schemas.DataToCheck):
    target_txt = request.text + " " + ocr.imageProcessing(request.images)
    res = checker.predict(target_txt)[0]
    return str(res)
