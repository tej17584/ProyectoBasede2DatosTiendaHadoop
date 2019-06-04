# importing the module 
import tweepy 

from bson.son import SON
from pymongo import MongoClient
client = MongoClient('localhost',27017)
database = client["proyectodb2"]
collection = database["facturas"]
collection2 = database["clientes"]

# personal details 
consumer_key ="7ubWjP6tG5TON2nb2Al0b6kW6"
consumer_secret ="t1jWPxG2WDjNFXQIf5RXVkIm8IdvudZsQPzm0JL2H5UxYtCzmK"
access_token ="409713602-VjpojNJwDifGWu0qJMZYNxBb9Aimh9WjrZspOJAQ"
access_token_secret ="eLJ7KuCFsS4NHFkOaX0WsawZO9k5sXtOwcD5E2n70hfid"

# authentication of consumer key and secret 
auth = tweepy.OAuthHandler(consumer_key, consumer_secret) 


# authentication of access token and secret 
auth.set_access_token(access_token, access_token_secret) 
api = tweepy.API(auth) 



db = client['proyecto2']

# cursor =  db.facturas.find().sort({x:1})
pipeline = [
    {
        "$group": {
            "_id": {
                "dpi": "$dpi"
            },
            "SUM(cantidadcomprada)": {
                "$sum": "$cantidadcomprada"
            }
        }
    }, 
    {
        "$project": {
            "dpi": "$_id.dpi",
            "SUM(cantidadcomprada)": "$SUM(cantidadcomprada)",
            "_id": 0
        }
    }, 
    {
        "$sort": SON([ ("SUM(cantidadcomprada)", -1) ])
    }, 
    {
        "$project": {
            "_id": 0,
            "dpi": "$dpi"
        }
    }, 
    {
        "$limit": 5
    }
]


cursor = collection.aggregate(
    pipeline,
    allowDiskUse = True
)
try:
    for doc in cursor:
        valor = doc["dpi"]
        nombre = collection2.find_one({"dpi": valor.encode()})
        print(nombre["nombre"] + ":")
        print(doc["dpi"])

        
        api.update_status(status = "Uno de nuestros 5 ganadores del mejor cliente es: " + nombre["nombre"] + ", DPI: " + doc["dpi"] + " felicitaciones!!!") 
finally:
    client.close()


# update the status 
