const Event = require("../../models/event");
const User = require("../../models/user");

const getEvents = eventIds => {
	return Event.find({ _id: { $in: eventIds } })
		.then(events => {
			return events.map(event => {
			 	return { ...event._doc, creator: getUser.bind(this, event.creator) }
			})
		})
		.catch(err => {
			throw err;
		})
}

const getUser = userId => {
	return User.findById(userId)
		.then((user) => {
			let obj = { ...user._doc, createdEvents: getEvents.bind(this, user.createdEvents) };
			return obj;
		})
		.catch(err => {
			throw err;
		});
}

module.exports = {
	events: () => {
		return Event.find().then(events => {
			return events.map(event => {
				return { ...event._doc, creator: getUser.bind(this, event._doc.creator) };
			});
		})
		.catch(err => {
			throw err;
		});
	},
	createEvent: (args) => {
		const event = new Event({
			title: args.eventInput.title,
			description: args.eventInput.description,
			price: args.eventInput.price,
			creator: '5d0197fd51688f224c12aae4'
		});
		let createdEvent;
		return event.save().then((result) => {
			createdEvent = { ...result._doc };
			return User.findById('5d0197fd51688f224c12aae4');
		})
		.then((user) => {
			if(!user) {
				throw new Error("User doesn't exists.");
			}
			user.createdEvents.push(event);
			return user.save();
		})
		.then(() => createdEvent)
		.catch((error) => {
			console.log(error);
			throw err;
		});
	},
	users: () => {
		return User.find().then(users => {
			return users.map(user => {
				return { ... user._doc, createdEvents: getEvents.bind(this, user._doc.createdEvents) }; 
			});
		}).catch(err => {
			throw err;
		});
	},
	createUser: (args) => {
		return User.findOne({ email: args.userInput.email }).then((res) => {
			
			if(res) {
				throw new Error("User exists already.");
			}
			
			const user = new User({
				email: args.userInput.email,
				password: args.userInput.password //hash it later
			});
			
			return user.save().then((res) => {
				return { ...res._doc }
			}).catch((err) => {
				console.log(err);
				throw err;
			});

		});
	}
}