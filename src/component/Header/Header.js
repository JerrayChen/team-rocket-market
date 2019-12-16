import React, {Component} from 'react';
import './Header.css';
import Member from './Member/Member';
import Logo from './Logo/Logo';
import TradingButtons from './TradingButtons/TradingButtons';
class Header extends Component{
    render(){
        return (
            <div className='header'>
                <Member trainer={this.props.trainer} setTrainer={this.props.setTrainer}/>
                <Logo />
                <TradingButtons setMainDisplay={this.props.setMainDisplay}/>
            </div>
        )
    }
}
export default Header;