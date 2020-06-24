import React, {useEffect, useState, Fragment} from 'react';
import './App.css';

const App  = () => {
const [state, setState] = useState({data: []});

useEffect(()=>{
    fetchData();
}, [state]);

const fetchData =  async () => {
    try {
        const response = await fetch('https://127.0.0.1:2999/liveclientdata/allgamedata');
        if (!response.ok) {throw Error(response.statusText);}
        const json = await response.json();
        setState({ data: json, timer: JSON.stringify(json.gameData.gameTime), 
          allPlayers: JSON.stringify(json.allPlayers)});
        console.log(json);
    }
    catch (error) {console.log(error);}
}

console.log(state.allPlayers);

return (
  <Fragment>
    <ul>
      <li> {state.timer} </li>
      {state.allPlayers}
    </ul>
  </Fragment>
);
}

export default App;