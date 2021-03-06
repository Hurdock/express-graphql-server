const { buildSchema } = require('graphql');

module.exports = buildSchema(`
	type Event {
		_id: ID!
		title: String!
		description: String!
		price: Float!
		date: String!
		creator: User!
	}

	type User {
		_id: ID!
		email: String!,
		password: String,
		createdEvents: [Event!]
	}

	input UserInput {
		email: String!
		password: String!
	}

	input EventInput {
		title: String!
		description: String!
		price: Float!
		date: String!
	}

	type rootQuery {
		events: [Event!]!
		users: [User!]!
	}

	type rootMutation {
		createEvent(eventInput: EventInput): Event
		createUser(userInput: UserInput): User
	}

	schema {
		query: rootQuery,
		mutation: rootMutation
	}
`);