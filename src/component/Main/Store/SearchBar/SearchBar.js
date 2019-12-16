import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component{

    render(){
        return (
            <div className='search-bar'>
                <input onKeyPress={(e)=>{this.props.searchPokemon(e)}} 
                onChange={(e)=>{this.props.changeInput(e)}}
                value = {this.props.searchInput}
                className='search-bar-text' placeholder='What Pokemon are you looking for?'/>
            </div>
        )
    }
}
export default SearchBar;