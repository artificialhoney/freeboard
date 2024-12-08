import * as http from "http";
import * as https from "https";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = process.env.PORT || 8001;

const app = express();

app.use(bodyParser.text({ type: "*/*" }));
app.use(cors());

app.all("/", (clientReq, clientRes) => {
  const url = new URL(
    new URL(
      clientReq.url || "",
      `https://${clientReq.headers.host}`,
    ).searchParams.get("url"),
  );

  const isHttps = url.protocol.indexOf("https") === 0;

  const options = {
    host: url.host,
    port: isHttps ? 443 : url.port,
    protocol: url.protocol,
    path: url.href,
    method: clientReq.method,
    headers: clientReq.headers,
  };

  if (isHttps) {
    options.agent = new https.Agent({
      rejectUnauthorized: false,
      servername: url.hostname,
    });
  }

  const proxy = (isHttps ? https : http).request(options, (res) => {
    clientRes.writeHead(res.statusCode, res.headers);
    res.pipe(clientRes, {
      end: true,
    });
  });

  proxy.on("error", (e) => console.error(e));

  if (["POST"].includes(options.method)) {
    proxy.write(clientReq.body);
  }
  proxy.end();
});

app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
