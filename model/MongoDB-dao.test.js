const dao = require('./MongoDB-dao');
const dbcon = require('../DbConnection');

//Taken from in class examples
beforeAll(async function(){ // Executed ONCE per file - before any test
    await dbcon.connect("test");
    await dao.deleteAll("test");
});
afterAll(async function(){ // Executed ONCE per file - after all tests
    await dbcon.disconnect();
});

afterEach(async function(){ //Execute after EACH test
    await dao.deleteAll("test");
});


//Used in class example as reference
test('Create new fact', async function(){
    let newFact = {fact: "The fibonacci sequence is natually occuring, we did not create it, we discovered it!"};

    let createdFact = await dao.createFact(newFact);
    let foundFact = await dao.readFact(createdFact._id);

    expect(createdFact._id).toBeDefined();
    expect(foundFact).not.toBeNull();
    expect(createdFact.fact).toEqual(foundFact.fact);
});

test('Read all facts with empty database', async function(){
    let lstFacts  = await dao.readAllFacts();
    
    expect(lstFacts.length).toBe(0);
});

test('Read all facts', async function(){
    let fact1 = {fact: "The nautilus shell is an example of the spiral"};
    let fact2 = {fact: "A pinecone will always have a fibonacci number of scales"};
    let fact3 = {fact: "The golden ratio, often associated with the fibonacci sequence is the greek letter phi"};

    await dao.createFact(fact1);
    await dao.createFact(fact2);
    await dao.createFact(fact3);

    let lstFacts = await dao.readAllFacts();

    expect(lstFacts.length).toBe(3);
    expect(lstFacts[0].fact).toEqual(fact1.fact);
});

test('Delete fact', async function(){
    let fact = {fact: "This is an incorrect fact about the fibonacci sequence!"};

    let createdFact = await dao.createFact(fact);
    let foundFactBeforeDel = await dao.readFact(createdFact._id);
    let deletedFact = await dao.delFact(createdFact._id);
    let foundFactAfterDel = await dao.readFact(createdFact._id);

    expect(foundFactBeforeDel).not.toBeNull();
    expect(foundFactAfterDel).toBeNull();
    expect(deletedFact.fact).toEqual(createdFact.fact);
});

test('Update fact', async function(){
    let fact = {fact: "Many paintings use the golden ratio to seem more appealing"};
    let updatedFact = {fact: "The only number to repeat in the entire sequence is 1!"}

    let oldFact = await dao.createFact(fact);
    let newFact = await dao.updateFact(updatedFact, oldFact._id);

    expect(oldFact.fact).toEqual(fact.fact);
    expect(newFact.fact).toEqual(updatedFact.fact);
});

