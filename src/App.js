import React from 'react';
import './reset.css';
import './App.css';
import TeamRocketMarket from './component/TeamRocketMarket';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <TeamRocketMarket />
      </div>
    );
  }
}

export default App;
