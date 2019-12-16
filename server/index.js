const express = require('express');
const app = express();
const port = 1337;
const {getStore, 
       getCart, 
       addToCart, 
       moveBackToStore,
       checkout, 
       addToStore,
       changePrice} = require('./controller/controller');


app.listen(port,()=>{
    console.log('listening port'+port);
    // console.log(store);
});

app.use(express.json());
app.use(express.static(__dirname + '../public'));


app.get('/api/store', getStore);
app.get('/api/cart/:buyer', getCart);
app.put('/api/store/:id/:buyer', addToCart);
app.put('/api/cart/:id/:buyer', moveBackToStore);
app.delete('/api/cart/:buyer', checkout);
app.post('/api/store', addToStore);
app.put('/api/price/:id/:price', changePrice);