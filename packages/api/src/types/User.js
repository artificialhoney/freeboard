export default `
	type User {
    _id: ID!
    email: String!
    admin: Boolean!
    active: Boolean!
    registrationDate: String!
    lastLogin: String!
	}

  type Query {
    """ Get list of all users registered on database """
    listAllUsers: [User]
  }

  type Token {
    token: String
  }

  type Mutation {
    """ It allows users to register """
    registerUser(email: String!, password: String!): Token

    """ It allows users to authenticate """
    authUser(email: String!, password: String!): Token

    """ It allows to user to delete their account permanently """
    deleteMyUserAccount: User!
  }
`;
