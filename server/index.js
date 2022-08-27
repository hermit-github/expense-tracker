const app = require("./app");
require("./config/db")()


app.listen(process.env.PORT,() => console.log(`Listening on port ${process.env.PORT}`))