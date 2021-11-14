const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require('./routeHandler/todoHandler')

//express app initialization
const app = express();
app.use(express.json());//amra jeta pabo ekta js object e pabo

//database connection with mongoos locally & remote amra onno ek shomoi dekbo
//todos name amder kono database nai but kaj korbe
mongoose
  .connect("mongodb://localhost/todos", {
    useUnifiedTopology: true,
  }) //aita akta async way
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));


app.use('/todo', todoHandler);


//default error handler
function errorHandler(err, req, res, next) {
    if (req.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.listen(3000, () => {
    console.log('app listening at port 3000');
});

