import pickle
import nltk
import re
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
nltk.download('wordnet')



class SpamPrediction():
    model = None
    vectorizer = None
    stemmer = None
    lemmatizer = None

    def __init__(self):
        #load model
        with open('.././models/SpamDetectorNB','rb') as f:
            self.model = pickle.load(f)

        #load vectorizer
        with open('.././models/vectorizer','rb') as f:
            self.vectorizer = pickle.load(f)

        self.stemmer = PorterStemmer()

        self.lemmatizer = WordNetLemmatizer()

    def word_stemmer(self,words):
        stem_words = [self.stemmer.stem(o) for o in words]
        return " ".join(stem_words)
    
    def word_lemmatizer(self,words):
        lemma_words = [self.lemmatizer.lemmatize(o) for o in words]
        return " ".join(lemma_words)
    
    def cleanData(self,text):
        text = self.word_stemmer(re.findall(r"[\w']+",text))
        text = self.word_lemmatizer(re.findall(r"[\w']+",text))
        return text

    def predict(self,text):
        vector = self.vectorizer.transform([text]).toarray()
        return self.model.predict(vector)
    
    def cleanAndPredict(self,text):
        text = self.cleanData(text)
        vector = self.vectorizer.transform([text]).toarray()
        return self.model.predict(vector)