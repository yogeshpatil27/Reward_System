import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bcrypt from "bcrypt";
import jwt from "JsonWebToken";
import { jwtSecret, jwtExpire } from "./config/dev.js";
import dotenv from 'dotenv'
import employeesRoutes from './routes/employees.js'
import bodyParser from 'body-parser';


const app = express();

dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const PORT= process.env.PORT || 9009 
app.listen(PORT, () => {
  console.log(`Apllication started at port ${PORT}`);
});

//Doing Connection
mongoose
  .connect(process.env.Mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB is not connected",err);
  });

//Schema Defination
const employee1 = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  designation: String,
  department: String,
  password: String,
});

//Collection creation
//Employee will be name of document and it will become "employees" in DB
 const Employee = new mongoose.model("Employee", employee1);



// Register a Employee
// app.post("/register", (req, res) => {
//   const { name, email, designation, department, password } = req.body;

//   Employee.findOne({ email: email }, async (err, user) => {
//     if (user) {
//       res.send({ message: "User already registerd" });
//     } else {
//       const Emp = new Employee({
//         name,
//         email,
//         designation,
//         department,
//         password,
//       });

//       const salt = await bcrypt.genSalt(10);
//       Emp.password = await bcrypt.hash(password, salt);

//       Emp.save()
//         .then(() => {
//           res.send({ message: "SucessFully Register" });
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     }
//   });
// });

  //get all emp list
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email:email });
    const isMatch = await bcrypt.compare(password, user.password);
    try {
      if (!user) {
        res.send({ message: "Email not registered" });
      } else if (!isMatch) {
        res.send({ message: "Wrong Password" });
      } else {
        const payload = {
          user: {
            _id: user._id,
          },
        };

        const createToken = async () => {
          const token =  jwt.sign(payload, jwtSecret, {
            expiresIn: jwtExpire,
          });
          const { _id, name, designation } = user;
          res.send({
            token,
            user: { _id, name, designation },
            message: "Login Successfull",
          });
        };
        createToken();
     }
    } catch (err) {
      console.log("sign in err: ", err);
      res.send({ message: "Server Error " });
    }
  });



app.use("/employees",employeesRoutes);


export default Employee