from pydantic import BaseModel


class DataToCheck(BaseModel):
    text:str
    images:list
    message:str

