const dao = require('./model/dao');

test('readAll should return all facts', function(){
    let facts = dao.readAll();
    expect(facts.length).toBeGreaterThan(0);
});

test('read should return a fact by id', function(){
    let fact = dao.read(1);
    expect(fact).not.toBeNull();
    expect(fact.id).toBe(1);
});

test('create should add a new fact', function(){
    let newFact = {fact: "The 10th Fibonacci number is 55"};
    let sizeBefore = dao.readAll().length;
    let createdFact = dao.create(newFact);
    expect(createdFact).not.toBeNull();
    expect(createdFact.id).toBeGreaterThan(0);
    expect(createdFact.fact).toBe(newFact.fact);
    expect(dao.readAll().length).toBe(sizeBefore + 1);
});

test('update should modify an existing fact', function(){
    let fact = dao.read(1);
    fact.fact = "Updated fact";
    let updatedFact = dao.update(1, fact);
    expect(updatedFact).not.toBeNull();
    expect(updatedFact.fact).toBe("Updated fact");
    let readFact = dao.read(1);
    expect(readFact.fact).toBe("Updated fact");
});

test('delete should remove a fact', function(){
    let sizeBefore = dao.readAll().length;
    let deletedFact = dao.delete(1);
    expect(deletedFact).not.toBeNull();
    expect(deletedFact.id).toBe(1);
    expect(dao.readAll().length).toBe(sizeBefore - 1);
    let readFact = dao.read(1);
    expect(readFact).toBeNull();
});
