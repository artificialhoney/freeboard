export default (url) =>
  __FREEBOARD_PROXY_URL__ +
  "/?" +
  new URLSearchParams([["url", encodeURI(url)]]).toString();
