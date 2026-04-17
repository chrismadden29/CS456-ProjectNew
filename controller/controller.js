const dao = require('../model/dao');

exports.getAllFacts = function(req, res){
    res.status(200);
    res.send(dao.readAll());
};

exports.get = function(req, res){
    let id = parseInt(req.params.id);
    let fact = dao.read(id);

    if(fact != null){
        res.status(200);
        res.send(fact);
    } else {
        res.status(404);
        res.send({message: "Fact not found"});
    }
};

exports.create = function(req, res){
    let fact = req.body;
    if(fact != null && fact.fact != null){
        let createdFact = dao.create(fact);
        res.status(201);
        res.send(createdFact);
    } else {
        res.status(400);
        res.send({message: "Invalid fact"});
    }
};

exports.update = function(req, res){
    let id = parseInt(req.params.id);
    let fact = req.body;
    if(fact != null && fact.fact != null){
        fact.id = id;
        let updatedFact = dao.update(id, fact);
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
