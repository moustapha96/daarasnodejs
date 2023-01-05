const name_database = process.env.NAME_DATABASE;

const url = "mongodb://localhost:27017/recensement-daaras";


const mongoose = require('mongoose');
mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(() => console.log('connected to mongo db'))
  .catch((err) => console.log('Failed to connect to mongo ' + err))