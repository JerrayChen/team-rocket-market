import React, {Component} from 'react';
import './Member.css';
class Member extends Component{
    render(){
        return (
            <div className='member'>
                Greetings, <input className='memberText' onChange={(e)=>{this.props.setTrainer(e.target.value)}} value={this.props.trainer}/>
            </div>
        )
    }
}
export default Member;