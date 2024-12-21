import express from "express";
import session from "express-session";
import grant from "grant";

const PORT = process.env.PORT || 9001;

const app = express();

app.use(session({secret: 'grant'}))
app.use(grant.express()({/*configuration - see below*/}))

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Proxy listening on port ${PORT}`);
});
