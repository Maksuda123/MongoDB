//schema design

const mongoose = require('mongoose');
const router = require('../routeHandler/todoHandler');
const todoSchema = mongoose.Schema({
    //fild... validation korbo
    title: {//mongo te aita korte parbo na
        type: String,
        requird: true,
    },
    description: String,   //aita r require korno na
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    date: {
        type: Date,
        default: Date.now,
    }
})
//mongoose documentation ai gula ase

//ai Schema k use kore model banabo, shei model er maddome amra bibbino method, property use kore tabile data insert update shob kisu korte parbo.

//instance method
todoSchema.methods = {
  findActive: function () {
    //mongoose query
    return mongoose.model("Todo").find({ status: "active" });
  },
  findActiveCallback: function (cb) {
    //mongoose query
    return mongoose.model("Todo").find({ status: "active" }, cb);
  },
};

//static method
todoSchema.statics = {
    findByJS: function () {
        return this.find({title: /js/i});
    }
}

//Query helpers
todoSchema.query = {
    byLanguage: function (language) {
      return this.find({ title: new RegExp(language, "i") }); //new RegExp(language, "i") or {title: /js/i} = aita te variable dewa jai na.
    }
}
module.exports = todoSchema;


