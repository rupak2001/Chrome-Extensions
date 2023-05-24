import pytesseract
from PIL import Image
import requests
import io


def imageProcessing(links):
    img_to_txt = ""
    for link in links:
        
        try:
            txt = str(pytesseract.image_to_string(Image.open(requests.get(link, stream=True).raw)))
            txt = txt.replace("\n"," ")
            txt.strip(" ")
            ' '.join(e for e in txt if e.isalnum())
            img_to_txt = " "+txt+" "
            img_to_txt.strip(" ")
            # print(img_to_txt)
        except:
            continue
    
    return img_to_txt