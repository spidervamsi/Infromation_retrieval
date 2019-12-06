import json, os, re, random
from pymongo import MongoClient

def my_replace(match):
    return "\"#" + match.group()[1:]

def replace_color(file_name):
    with open(file_name, "r", encoding="utf-8") as f:
        result_string = f.read()

    result_string = re.sub("\"(0x|0X)?[a-fA-F0-9]{6}\"", my_replace, result_string)

    with open(file_name, "w", encoding="utf-8") as f:
        f.write(result_string)

# Connection to the MongoDB Server
mongoClient = MongoClient('localhost:27017')
db = mongoClient.ir
collection = db.result
cursor = collection.find({"custom_id": {"$lt": 10001}})

result = []

for document in cursor:
    del(document['_id'])
    result.append(document)

with open("data.json", "w") as f:
        for entry in result:
            json.dump(entry, f)
            f.write("\n")

replace_color("data.json")    
