export const transformDashboard = (u) => ({
  _id: u._id.toString(),
  version: u.version,
  title: u.title,
  published: u.published,
  image: u.image,
  datasources: u.datasources,
  columns: u.columns,
  panes: u.panes,
  width: u.width,
  authProviders: u.authProviders,
  createdAt: u.createdAt,
  updatedAt: u.updatedAt,
});
