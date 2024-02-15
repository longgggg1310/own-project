const app = require("./src/app");

const PORT = process.env.DEV_APP_PORT || 3056;
console.log(`listening 1 ${process.env.DEV_APP_PORT}`);

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// process.on("SIGINT", () => {
//   server.close(() => console.log(`Exit`));
// });
