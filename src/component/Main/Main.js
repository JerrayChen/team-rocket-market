import React, {Component} from 'react';
import './Main.css';
import Store from './Store/Store';
import Cart from './Cart/Cart';
import Thanks from './Thanks/Thanks';
import ForSaleList from './ForSaleList/ForSaleList';
import SellSetting from './SellSetting/SellSetting';
class Main extends Component{
    constructor(){
        super();
        // sell editing
        this.state = {
            pokemon: {},
        }
        this.setPokemon = this.setPokemon.bind(this);
    }

    setPokemon(p){
        this.setState({pokemon: p});
    }

    render(){
        // 0: Buy Pokemon - Store
        // 1: Buy Pokemon - Cart
        // 2: Buy Pokemon - Thanks for shopping
        // 10: Sell Pokemon - for sale list
        // 11: Sell Pokemon - add/edit Pokemon

        let display;

        if(this.props.main_display === 0){
            display = <Store 
                setMainDisplay={this.props.setMainDisplay} 
                trainer={this.props.trainer}
                />;
        }else if(this.props.main_display === 1){
            display = <Cart 
                setMainDisplay={this.props.setMainDisplay} 
                trainer={this.props.trainer}
                />;
        }else if(this.props.main_display === 2){
            display = <Thanks />;
        }else if(this.props.main_display === 10){
            display = <ForSaleList 
                setMainDisplay={this.props.setMainDisplay} 
                trainer={this.props.trainer}
                setPokemon={this.setPokemon}
                />;
        }else if(this.props.main_display === 11){
            // add Pokemon to sell
            display = <SellSetting 
                setMainDisplay={this.props.setMainDisplay} 
                trainer={this.props.trainer}
                pokemon={{}}
                editing={false}
                />;
        }else if(this.props.main_display === 12){
            // edit price
            display = <SellSetting 
                setMainDisplay={this.props.setMainDisplay} 
                trainer={this.props.trainer}
                pokemon={this.state.pokemon}
                editing={true}
                />;
        }else{
            display = <div>Something went wrong, please contact tech department.</div>;
        }

        return (
            <div className='main'>
                {display}
            </div>
        )
    }
}
export default Main;