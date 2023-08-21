const { Router, query } = require("express");
const doctors=require("../models/postModel")
const bcrypt = require("bcrypt")
const doctorRouter = Router();
const jwt= require("jsonwebtoken")


doctorRouter.get("/",async(req,res)=>{


try{
const doctorData=await doctors.find()
res.status(200).json({msg:"doctors",doctorData})
}catch(err){
    res.status(400).send(err.message); 
}
})

doctorRouter.post("/add",async(req,res)=>{
    try {
        const newDoctor = await doctors.create({
         ...req.body
        });
  
        res.status(200).json({ message: "Registration succesfull",doctor:newDoctor });
      
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
    

  doctorRouter.patch("/update/:id", async (req, res) => {
    const doctorId = req.params.id;
    try {
        const updatedDoctor = await doctors.findByIdAndUpdate(doctorId, {
            $set: req.body
        }, { new: true });

        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({ message: "Doctor updated successfully", doctor: updatedDoctor });

    } catch (err) {
        res.status(400).send(err.message);
    }
});

doctorRouter.delete("/delete/:id", async (req, res) => {
    const doctorId = req.params.id;
    try {
        const deletedDoctor = await doctors.findByIdAndRemove(doctorId);

        if (!deletedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({ message: "Doctor deleted successfully", doctor: deletedDoctor });

    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports=doctorRouter