const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const app = express();

const schematic = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
  schema: schematic,
  rootValue: resolvers,
  graphiql: true
}));

mongoose.connect(`mongodb://localhost:27017/graphql`, { useNewUrlParser: true }).then()
  .catch((err) => console.log(err))
  .then(() => {
    app.listen(3000, () => {
      console.log('[Backend] Server started on port 3000.');
    });
  });


