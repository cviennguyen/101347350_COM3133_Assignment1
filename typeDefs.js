const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String
    salary: Float!
  }

  type User {
    id: ID!
    username: String!
    email: String
    password: String!
  }

  type Query {
    getAllEmployees: [Employee]
    getEmployee(id: ID!): Employee
  }

  input EmployeeInput {
    firstName: String
    lastName: String
    email: String
    gender: String
    salary: Float
  }

  input UserInput {
    username: String
    email: String
    password: String
  }

  type Mutation {
    createEmployee(employee: EmployeeInput!): Employee
    deleteEmployee(id: ID!): String
    updateEmployee(id: ID!, employee: EmployeeInput!): Employee
    signup(user: UserInput!): String
    login(username: String!, password: String!): String
  }
`;

module.exports = typeDefs;
