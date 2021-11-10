const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./schema/graphqlSchema');

const app = express();

// app.use('/',(req, res) => {
//     res.send("Welcome to GraphQL server")
// })

app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphqlSchema,
        graphiql: true
    })
);


app.listen(5000, () => {
    console.log("listening on port 5000");
});