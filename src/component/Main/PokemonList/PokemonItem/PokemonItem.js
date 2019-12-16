import React, {Component} from 'react';
import './PokemonItem.css';
import PokemonInfo from './PokemonInfo/PokemonInfo';

class PokemonItem extends Component{

    //props: pokemonList ,btnType, and functions.
    render(){

        let btn;

        if (this.props.btnType === 'buy'){
            btn = <button className='pokemon-btn' onClick={()=>{this.props.btnFcn(this.props.pokemon.id)}}>Buy</button>;
        }else if (this.props.btnType === 'edit'){
            btn = <button className='pokemon-btn' onClick={()=>{this.props.btnFcn(this.props.pokemon)}}>Edit</button>;
        }else if (this.props.btnType === 'remove'){
            btn = <button className='pokemon-btn' onClick={()=>{this.props.btnFcn(this.props.pokemon.id)}}>Remove</button>;
        }

        return (
            <div className='PokemonItem'>
                <PokemonInfo pokemon={this.props.pokemon} />
                {btn}
            </div>
        )
    }
}

export default PokemonItem;