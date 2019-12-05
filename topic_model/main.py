# -*- coding: utf-8 -*-
"""
Created on Thu Dec  5 16:34:43 2019

@author: vignajeeth
"""


from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from googletrans import Translator
import json
from tqdm import tqdm
import topic_modelling
import emoji


processed = topic_modelling.ground_truth()


def remove_emoji(text):
    return emoji.get_emoji_regexp().sub(u'', text)


translator = Translator()
analyzer = SentimentIntensityAnalyzer()

data_path = '/media/vignajeeth/All Files/Dataset/IR_Tweets/data_sample.json'  # Change this


with open(data_path) as json_file:
    dataset = json.load(json_file)

result = []
le = len(dataset)
for i in tqdm(range(le)):
    dataset[i]['translated_sentence'] = translator.translate(remove_emoji(dataset[i]['tweet_text'])).text
    dataset[i]['sentiment'] = analyzer.polarity_scores(dataset[i]['translated_sentence'])
    dataset[i]['topic'] = topic_modelling.topic(dataset[i]['translated_sentence'], processed)
    result.append([dataset[i]['translated_sentence'], dataset[i]['sentiment'], dataset[i]['topic']])

with open("translated_sentiment_topic_data.json", "w") as write_file:
    json.dump(dataset, write_file)
