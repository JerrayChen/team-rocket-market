import React, {Component} from 'react';
import axios from 'axios';
import './Store.css';
import PokemonList from '../PokemonList/PokemonList';
import SearchBar from './SearchBar/SearchBar';
class Store extends Component{
    constructor(){
        super();
        this.state = {
            store: [],
            searchInput: '',
            finalInput: ''
        }
        this.addToCart = this.addToCart.bind(this);
        this.searchPokemon = this.searchPokemon.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }

    addToCart(id){
        axios.put('/api/store/'+id+'/'+this.props.trainer).then(res=>{
            this.setState({store: res.data});
        }).catch(err=>console.log(err));
    }

    searchPokemon(e){
        // console.log(e.key);
        // console.log(e.target.value);
        
        if(e.key==="Enter"){     
            // console.log("ser/final",this.state.searchInput, this.state.finalInput);
            
            this.setState({finalInput: this.state.searchInput});
            // console.log("ser/final",this.state.searchInput, this.state.finalInput);
            axios.get('/api/store/?name='+this.state.searchInput).then(res=>{
                this.setState({store: res.data});
                // console.log("res", res.data);
                // console.log("InAxios", this.state.store);
            }).catch(err=>console.log(err));
            // console.log("outOfAxios", this.state.store);
            
            this.setState({
                searchInput: '',

            });
        }
    }

    changeInput(e){
        // console.log(e.target.value.toLowerCase());
        
        this.setState({searchInput: e.target.value.toLowerCase()});
    }

    componentDidMount(){
        axios.get('/api/store').then(res=>{
            this.setState({store: res.data});
        }).catch(err=>console.log(err));
    }

    render(){
        // let displayList = (this.state.store[0])?
        // (<PokemonList pokemonList={this.state.store} btnType='buy' btnFcn={this.addToCart}/>):
        // (<div className='main-message' >We don't have any Pokemon for sale... for now.</div>)

        let displayList;
        // console.log("ser/final",this.state.searchInput, this.state.finalInput);
        if(this.state.store[0]){
            displayList=<PokemonList pokemonList={this.state.store} btnType='buy' btnFcn={this.addToCart}/>
        }
        else if(this.state.finalInput !== ''){
            displayList = <div className='main-message' >We don't have the Pokemon you want. Try search something else.</div>
        }else{
            displayList = <div className='main-message' >We don't have any Pokemon for sale... for now.</div>
        }
        return (
            <div className='store'>
                <div className='main-top-controller'>
                    <SearchBar searchInput={this.state.searchInput} changeInput={this.changeInput} searchPokemon={this.searchPokemon}/>
                    <button className='main-top-btn-1' onClick={()=>{this.props.setMainDisplay(1)}}>Your cart</button>
                </div>
                {displayList}
            </div>
        )
    }
}
export default Store;