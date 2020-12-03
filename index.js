require("dotenv").config();
const express = require("express");
const lsibwiki = express();
const sequelize = require("./db");
const controllers = require("./controllers/controllerIndex");

lsibwiki.use(express.json());
lsibwiki.use(require("./middleware/headers"));

/**********************
 * OPEN ROUTES
 **********************/
lsibwiki.use("/user", controllers.User);

/**********************
 * AUTHENTICATED ROUTES
 **********************/

// lsibwiki.use(
//   "/list",
//   require("./middleware/validate-session"),
//   controllers.List
// );

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync();
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Unable to connect", err);
  });

lsibwiki.listen(process.env.PORT, () => {
  console.log(`LSiB Wiki is listening on port ${process.env.PORT}`);
});
