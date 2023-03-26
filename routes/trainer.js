const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/user");
const Trainer = require("../models/Trainer");

router.get('/records',fetchUser,async (req,res)=>{
    try{
        const trainers = await Trainer.find()
        const status = true;
        res.send({status,trainers});
    }catch(err){
        res.status(500).send({status:false,msg:"Internal server error",error:err.message});
    }
})
router.get('/records/:id',async (req,res)=>{
    try{
        const trainer = await Trainer.findOne({_id : req.params.id})
        res.send({status:true,trainer});
    }catch(err){
        res.status(500).send({status:false,msg:"Internal server error",error:err.message});
    }
})

router.post('/records', async (req, res) => {
  try {
    let status = false
    const bsgid = req.body.bsgid;
    const dob = req.body.dob;
    const record  = await Trainer.find({bsgid,dob})
    if(record.length === 0){
      res.status(404).json({ status:status,msg: "No record found" });
    }else{
      res.send({status:"true",record:record[0]});
    }
  } catch (err) {
    res.status(500).json({status:false, msg: "Internal Server Error", error : err.message });
  }
});

router.post('/addTrainer',fetchUser, async (req, res) => {
  try {
    let status = true
    const record = req.body;
    await Trainer.create(record)
    res.send({status,msg:"Trainer created successfully"});
  } catch (err) {
    res.status(500).json({status:false, msg: "Internal Server Error", error : err.message });
  }
});

router.patch('/records/:id', fetchUser,async (req, res) => {
  try {
    let status = true
    const record = req.body;
    await Trainer.findByIdAndUpdate(req.params.id,record)
    res.send({status,msg:"Trainer updated successfully"});
  } catch (err) {
    res.status(500).json({status:false, msg: "Internal Server Error", error : err.message });
  }
});

module.exports = router;