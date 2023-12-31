const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const FormDataModel = require("./models/FormData");
const CostModel = require("./models/Cost");
const multer = require('multer');
const upload = multer();
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/bryce"
  )
  .then((r) => {
    console.log("Connect success");
  });

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json("Email Already registered");
    } else {
      FormDataModel.create({
        ...req.body,
        totalCost: 0,
      })
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    }
  });
});

app.get("/cost", async (req, res) => {
  try {
    const data = await CostModel.find({});
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json(error);
  }
});
app.post("/cost", async (req, res) => {
  try {
    const createCost = CostModel.create(req.body);
    return res.status(200).json(createCost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.post("/save-cost", async (req, res) => {
  const { user_id, cost } = req.body;

  const user = await FormDataModel.findById(user_id);
  const newTotalCost = Number(user.totalCost) + Number(cost);
  const result = await FormDataModel.updateOne(
    { _id: user_id },
    { $set: { totalCost: newTotalCost } }
  );
  return res
    .status(200)
    .json({ result, message: `Total cost ${newTotalCost}` });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        const dataUser = user;
        delete dataUser.password;
        if (user.password === password) {
          return res
            .status(200)
            .json({ message: "Success", status: 200, user });
        } else {
          res.status(400).json("Wrong password");
        }
      } else {
        res.status(404).json("No records found!");
      }
    })
    .catch((err) => {
      return res.status(500).json("Internal server error");
    });
});
app.post("/user", async (req, res)=> {
  const userid = req.body;
  console.log(userid);
  const user = await FormDataModel.findOne(userid);
  if(user){
    return res.status(200).json({message: 'Okay', status: 200, user});
  }else {
    res.status(404).json("No User");
  }
})
app.post("/bill",async (req, res) => {
  const {userid, period} = req.body;
  const user = await FormDataModel.findById(userid);
  const newTotalCost = Number(user.totalCost) - period;
  const result = await FormDataModel.updateOne(
    {_id: userid},
    { $set: { totalCost: newTotalCost }}
  )
  console.log("payload", newTotalCost)
  if(user){
    return res
  .status(200)
  .json({user, message: "Payment Success"})
  }
 
})

app.listen(4000, () => {
  console.log("Server listining on http://127.0.0.1:4000");
});
