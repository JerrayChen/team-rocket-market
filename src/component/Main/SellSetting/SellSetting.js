import React, { Component } from 'react';
import './SellSetting.css';
import axios from 'axios';

class SellSetting extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            sex: '',
            level: '',
            price: '',
            sprite: '',

            nameErr: '',
            sexErr: '',
            levelErr: '',
            priceErr: ''

        }

        this.sellPokemon = this.sellPokemon.bind(this);
        this.changePrice = this.changePrice.bind(this);
    }

    componentDidMount() {
        if (this.props.pokemon.name) {
            this.setState({
                id: this.props.pokemon.id,
                name: this.props.pokemon.name,
                sex: this.props.pokemon.sex,
                level: this.props.pokemon.level,
                price: this.props.pokemon.price,
                sprite: this.props.pokemon.sprite
            })
        }
    }

    setSprite(name) {
        if (name) {
            axios.get('https://pokeapi.co/api/v2/pokemon/' + name).then(res => {
                this.setState({
                    sprite: res.data.sprites.front_default
                })
            }).catch(err => {
                console.log(err);
                this.setState({
                    sprite: ''
                });
            })
        } else {
            this.setState({
                sprite: ''
            })
        }
    }

    validateSell(editing) {
        let result = true;
        // add
        if (!editing){
            if (this.state.sprite === '') {
                result = false;
                this.setState({ nameErr: 'Invalid pokemon name!' });
            } else {
                this.setState({ nameErr: '' });
            }
            if (this.state.sex !== 'M' && this.state.sex !== 'F' && this.state.sex !== 'None') {
                result = false;
                this.setState({ sexErr: 'Invalid pokemon sex! Should be M, F, or None' });
            } else {
                this.setState({ sexErr: '' });
            }
            if(isNaN(parseInt(this.state.level)) || parseInt(this.state.level) < 1 || parseInt(this.state.level) > 100  ){
                result = false;
                this.setState({ levelErr: 'Invalid pokemon level! Should be between 1 to 100' });
            } else {
                this.setState({ levelErr: '' });
            }
        }
        // add and edit
        if(isNaN(parseFloat(this.state.price)) || parseFloat(this.state.price) <=0){
            result = false;
            this.setState({ priceErr: 'Invalid price!' });
        } else {
            this.setState({ priceErr: '' });
        }

        return result;
    }

    sellPokemon() {
        if (!this.validateSell(false)) {
            return;
        }
        let pokemon = {
            name: this.state.name,
            sex: this.state.sex,
            level: parseInt(this.state.level),
            price: parseFloat(this.state.price),
            sprite: this.state.sprite,
            trainer: this.props.trainer
        }
        axios.post('/api/store', pokemon).then(res => {
            this.props.setMainDisplay(10);
        }).catch(err => console.log(err));

    }

    changePrice() {
        if (!this.validateSell(true)) {
            return;
        }
        axios.put('/api/price/' + this.state.id + '/' + this.state.price).then(res => {
            this.props.setMainDisplay(10);
        }).catch(err => console.log(err));
    }

    render() {

        let pleaseEnter = this.props.editing ?
            (<span>Please enter the new price: </span>) :
            (<span>Please enter the info about the Pokemon: </span>);

        let nameInput = this.props.editing ?
            (<span>{this.state.name}</span>) :
            (<input onChange={(e) => { 
                this.setState({ 
                    name: e.target.value.toLowerCase(), 
                    nameErr: ''
                })}} onBlur={(e) => { this.setSprite(e.target.value) }} value={this.state.name} />);

        let sexInput = this.props.editing ?
            (<span>{this.state.sex}</span>) :
            (<input onChange={(e) => { this.setState({ sex: e.target.value, sexErr:'' }) }} />);

        let levelInput = this.props.editing ?
            (<span>{this.state.level}</span>) :
            (<input onChange={(e) => { this.setState({ level: e.target.value, levelErr:'' }) }} />);

        let submitBtn = this.props.editing ?
            (<button className='main-top-btn-1' onClick={this.changePrice}>Change the price</button>) :
            (<button className='main-top-btn-1' onClick={this.sellPokemon}>Sell the Pokemon</button>);

        return (
            <div>
                <div className='main-top-controller-left'>
                    <button className='main-top-btn-2' onClick={() => { this.props.setMainDisplay(10); }}>See your selling list</button>
                </div>
                <div className='setting-title'>
                    {pleaseEnter}
                </div>
                <div className='setting-details'>
                    <div className='setting-input'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Species: &nbsp;&nbsp;&nbsp;&nbsp; </td>
                                    <td></td>
                                    <td>{nameInput}</td>
                                    <td className='setting-errMsg'>{this.state.nameErr}</td>
                                </tr>
                                <tr>
                                    <td>Sex: </td>
                                    <td></td>
                                    <td>{sexInput}</td>
                                    <td className='setting-errMsg'>{this.state.sexErr}</td>
                                </tr>
                                <tr>
                                    <td>Level: </td>
                                    <td></td>
                                    <td>{levelInput} </td>
                                    <td className='setting-errMsg'>{this.state.levelErr}</td>
                                </tr>
                                <tr>
                                    <td>Price:</td>
                                    <td>$</td>
                                    <td><input onChange={(e) => { this.setState({ price: e.target.value, priceErr: '' }) }} value={this.state.price} /> </td>
                                    <td className='setting-errMsg'>{this.state.priceErr}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <img className='setting-sprite' src={this.state.sprite} alt='Please check pokemon species.' />
                    </div>
                </div>
                {submitBtn}
            </div>
        )
    }
}
export default SellSetting;