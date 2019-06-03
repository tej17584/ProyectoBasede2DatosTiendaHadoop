# importing the module 
import tweepy 
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

# update the status 
api.update_status(status ="Este es un segundo Tweet de pruebe!") 
