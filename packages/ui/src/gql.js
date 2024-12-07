import gql from "graphql-tag";

export const DASHBOARD_CREATE_MUTATION = gql`
  mutation DashboardCreate($dashboard: CreateDashboardInput!) {
    createDashboard(dashboard: $dashboard) {
      _id
      title
      published
      image
      datasources
      columns
      width
      panes
      authProviders
    }
  }
`;

export const DASHBOARD_UPDATE_MUTATION = gql`
  mutation DashboardUpdate($id: ID!, $dashboard: UpdateDashboardInput!) {
    updateDashboard(_id: $id, dashboard: $dashboard) {
      _id
      title
      published
      image
      datasources
      columns
      width
      panes
      authProviders
    }
  }
`;

export const DASHBOARD_READ_QUERY = gql`
  query DashboardRead($id: ID!) {
    dashboard(_id: $id) {
      _id
      title
      published
      image
      datasources
      columns
      width
      panes
      authProviders
    }
  }
`;
