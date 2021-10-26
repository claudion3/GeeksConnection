require('dotenv').config();
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./graphql/typeDefs');
const connectDB = require('./config/db');
const resolvers = require('./graphql/resolvers');

connectDB();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
