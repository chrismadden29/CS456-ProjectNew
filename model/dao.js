const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./fibonacci.json', 'utf8'));
let facts = data.fibonacciFacts;

exports.readAll = function(){
    return facts;
}

exports.read = function(id){
    let fact = null;
    for(let i = 0; i < facts.length; i++){
        if(facts[i].id === id){
            fact = facts[i];
            break;
        }
    }
    return fact;
}

exports.create = function(fact){
    let genId = facts[facts.length - 1].id + 1;
    fact.id = genId;
    facts.push(fact);
    fs.writeFileSync('./fibonacci.json', JSON.stringify({fibonacciFacts: facts}, null, 2));
    return fact;
}

exports.update = function(id, updatedFact){
    let pos = -1;
    for(let i = 0; i< facts.length; i++){
        if(facts[i].id === id){
            pos = i;
            break;
        }
    }

    if(pos >= 0 && pos < facts.length){
        facts[pos] = updatedFact;
        fs.writeFileSync('./fibonacci.json', JSON.stringify({fibonacciFacts: facts}, null, 2));
        return updatedFact;
    }
}

exports.delete = function(id){
    let pos = -1;
    for(let i = 0; i < facts.length; i++){
        if(facts[i].id === id){
            pos = i;
            break;
        }
    }
    if (pos >= 0 && pos < facts.length) {
        let fact = facts[pos];
        facts.splice(pos, 1);
        fs.writeFileSync('./fibonacci.json', JSON.stringify({fibonacciFacts: facts}, null, 2));
        return fact;
    }
}
