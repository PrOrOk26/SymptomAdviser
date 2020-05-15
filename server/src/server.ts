import errorHandler from "errorhandler";

import app from "./app";

app.use(errorHandler());

const server = app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});

export default server;