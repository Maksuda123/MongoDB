const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema); //mongoose.model ekta class return kore tai new dite hosse //fast paramtter model er name ja singular dibo, polr na. 2nd parameter dibo kon schema use korbe.
//akhon amra ekta Todo object pelam

//toto name database create hobe collection/table toiri hobe todos name

//Routing setup.....

//get all todos
router.get("/", async (req, res) => {
  await Todo.find({ status: 'active' }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Todo was inserted successfully!",
      });
    }
  })
});

// //get all todos chain kore 
// router.get("/", async (req, res) => {
//   await Todo.find({ status: 'active' }).select({
//     //ai gula user k dekhabo na tai 0 kore disi
//     _id: 0,
//     _v: 0,//v dakhabai
//     date: 0,
//   }).exec((err, data) => {
//     if (err) {
//       res.status(500).json({
//         error: "There was a server side error!",
//       });
//     } else {
//       res.status(200).json({
//         message: "success!",
//       });
//     }
//   })
//   //ai execution a callback pabo
// });


//Ai code a ekta vule ase ta holo async await & callback use kora hoise ja  kokhono e 1 shate use kora hoi na. ja kono ekta korte hoi .
//get all todos chain kore 
router.get("/", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });
    res.status(200).json({
      result: data,
      message: "Success"
    })
  }
  catch (err) {
    res.status(500).json({
      error: "There was a server side error!"
    })
  }
});

//get Active todos
router.get("/active", async (req, res) => {
  const todo = new Todo();
  const data = await todo.findActive();
  res.status(200).json({
    data,
  })
});

//get Active todos using callback 
router.get("/active-callback", async (req, res) => {
  const todo = new Todo();
  todo.findActiveCallback((err, data) => {
   res.status(200).json({
     data,
   });
 });
  
});

//post multiple todos
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    //2nd paramert ekta callback

    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todos were inserted successfully!",
      });
    }
  });
});

//put todo
router.put("/:id", async (req, res) => {
 const result = await Todo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
   },
    //3rd parameter a option diya dissi
   {
     new: true, //update data notun ta pete chile
     useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Todos was updated successfully!",
        });
      }
    }
  );
  console.log(result);
});

//Delete todo
router.delete("/:id", async (req, res) => {
   await Todo.deleteOne({_id: req.params.id}, (err, data) => {
     if (err) {
       res.status(500).json({
         error: "There was a server side error!",
       });
     } else {
       res.status(200).json({
         message: "Todo was delete successfully!",
       });
     }
   });
});

//JavaScript Static 
class Person{
    constructor(name, age) {
        this.name = name;
    }
    eat() {
        console.log("Eat")
    }
    static isEqualAge() {
        console.log('I am Static');
    }
}
let sakib = new Person("sakib", 34);

Person.isEqualAge(); //static method tai er sakib.isEqualAge korte hoi nai.
sakib.eat();


//custom static method
router.get('/js', async (req, res) => {
  const data = await Todo.findByJS();
  res.status(200).json({
    data,
  })
});

//get todos by Language Query helper
router.get('/language', async (req, res) => {
  const data = await Todo.find().byLanguage("js");
  res.status(200).json({
    data,
  })
});

module.exports = router;
