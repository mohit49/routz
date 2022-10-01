const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
  
// Create Express Server
const app = express();
  
// Configuration
const PORT = 3003;
const HOST = "localhost";

  

  
// Proxy Logic :  Proxy endpoints
app.use(
    "/api",
    createProxyMiddleware({
        target: "http://82.180.137.231:8080",
        changeOrigin: true,
        pathRewrite: {
            "^/api": "",
        },
    })
);
  
// Starting our Proxy server
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});