# Potluck Planner Backend

## Description

Here you will find the documentation for the Potluck Planner Backend Node server. 

## Endpoints

The base URL for this server is `www.url-here.com`. All routes will be added to the end of this URL, like so: `www.url-here.com/account/register`.

All POST and PUT endpoints expect a certain data format and may have restrictions. The table below details the endpoint URL, what data the endpoint expects, what data the endpoint gives back, and any other pertinent information.

|      Endpoint     | Request Type |                                        Request Body Format                                        | Returns                                                                                                                                                                                                                                                                                                                                                                                                                               |                                                                                                                         Restrictions & Notes                                                                                                                         |
|:-----------------:|:------------:|:-------------------------------------------------------------------------------------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| /account/register |     POST     | { "username": "the_king", "password": "pa$$w0rd", "first_name": "Elvis", "last_name": "Presley" } | { "message": "Welcome to Potluck Planner!" }                                                                                                                                                                                                                                                                                                                                                                                          | Needs all four strings to insert into the database. If a field is missing, you will get an error and the user may not be added to the database. Make sure the object keys are exactly as they are here -- this is how the database knows where to store information. |
|   /account/login  |     POST     |                         { "username": "the_king", "password": "pa$$w0rd" }                        | { "message": "Welcome back!" }                                                                                                                                                                                                                                                                                                                                                                                                        | Needs the username and password. Both values are strings.                                                                                                                                                                                                            |
|      /account     |      GET     |                                                 --                                                | {   "username": "the_king",   "first_name": "Elvis",   "last_name: "Presley",   "potlucks": [       {        "name": "Game night party",        "date": "09/25/2019",        "time": "5:00 pm",        "location": "Bob's house",        "host": "Bob"       },      {        "name": "Picnic at the zoo",        "date": "10/31/2019",        "time": "11:00 am",        "location": "Fairfax Zoo",        "host": "Susan"      } ], | Returns the currently signed-in account. If no account is signed in, will return an error message.                                                                                                                                                                                                            |