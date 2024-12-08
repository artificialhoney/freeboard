export default (url) =>
  "/proxy/?" + new URLSearchParams([["url", url]]).toString();
