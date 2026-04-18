//Now uses new MongoDB dao
const dao = require('../model/MongoDB-dao.js');

//Switched to async function due to new dao
exports.getAllFacts = async function(req, res){
    res.status(200);
    res.send(await dao.readAllFacts());
};

//Async function for new dao
exports.getFact = async function(req, res){
    let id = req.params.id; //Removed parseint because MongoDB id's are strings
    let fact = await dao.readFact(id); //Await call because its now async

    if(fact != null){
        res.status(200);
        res.send(fact);
    } else {
        res.status(404);
        res.send({message: "Fact not found"});
    }
};

exports.createFact = async function(req, res){ //Switch to async
    let fact = req.body;
    if(fact != null && fact.fact != null){
        let createdFact = await dao.createFact(fact); //add await because its now async
        res.status(201);
        res.send(createdFact);
    } else {
        res.status(400);
        res.send({message: "Invalid fact"});
    }
};

exports.updateFact = async function(req, res){ //Switch to async
    let uid = req.params.id;
    let fact = req.body;
    if(fact != null && fact.fact != null){ 
        let updatedFact = await dao.updateFact(fact, uid); //add await because function is now async
        if(updatedFact != null){
            res.status(200);
            res.send(updatedFact);
        }
        else {
            res.status(404);
            res.send({message: "Fact not found"});
        }
    }
};

exports.delete = function(req, res){
    let id = parseInt(req.params.id);
    let deletedFact = dao.delete(id);
    if(deletedFact != null){
        res.status(200);
        res.send(deletedFact);
    } else {
        res.status(404);
        res.send({message: "Fact not found"});
    }
};
