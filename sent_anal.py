# -*- coding: utf-8 -*-
"""
Created on Sun Dec  1 22:28:48 2019

@author: vignajeeth
"""


#------------------------------Data Loading-----------------------------------


import ijson


from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from polyglot.detect import Detector
from googletrans import Translator


data_path = '/media/vignajeeth/All Files/Dataset/IR_Tweets/data.json'  # Change this

data_parse = ijson.parse(open(data_path, 'r'))
count = 0
batch_size = 100  # Change this
data = []
for prefix, event, value in data_parse:
    if event == 'string' and prefix == 'item.full_text':
        data.append(value)
        count += 1
        if count == batch_size:
            break


#------------------------Sentiment Analysis-------------------------------------

answers = []
analyzer = SentimentIntensityAnalyzer()
translator = Translator()
c = -1

for sentence in data:
    c += 1
    try:
        detector = Detector(sentence)
    except:
        continue
    if detector.language.code == 'en':
        answers.append([sentence, 'en', analyzer.polarity_scores(sentence)])
    if detector.language.code == 'hi':
        try:
            translated_sentence = translator.translate(sentence).text
            answers.append([translated_sentence, 'hi', analyzer.polarity_scores(translated_sentence)])
        except:
            continue
    if detector.language.code == 'pt':
        try:
            translated_sentence = translator.translate(sentence).text
            answers.append([translated_sentence, 'pt', analyzer.polarity_scores(translated_sentence)])
        except:
            continue


#------------------------------Testing----------------------------------------


#
#from polyglot.downloader import downloader
#
#
#from polyglot.transliteration import Transliterator
#
#
#from polyglot.text import Text
#text = Text(data[94])
#
# for x in text.transliterate("hi"):
#    print(x)
#
#
#print(downloader.supported_languages_table("sentiment2", 3))
