const http = require("node:http");

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  if (req.url === "/") {
    res.statusCode = 200;
    res.end("Welcome home psage");
  } else if (req.url === "/image") {
    res.setHeader("Content-Type", "image/png");
  } else if (req.url === "/contact") {
    res.statusCode = 200;
    res.end("Welcome contact");
  } else {
    res.statusCode = 404;
    res.end("notfound");
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log("server", desiredPort);
});
