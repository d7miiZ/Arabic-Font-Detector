const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api/calbot/predict", {
      target: "https://arabic-caligraphy-classifier.herokuapp.com",
      changeOrigin: true
    })
  );
};