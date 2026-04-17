const express = require('express');
const app = express();
const controller = require('./controller/controller');

app.use(express.json());
app.use(express.static('public_html'));

app.get('/api/fibonacci-facts', controller.getAllFacts);
app.get('/api/fibonacci-facts/:id', controller.get);
app.post('/api/fibonacci-facts', controller.create);
app.put('/api/fibonacci-facts/:id', controller.update);
app.delete('/api/fibonacci-facts/:id', controller.delete);

app.listen(4000, function(){
    console.log('Server running on localhost:4000');
});
