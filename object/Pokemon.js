const axios = require('axios');

class Pokemon{
    constructor(id, name, sex, level, price, sprite, trainer){
        // console.log('id',id);
        this.id = id;
        this.name = name;
        this.sex = sex;
        this.level = level;
        this.price = price;
        // console.log(sprite);
        if (sprite){
            this.sprite = sprite;
        }else{
            axios.get('https://pokeapi.co/api/v2/pokemon/'+name).then(res => {
                this.sprite = res.data.sprites.front_default;
            })
        }
        this.trainer = trainer;
        // console.log('id',id, 'this.id',this.id);
    }
}

module.exports = Pokemon;