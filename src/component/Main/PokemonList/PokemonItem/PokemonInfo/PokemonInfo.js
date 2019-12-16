import React, { Component } from 'react';
import './PokemonInfo.css';
class PokemonInfo extends Component {
    render() {
        let sex;
        if (this.props.pokemon.sex === 'M') {
            sex = '♂️';
        } else if (this.props.pokemon.sex === 'F') {
            sex = '♀️';
        } else {
            sex = '-'
        }
        return (
            <div className='pokemon-info'>
                <img className='poke-img' src={this.props.pokemon.sprite} alt={this.props.pokemon.name}/>
                <div className='pokemon-name'>{this.props.pokemon.name}</div>
                <div className='pokemon-details'>
                    <div>Sex: {sex}</div>
                    <div>Lv. {this.props.pokemon.level}</div>
                    <div>Price: ${this.props.pokemon.price}</div>
                    <div>Seller: {this.props.pokemon.trainer}</div>
                </div>
            </div>
        )
    }
}
export default PokemonInfo;