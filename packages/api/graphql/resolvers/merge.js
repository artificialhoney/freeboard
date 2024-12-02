export const transformDashboard = (u) => ({
  _id: u._id.toString(),
  title: u.title,
  published: u.published,
  image: u.image,
  datasources: u.datasources,
  columns: u.columns,
  panes: u.panes,
  layout: u.layout,
  maxWidth: u.maxWidth,
  createdAt: u.createdAt,
  updatedAt: u.updatedAt,
});
