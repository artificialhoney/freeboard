export default `
  scalar Object

  type Dashboard {
    _id: ID!
    title: String!
    version: String!
    published: Boolean!
    image: String
    datasources: [Object]
    columns: Int
    width: String
    panes: [Object]
    layout: [Object]
  }

  type Query {
    dashboard(_id: ID!): Dashboard
    dashboards: [Dashboard]!
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

  input CreateDashboardInput {
    title: String!
    version: String!
    published: Boolean!
    image: String
    datasources: [Object]
    columns: Int
    width: String
    panes: [Object]
    layout: [Object]
  }

  input UpdateDashboardInput {
    title: String
    version: String
    published: Boolean
    image: String
    datasources: [Object]
    columns: Int
    width: String
    panes: [Object]
    layout: [Object]
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;
