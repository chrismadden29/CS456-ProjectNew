const express = require('express');
const app = express();
const controller = require('./controller/controller');
const dbcon = require('./DbConnection');

app.use(express.json());
app.use(express.static('public_html'));

app.get('/api/fibonacci-facts', controller.getAllFacts);
app.get('/api/fibonacci-facts/:id', controller.getFact);
app.post('/api/fibonacci-facts', controller.createFact);
app.put('/api/fibonacci-facts/:id', controller.updateFact);
app.delete('/api/fibonacci-facts/:id', controller.delFact);

async function startServer(){
    await dbcon.connect();
    app.listen(4000, function(){
    console.log('Server running on localhost:4000');
    });
}

startServer();

