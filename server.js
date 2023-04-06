const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const dotenv = require("dotenv");
const cors = require("cors");
const product = require("./routes/product");

dotenv.config();

async function startApolloServer() {
  const app = express();
  app.use(cors());
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3001;

  const DB_URL = process.env.DB_URL;
  // TODO - Update your mongoDB Atals Url here to Connect to the database
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      autoIndex: true,
    })
    .then(() => {
      console.log(
        "Successfully connected to the database mongoDB Atlas Server"
      );
    })
    .catch((err) => {
      console.log("Could not connect to the database. Exiting now...", err);
      process.exit();
    });

  app.use("/api/product", product);

  app.listen(4000, () => console.log("server in running on port 4000"));
}

startApolloServer();
