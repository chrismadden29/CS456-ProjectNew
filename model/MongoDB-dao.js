const mongoose = require('mongoose');

const fibonacciSchema = mongoose.Schema({
    fact : String
})

const fibonacciModel = mongoose.model('fact', fibonacciSchema);

//Referenced class examples 
exports.readAllFacts = async function(){
    const lstFacts = await fibonacciModel.find();
    return lstFacts;
}

//Referenced class examples 
exports.readFact = async function(uid){
    const fact = await fibonacciModel.findById(uid);
    return fact;
}

//Referenced class examples 
exports.createFact = async function(fact){
    const mongoFact = new fibonacciModel(fact);
    await mongoFact.save();
    return mongoFact;
}

//Referenced mongoose documentation for findByIdAndUpdate
//https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
exports.updateFact = async function(updatedFact, uid){
    const factToUpdate = await fibonacciModel.findByIdAndUpdate(uid, updatedFact, {new: true});
    return factToUpdate;
}

//Referenced in class examples
exports.delFact = async function(uid){
    const deletedFact = await fibonacciModel.findByIdAndDelete(uid);
    return deletedFact;
}
