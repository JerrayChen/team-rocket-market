import React, { Component } from 'react';
import './TeamRocketMarket.css';
import Header from './Header/Header';
import Main from './Main/Main';
class TeamRocketMarket extends Component {
    constructor() {
        super();
        // 0: Buy Pokemon - Store
        // 1: Buy Pokemon - Cart
        // 2: Buy Pokemon - Thanks for shopping
        // 10: Sell Pokemon - for sale list
        // 11: Sell Pokemon - add/edit Pokemon
        this.state = {
            // header
            trainer: 'Giovanni',
            // main
            main_display: 0
        }

        this.setTrainer = this.setTrainer.bind(this);
        this.setMainDisplay = this.setMainDisplay.bind(this);

    }

    setTrainer(str){
        this.setState({trainer: str});
    }

    setMainDisplay(num){
        this.setState({main_display: num});
    }

    render() {
        return (
            <div>
                <header>
                    <Header 
                    trainer={this.state.trainer} 
                    setTrainer={this.setTrainer} 
                    setMainDisplay={this.setMainDisplay}/>
                </header>
                <main>
                    <Main 
                    trainer={this.state.trainer}
                    main_display={this.state.main_display} 
                    setMainDisplay={this.setMainDisplay}/>
                </main>
            </div>
        )
    }
}
export default TeamRocketMarket;