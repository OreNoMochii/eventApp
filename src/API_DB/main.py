from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
import uuid 
from datetime import datetime
from flask_mail import Mail, Message

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///eventapp.db'
app.config['MAIL_SERVER']='the smtp server of your mail' #mail server
app.config['MAIL_PORT'] = ' port' #mail port an integer
app.config['MAIL_USERNAME'] = 'your own mail address' #mail address
app.config['MAIL_PASSWORD'] = 'your own passwor' #mail password
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)
db = SQLAlchemy(app)


class EventModel(db.Model):
	eventId = db.Column(db.Integer, primary_key=True)
	eventName = db.Column(db.String(200), nullable=False)
	eventCreator = db.Column(db.String(200), nullable=False)
	eventStartDate = db.Column(db.String(200), nullable=False)
	eventLocation = db.Column(db.String(200), nullable=False)
	eventStartTime = db.Column(db.String(200), nullable=False)
	eventEndDate  = db.Column(db.String(200), nullable=False)
	eventEndTime = db.Column(db.String(200), nullable=False)
	eventDescription = db.Column(db.String(200), nullable=False)
	updateDate = db.Column(db.String(200), nullable=True)

	def __repr__(self):
		return f"Event(name = {eventName}, in = {eventLocation}, from = {eventStartTime}, to = {eventEndTime})"



class UserModel(db.Model):
	userMail = db.Column(db.String(200), primary_key=True)
	userFirstName = db.Column(db.String(200), nullable=False)
	userLastName = db.Column(db.String(200), nullable=False)
	userPassword = db.Column(db.String(200), nullable=False)
	updateDate= db.Column(db.String(200), nullable=True)

	def __repr__(self):
		return f"User(name = {userFirstName}, with email = {userMail})"


class SignUpModel(db.Model):
	signUpId = db.Column(db.Integer, primary_key=True)
	userMail = db.Column(db.String(200), nullable=False)
	eventId = db.Column(db.Integer, nullable=False)
	updateDate= db.Column(db.String(200), nullable=True)
	status = db.Column(db.Integer, nullable=False)
	eventName = db.Column(db.String(200), nullable=False)
	eventStartDate = db.Column(db.String(200), nullable=False)
	eventEndDate  = db.Column(db.String(200), nullable=False)

	def __repr__(self):
		return f"SignUp(userFirstName = {userFirstName}, signup for eventName = {eventName} at date =  {updateDate})"

db.create_all() #only run once 


event_put_args = reqparse.RequestParser()
event_put_args.add_argument("eventName", type=str, help="Name of the event", required=True)
event_put_args.add_argument("eventCreator", type=str, help="Creator of the event", required=True)
event_put_args.add_argument("eventLocation", type=str, help="Location of the event", required=True)
event_put_args.add_argument("eventStartDate", type=str, help="Starting date of the event", required=True)
event_put_args.add_argument("eventEndDate", type=str, help="End date of the event", required=True)
event_put_args.add_argument("eventStartTime", type=str, help="Start time of the event", required=True)
event_put_args.add_argument("eventEndTime", type=str, help="End time of the event", required=True)
event_put_args.add_argument("eventDescription", type=str, help="Description of the event", required=True)

event_update_args = reqparse.RequestParser()
event_put_args.add_argument("eventLocation", type=str, help="Location of the event", required=True)
event_put_args.add_argument("eventStartDate", type=str, help="Starting date of the event", required=True)
event_put_args.add_argument("eventEndDate", type=str, help="End date of the event", required=True)
event_put_args.add_argument("eventStartTime", type=str, help="Start time of the event", required=True)
event_put_args.add_argument("eventEndTime", type=str, help="End time of the event", required=True)
event_put_args.add_argument("eventDescription", type=str, help="Description of the event", required=True)



user_put_args = reqparse.RequestParser()
user_put_args.add_argument("userMail", type=str, help="Mail of the user", required=True)
user_put_args.add_argument("userFirstName", type=str, help="First name of the user", required=True)
user_put_args.add_argument("userLastName", type=str, help="Last name of the user", required=True)
user_put_args.add_argument("userPassword", type=str, help="Password of the user", required=True)


