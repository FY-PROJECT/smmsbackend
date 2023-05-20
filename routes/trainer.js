const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/user");
const Trainer = require("../models/Trainer");
const Reply = require("../reply");

/**
 * @route   POST /api/trainer/addTrainer
 * @desc    Adds a new trainer
 * @access  Private
 * @param   trainer object in body of request (Refer to Trainer model for more details)
 * @return  status, msg (status: true if successful, msg: message to be displayed to user) 
 */
router.post('/addTrainer', async (req, res) => {
  try {
    const record = req.body;
    console.log(record);
    const existingRecord = await Trainer.findOne({ bsgid: record.bsgid });
    if (existingRecord) {
      return res.status(400).send({ status: false, msg: 'Record already exists\n Contact Admin if this is a mistake' });
    }
    await Trainer.create(record)
    res.send({status:true,msg:"Recorded successfully"});
  } catch (err) {
    res.status(500).json({status:false, msg: "Internal Server Error" });
  }
}); 

/**
  @route  GET /api/trainer/count
  @desc   Get the count of trainers
  @access Public
  @param  None
*/
router.get('/count',async (req,res)=>{
    try{
      const result = await Trainer.aggregate([
        {
          $facet: {
            assistantLeaderTrainerScout: [
              { $match: { category: "Assistant Leader Trainer", unit: "Scout" } },
              { $count: "count" }
            ],
            assistantLeaderTrainerRover: [
              { $match: { category: "Assistant Leader Trainer", unit: "Rover" } },
              { $count: "count" }
            ],
            assistantLeaderTrainerCub: [
              { $match: { category: "Assistant Leader Trainer", unit: "Cub" } },
              { $count: "count" }
            ],
            leaderTrainerScout: [
              { $match: { category: "Leader Trainer", unit: "Scout" } },
              { $count: "count" }
            ],
            leaderTrainerRover: [
              { $match: { category: "Leader Trainer", unit: "Rover" } },
              { $count: "count" }
            ],
            leaderTrainerCub: [
              { $match: { category: "Leader Trainer", unit: "Cub" } },
              { $count: "count" }
            ]
          }
        }
      ]);
      
      const assistantLeaderTrainerScoutCount = result[0].assistantLeaderTrainerScout[0]?.count || 0;
      const assistantLeaderTrainerRoverCount = result[0].assistantLeaderTrainerRover[0]?.count || 0;
      const assistantLeaderTrainerCubCount = result[0].assistantLeaderTrainerCub[0]?.count || 0;
      const leaderTrainerScoutCount = result[0].leaderTrainerScout[0]?.count || 0;
      const leaderTrainerRoverCount = result[0].leaderTrainerRover[0]?.count || 0;
      const leaderTrainerCubCount = result[0].leaderTrainerCub[0]?.count || 0;
      
      const trainerCount = {
        assistantLeaderTrainerScoutCount,
        assistantLeaderTrainerRoverCount,
        assistantLeaderTrainerCubCount,
        leaderTrainerScoutCount,
        leaderTrainerRoverCount,
        leaderTrainerCubCount,
        leaderTrainerCount: leaderTrainerScoutCount + leaderTrainerRoverCount + leaderTrainerCubCount,
        assistantLeaderTrainerCount: assistantLeaderTrainerScoutCount + assistantLeaderTrainerRoverCount + assistantLeaderTrainerCubCount,
      }
      
      res.send({status : true,trainerCount});

    }catch(err){
        res.status(500).send({status:false,msg:"Internal server error"});
    }
})

/**
  @route  GET /api/trainer/records
  @desc   Fetches and returns all the records of trainers
  @access Private
 */
router.get('/records',fetchUser,async (req,res)=>{
    try{
        const trainers = await Trainer.find().select("-_id -__v")
        trainers.length === 0 ? res.status(404).send({status:false,msg:"No Record Found"}) : res.status(200).send({status:true,trainers});
    }catch(err){
        res.status(500).send({status:false,msg:"Internal server error"});
    }
})

/**
 * @route   GET /api/trainer/records/:bsgid
 * @desc    Fetches and returns the record of a individual trainer by bsgid
 * @access  Public
 * @param   bsgid : in params of request
 * @param   dob : in headers of request
 */
router.get('/records/:bsgid', async (req, res) => {
  try {
    const dob = (req.headers.dob);
    console.log(dob);
    if (!dob) {
      return res.status(400).send({ status: false, msg: 'Invalid Authentication' });
    }
    const trainer = await Trainer.findOne({
      bsgid: req.params.bsgid.toUpperCase(),
      dob: dob,
    }).select('-_id -__v');
    if (trainer) {
      return res.send({ status: true, trainer });
    } else {
      return res.status(404).send({ status: false, msg: 'No record found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: false, msg: 'Internal server error', error: err.message });
  }
});



/**
 * @route   PATCH /api/trainer/records/:id
 * @desc    Updates the record of a individual trainer by bsgid
 * @access  Private
 * @param   bsgid
 * @body    record
 */
router.patch('/records/:id', fetchUser,async (req, res) => {
  try {
    let status = true
    const record = req.body;
    const bsgid = req.params.id.toUpperCase();
    const existingRecord = await Trainer.findOne({ bsgid: bsgid });
    if (!existingRecord) {
      return res.status(400).send({ status: false, msg: 'Record does not exists' });
    }
    await Trainer.findOneAndUpdate({ bsgid: bsgid }, record);
    res.send({status,msg:"Trainer updated successfully"});
  } catch (err) {
    res.status(500).json({status:false, msg: "Internal Server Error", error : err.message });
  }
});


/**
 * @route   DELETE /api/trainer/records/:id
 * @desc    Deletes the record of a individual trainer by bsgid
 * @access  Private
 * @param   bsgid
*/
router.delete('/records/:id', fetchUser,async (req, res) => {
  try {
    let status = true
    const bsgid = req.params.id.toUpperCase();
    const existingRecord = await Trainer.findOne({ bsgid: bsgid });
    if (!existingRecord) {
      return res.status(400).send({ status: false, msg: 'Record does not exists' });
    }
    await Trainer.findOneAndDelete({bsgid})
    res.send({status,msg:"Trainer deleted successfully"});
  } catch (err) {
    res.status(500).json({status:false, msg: "Internal Server Error", error : err.message });
  }
});

module.exports = router;