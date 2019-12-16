
const Pokemon = require('../../object/Pokemon');
const store = require('../testData/store').pokemonList.map((v)=> {
    let {id, name, sex, level, price, sprite, trainer} = v;
    // console.log('v',v,';id',id);
    let pokemon = new Pokemon(id, name, sex, level, price, sprite, trainer);
    // console.log(pokemon);
    return pokemon;
});

const cart = require('../testData/cart');

// console.log(store);
let id = 100;


function getStore(req,res){
    // console.log(req.query);
    if (req.query.trainer){
        let sellList = store.filter((p)=>p.trainer===req.query.trainer);
        res.status(200).json(sellList);
    }else if (req.query.name){
        let searchList = store.filter((p)=>p.name===req.query.name);
        // console.log(searchList);
        res.status(200).json(searchList);
        // if(searchList[0]){
        //     res.status(200).json(searchList);
        // }else{
        //     res.sendStatus(418);
        // }

    }else{
        res.status(200).json(store);
    }
}

function getCart(req, res){
    let buyer = req.params.buyer;
    res.status(200).json(cart[buyer]);
}

function addToCart(req, res){
    let {id, buyer} = req.params;
    console.log(id, buyer);
    
    let ind = store.findIndex(p=> p.id==id);
    if (ind == -1){
        res.status(404);
    }
    console.log(ind, store);
    let pokemon = store.splice(ind, 1);    
    console.log("pokemon:",pokemon,"store:", store,"cart", cart);
    cart[buyer] ? (cart[buyer].push(pokemon[0])) : (cart[buyer] = pokemon)
    console.log("after:", cart);
    
    res.status(200).json(store);
}

function moveBackToStore(req, res){
    let {id, buyer} = req.params;
    let ind = cart[buyer].findIndex(p=> p.id==id);
    if (ind == -1){
        res.status(404);
    }
    let pokemon = cart[buyer].splice(ind, 1);
    store.push(pokemon[0]);
    res.status(200).json(cart[buyer]);
}

function checkout(req, res){
    let buyer = req.params.buyer;
    cart[buyer] = [];
    res.status(200).json(cart[buyer]);
}

function addToStore(req, res){
    let {name, sex, level, price, sprite, trainer} = req.body;
    let pokemon = new Pokemon(id, name, sex, level, price, sprite, trainer);
    id++;
    store.push(pokemon);
    res.status(200).json(store.filter(p=>p.trainer===trainer));
}

function changePrice(req, res){
    let { id, price } = req.params;
    let ind = store.findIndex(p=> p.id==id);
    if (ind == -1){
        res.status(404);
    }
    store[ind].price = parseFloat(price); 
    res.status(200).json(store);
}

module.exports = {
    getStore,
    getCart,
    addToCart,
    moveBackToStore,
    checkout,
    addToStore,
    changePrice
}