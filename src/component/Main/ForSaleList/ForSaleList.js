import React, {Component} from 'react';
import './ForSaleList.css';
import axios from 'axios';
import PokemonList from '../PokemonList/PokemonList'
class ForSaleList extends Component{
    constructor(){
        super();
        this.state ={
            store:[]
        }
        this.editPrice = this.editPrice.bind(this);
    }
    componentDidMount(){
        axios.get('/api/store?trainer='+this.props.trainer).then(res=>{
            this.setState({store: res.data});
        }).catch(err=>console.log(err));
    }

    editPrice(pokemon){
        // putting data to SellSetting
        this.props.setPokemon(pokemon);
        // change view to 12
        this.props.setMainDisplay(12);
    }

    render(){
        let displayList = (this.state.store[0])?
        (<PokemonList pokemonList={this.state.store} btnType='edit' btnFcn={this.editPrice}/>):
        (<div className='main-message'>You don't have any Pokemon for sale.</div>)
        return (
            <div>
                <div className='main-top-controller-left'>
                    <button className='main-top-btn-2' onClick={()=>{this.props.setMainDisplay(11)}}>Add a new Pokemon for sale</button>
                </div>
                {displayList}
            </div>
        )
    }
}
export default ForSaleList;