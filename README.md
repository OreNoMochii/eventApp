# Getting Started with the eventy app tik tok. 

-Open the file src/API_DB/main.py and input your own mail smtp information so that you can recive mail otherwise it will retrive an error. 

-app.config['MAIL_SERVER']='the smtp server of your mail' your mail server\
-app.config['MAIL_PORT'] = ' port' your mail port it's an integer not a string\
-app.config['MAIL_USERNAME'] = 'your own mail address' your mail address\
-app.config['MAIL_PASSWORD'] = 'your own password' your mail password\
-app.config['MAIL_USE_TLS'] = False\
-app.config['MAIL_USE_SSL'] = True\

-Then run npm start from root folder tik-tok. 

-Then run python3 main.py to open the api server. 

-Then click on the button register and register as a new user. 

-Then create an event by clicking on the button create new (upper right).

-Then Submit the new event. 

-Then on the route /events click on an event to signup for that event . When signinup to an event it will send an email to the email you registered with. 

-Then click on check your signed events to check the events to the one you signed. 

-If you want to unsign just click on the events from the route /signedup and you'll be unsigned. 



Dependencies:

-Dependencies for the frontend (React.js) are in the files package.json and package-lock.json run npm install from the root folder tik-tok (where the files package.json and package-lock.json are located) 
-Dependencies for the backend/api are in the folder src/API_DB/requirements.txt just use pip3 install -r requirements.txt

-Don' forget to put the localhost 'http://127.0.0.1:5000/' as a proxy in the package.json folder. 

API methods. 

-"http://127.0.0.1:5000//user/<string:user_mail>") method that gets user from the db. (GET)\
-"http://127.0.0.1:5000//user/login/<string:user_mail>") method that retrieves login info from a user. (GET)\
-"http://127.0.0.1:5000//user/register/<string:user_mail>") method that posts a new registered user in the db. (POST)\
-"http://127.0.0.1:5000//event/create/") method that posts a new event in the db. (POST)\
-"http://127.0.0.1:5000//event/update/<int:signup_id>") method that updates an event if needed. (POST)\
-"http://127.0.0.1:5000//signup/<string:user_name>") method that posts a new signup in the db. (POST)\
-"http://127.0.0.1:5000//signup/unsign/<int:event_id>") method that unsigns a user from an event in the db. (POST)\
-"http://127.0.0.1:5000//event/listAllEvents/") method that lists all events in the db. (GET)\
-"http://127.0.0.1:5000//signedup/<string:user_mail>") #list all events that a user have signedup to so far. (GET)\




