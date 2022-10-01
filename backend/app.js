const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
  
// Create Express Server
const app = express();
  
// Configuration
const PORT = 3001;
const HOST = "localhost";

  

  
// Proxy Logic :  Proxy endpoints
app.use(
    "/weather",
    createProxyMiddleware({
        target: "http://82.180.137.231:8080/api",
        changeOrigin: true,
        pathRewrite: {
            "^/weather": "",
        },
    })
);
  
// Starting our Proxy server
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});