user_update_args = reqparse.RequestParser()
user_update_args.add_argument("userMail", type=str, help="Mail of the user")
user_update_args.add_argument("userPassword", type=str, help="Password of the user")

signup_put_args = reqparse.RequestParser()
signup_put_args.add_argument("userMail", type=str, help="Mail of the user", required=True)
signup_put_args.add_argument("eventId", type=str, help="eventId", required=True)
signup_put_args.add_argument("eventName", type=str, help="Password of the user", required=True)
signup_put_args.add_argument("eventStartDate", type=str, help="Starting date of the event", required=True)
signup_put_args.add_argument("eventEndDate", type=str, help="End date of the event", required=True)


signup_update_args = reqparse.RequestParser()
signup_update_args.add_argument("userMail", type=str, help="Mail of the user")
signup_update_args.add_argument("userPassword", type=str, help="Password of the user")


resource_fields_event = {
	'eventId': fields.Integer,
	'eventName': fields.String,
	'eventLocation': fields.String,
	'eventStartTime': fields.String,
	'eventStartDate': fields.String,
	'eventEndDate': fields.String,
	'eventEndTime': fields.String,
	'eventCreator': fields.String,
	'updateDate': fields.String,
	'eventDescription': fields.String,


}

resource_fields_user = {
	'userMail': fields.String,
	'userFirstName': fields.String,
	'userLastName': fields.String,
	'userPassword': fields.String,
	'updateDate': fields.String
}

resource_fields_signup = {
	'signUpId': fields.Integer,
	'userMail': fields.String,
	'eventId': fields.String,
	'eventName': fields.String,
	'updateDate': fields.String,
	'status' : fields.Integer,
	'eventStartDate': fields.String,
	'eventEndDate': fields.String
}




class User(Resource):
	@marshal_with(resource_fields_user)
	def get(self, user_mail):
		result = UserModel.query.filter_by(userMail=user_mail).first()
		if not result:
			abort(404, message="Could not find user with that id")
		return result, 201






class Login(Resource):
	@marshal_with(resource_fields_user)
	def get(self, user_mail):
		result= UserModel.query.filter_by(userMail=user_mail).first()
		if not result:
			abort(404, message="Could not find user with that id")
		return result, 201

class Register(Resource):
	@marshal_with(resource_fields_user)
	def post(self, user_mail):
		args = user_put_args.parse_args()
		result = UserModel.query.filter_by(userMail=user_mail).first()
		if result:
			abort(409, message="User mail is already taken...")

		user = UserModel(
			userMail=args['userMail'], 
			userFirstName=args['userFirstName'], 
			userLastName=args['userLastName'],
			userPassword= args['userPassword'],
			updateDate= datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
			)
		db.session.add(user)
		db.session.commit()
		return user, 201

class CreateEvent(Resource):
	@marshal_with(resource_fields_event)
	def post(self):
		new_event_id = uuid.uuid4().int & (1<<16)-1
		args = event_put_args.parse_args()
		result = EventModel.query.filter_by(eventId=new_event_id).first()
		if result:
			abort(409, message="event id taken...")
		else :
			event = EventModel(
				eventId =new_event_id, 
				eventName=args['eventName'], 
				eventCreator=args['eventCreator'], 
				eventEndDate=args['eventEndDate'], 
				eventStartDate=args['eventStartDate'], 
				eventLocation=args['eventLocation'], 
				eventStartTime=args['eventStartTime'],
				eventEndTime=args['eventEndTime'], 
				eventDescription=args['eventDescription'],
				updateDate= datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
				)
			db.session.add(event)
			db.session.commit()
		return event, 201

