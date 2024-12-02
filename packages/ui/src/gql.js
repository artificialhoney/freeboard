import gql from "graphql-tag";

export const DASHBOARD_QUERY = gql`
  query Dashboard($id: ID!) {
    dashboard(_id: $id) {
      _id
      title
      published
      image
      datasources
      columns
      width
      panes
      layout
    }
  }
`;
