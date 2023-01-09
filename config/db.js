const URL_DB = process.env.URL_DB;

const url =
  "mongodb+srv://khouma964:Khouma1996@formsdaaras.iwqt6kg.mongodb.net/?retryWrites=true&w=majority";

const mongoose = require("mongoose");
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
    // serverApi: ServerApiVersion.v1,
  })
  .then(() => console.log("connected to mongo db"))
  .catch((err) => console.log("Failed to connect to mongo " + err));
