const mongoose = require('mongoose');


CONNECTION_STRING = "mongodb+srv://user:PWJuXJD4YMV42O3h@cluster0.vnkdy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


//connect to the MogoDB database
mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const model = mongoose.connection;
model.on("error", err => {
    console.error(err);
    process.exit(1);
});
model.once("open", async () => {
    console.log("Mongo connection started on " + model.host + ":" + model.port);
});



require('./User');