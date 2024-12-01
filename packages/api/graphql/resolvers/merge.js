export const transformDashboard = (u) => ({
  _id: u._id.toString(),
  title: u.title,
  published: u.published,
  headerImage: u.headerImage,
  datasources: u.datasources,
  userColumns: u.userColumns,
  panes: u.panes,
  maxWidth: u.maxWidth,
  createdAt: u.createdAt,
  updatedAt: u.updatedAt,
});
