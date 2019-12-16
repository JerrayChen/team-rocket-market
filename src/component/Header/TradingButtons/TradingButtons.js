import React, {Component} from 'react';
import './TradingButtons.css';
class TradingButtons extends Component{

    render(){
        return (
            <div className='header-btn-set'>
                <button className='header-btn' onClick={()=>{this.props.setMainDisplay(0);}}>Buy Pokemon</button>
                <button className='header-btn' onClick={()=>{this.props.setMainDisplay(10);}}>Sell Pokemon</button>
            </div>
        )
    }
}
export default TradingButtons;