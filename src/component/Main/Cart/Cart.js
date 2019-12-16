import React, {Component} from 'react';
import './Cart.css';
import PokemonList from '../PokemonList/PokemonList';
import axios from 'axios';
class Cart extends Component{
    constructor(){
        super();
        this.state = {
            cart: []
        }
        this.moveBackToStore = this.moveBackToStore.bind(this);
        this.checkout = this.checkout.bind(this);
    }

    moveBackToStore(id){
        axios.put('/api/cart/'+id+'/'+this.props.trainer).then(res=>{
            this.setState({cart: res.data});
        }).catch(err=>console.log(err));
    }

    checkout(){
        axios.delete('/api/cart/'+this.props.trainer).then(res=>{
            this.setState({cart: res.data});
            this.props.setMainDisplay(2);
        }).catch(err=>{console.log(err)});

    }

    componentDidMount(){
        axios.get('/api/cart/' + this.props.trainer)
        .then(res=>{this.setState({cart: res.data})})
        .catch((err)=>console.log(err));
    }

    render(){
        let displayList = (this.state.cart[0])?(
            <PokemonList btnType='remove' pokemonList={this.state.cart} btnFcn={this.moveBackToStore}/>
        ):(<div className='main-message'>Your cart is empty! Go buy some Pokemon!</div>);
        return (
            <div>
                <div className='main-top-controller'>
                    <button className='main-top-btn-1' onClick={()=>{this.checkout()}}>Checkout</button>
                    <button className='main-top-btn-1' onClick={()=>{this.props.setMainDisplay(0)}}>Back to Store</button>
                </div>
                {displayList}
            </div>
        )
    }
}
export default Cart;