class UpdateEvent(Resource):
	@marshal_with(resource_fields_event)
	def patch(self, event_id):
		args = event_update_args.parse_args()
		result = EventModel.query.filter_by(eventId=event_id).first()
		if not result:
			abort(404, message="Event doesn't exist, cannot update")

		if args['eventName']:
			result.eventName = args['eventName']
		if args['eventLocation']:
			result.eventLocation = args['eventLocation']
		if args['eventStartTime']:
			result.eventStartTime = args['eventStartTime']
		if args['eventEndTime']:
			result.eventStartTime = args['eventEndTime']
		if args['eventEndDate']:
			result.eventStartTime = args['eventEndDate']
		if args['eventStartDate']:
			result.eventStartTime = args['eventStartDate']
		if args['eventDescription']:
			result.eventStartTime = args['eventDescription']
		if args['eventCreator']:
			result.eventStartTime = args['eventCreator']
		if args['updateDate']:
			result.status = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
		
		db.session.commit()

		return result, 201

class SignupEvent(Resource):
	@marshal_with(resource_fields_signup)
	def post(self, user_name):
		new_signup_id = uuid.uuid4().int & (1<<16)-1
		args = signup_put_args.parse_args()
		result = SignUpModel.query.filter_by(signUpId=new_signup_id).filter_by(status=0).first()
		if result:
			abort(409, message="signUp id taken...")
		second_result = SignUpModel.query.filter_by(eventName=args['eventName']).filter_by(userMail=args['userMail']).filter_by(status=0).first()
		if second_result:
			abort(409, message="you already SignedUp fot that event")
		signup = SignUpModel(
			signUpId=new_signup_id, 
			userMail=args['userMail'], 
			eventId=args['eventId'],
			eventName= args['eventName'], 
			eventStartDate=args['eventStartDate'],
			eventEndDate= args['eventEndDate'],
			status = 1,
			updateDate= datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
			)
		db.session.add(signup)
		db.session.commit()
		msg = Message('Hello eventy tik-tok take home test', sender = 'fabi.rabi01@gmail.com', recipients = [args['userMail']])
		msg.body = "{} signed up for {} thanks a lot and enjoy your event".format( user_name ,args['eventName'])
		mail.send(msg)
		return signup, 201

class UnSignupEvent(Resource):
	@marshal_with(resource_fields_signup)
	def post(self, event_id):
		args = signup_update_args.parse_args()
		result = SignUpModel.query.filter_by(eventId=event_id).first()
		if not result:
			abort(404, message="SignUp doesn't exist, cannot update")
		if args['userMail']:
			result.userMail = args['userMail']
		result.status = 0
		result.updateDate = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
		
		db.session.commit()

		return result, 201
class ListAllEvents(Resource):
	@marshal_with(resource_fields_event)
	def get(self):
		result = EventModel.query.all()
		if not result:
			abort(404, message="Could not find any event in the db ")
		return result, 201

class SignedUp(Resource):
	@marshal_with(resource_fields_signup)
	def get(self, user_mail):
		result= SignUpModel.query.filter_by(userMail=user_mail).filter_by(status=1).all()
		if not result:
			abort(404, message="Could not find user with that id")
		return result, 201

	# def delete(self, signup_id):
	# 	# abort_if_video_id_doesnt_exist(signup_id)
	# 	del signups[signup_id]
	# 	return '', 204



api.add_resource(User, "/user/<string:user_mail>") #retrieve user from the db 
api.add_resource(Login, "/user/login/<string:user_mail>") #retrieve login info from a user
api.add_resource(Register, "/user/register/<string:user_mail>") #post a new registered user in the db
api.add_resource(CreateEvent,"/event/create/") #post a new event in the db
api.add_resource(UpdateEvent, "/event/update/<int:signup_id>") #update an event if needed. 
api.add_resource(SignupEvent, "/signup/<string:user_name>") #post a new signup in the db. 
api.add_resource(UnSignupEvent, "/signup/unsign/<int:event_id>") #unsign a user from an event in the db. 
api.add_resource(ListAllEvents, "/event/listAllEvents/") #list all events in the db. 
api.add_resource(SignedUp, "/signedup/<string:user_mail>") #list all events that a user have signedup to so far. 





if __name__ == "__main__":
	app.run(debug=True)