import * as http from "http";

const onRequest = (clientReq, clientRes) => {
  const url = new URL(
    new URL(
      clientReq.url || "",
      `http://${clientReq.headers.host}`,
    ).searchParams.get("url"),
  );
  console.log("serve: " + url);

  const options = {
    host: url.host,
    hostname: url.hostname,
    port: url.port,
    protocol: url.protocol,
    path: url.href,
    method: clientReq.method,
    headers: clientReq.headers,
  };

  const proxy = http.request(url, options, (res) => {
    clientRes.writeHead(res.statusCode, res.headers);
    res.pipe(clientRes, {
      end: true,
    });
  });

  clientReq.pipe(proxy, {
    end: true,
  });
};
http.createServer(onRequest).listen(process.env.PORT || 8000);
