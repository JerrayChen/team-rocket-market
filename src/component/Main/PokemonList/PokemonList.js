import React, {Component} from 'react';
import './PokemonList.css';
import PokemonItem from './PokemonItem/PokemonItem';
class PokemonList extends Component{
    //props: pokemonList ,btnType, and btnFcn.
    render(){

        let display = this.props.pokemonList.map(p=>{ return (
            <PokemonItem key={p.id} pokemon={p} btnType={this.props.btnType} btnFcn={this.props.btnFcn}/>
        )})

        return (
            <div className='pokemon-list'>
                {display}
            </div>
        )
    }
}
export default PokemonList;