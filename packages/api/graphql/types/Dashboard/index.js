export default `
  type Dates {
    published: String
    updated: String
  }

  type Dashboard {
    _id: ID!
    title: String!
    body: String!
    published: Boolean!
    date: Dates
  }

  type Query {
    dashboard(_id: ID!): Dashboard!
    dashboards: [Dashboard!]!
  }

  type Mutation {
    createDashboard(dashboard: CreateDashboardInput): Dashboard!
    updateDashboard(_id: ID!, dashboard: UpdateDashboardInput): Dashboard!
    deleteDashboard(_id: ID!): Dashboard!
  }

  type Subscription {
    dashboard: DashboardSubscriptionPayload!
  }

  type DashboardSubscriptionPayload {
    mutation: MutationType!
    dashboard: Dashboard!
  }

  input DatesInput {
    published: String
    updated: String
  }

  input CreateDashboardInput {
    title: String!
    body: String!
    published: Boolean!
    date: DatesInput
  }

  input UpdateDashboardInput {
    title: String
    body: String
    published: Boolean
    date: DatesInput
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;