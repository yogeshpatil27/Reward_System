import mongoose from "mongoose";
import express, { response } from "express";

const router = express.Router();
const Schema=mongoose.Schema;

const nominations = new mongoose.Schema({
    _id:Schema.Types.ObjectId,
  fullName: String,
  designation: String,
  nominatedBy: String,
  criteria: {
    type: Array,
  },
  department: String,
  praise: String,
});

const Nominated = new mongoose.model("Nomination", nominations);

router.post("/", async (req, res) => {
  const {
    _id,
    fullName,
    designation,
    nominatedBy,
    criteria,
    department,
    praise,
  } = req.body;

  const nom = new Nominated({
      _id,
    fullName,
    designation,
    nominatedBy,
    criteria,
    department,
    praise,
  });

  await nom
    .save()
    .then(() => {
      res.send({ message: "Succesduflt Nominated" });
    })
    .catch((e) => {
      console.log("Error occures while Nominating", e);
    });
});


router.get('/', async(req,res)=>{
 
    try {
      const emp = await Nominated.find();
      //    res.json(emp);
      res.send(emp);
    } catch (err) {
      res.send(err);
    }
 
})

export default router;
