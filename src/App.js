import React, {useEffect, useState, Fragment} from 'react';
import './App.css';

const URL = 'https://127.0.0.1:2999';
const ENDPOINT = "/liveclientdata/allgamedata"; 
const App  = () => {
const [state, setState] = useState({data: []});

useEffect(()=>{
    fetchData();
}, [state]);

const fetchData =  async () => {
    try {
      /*
        const response = await fetch('https://127.0.0.1:2999/liveclientdata/allgamedata');
        if (!response.ok) {throw Error(response.statusText);}
        const json = await response.json();
        setState({ data: json, timer: JSON.stringify(json.gameData.gameTime), 
          allPlayers: JSON.stringify(json.allPlayers)});
        console.log(json);
        */
       const response = await fetch(URL + ENDPOINT);
        if (!response.ok) {throw Error(response.statusText);}
        const json = await response.json();
        setState({ data: json, timer: JSON.stringify(json.gameData.gameTime), 
          sumName: (json.allPlayers[0].summonerName),
          champName: json.allPlayers[0].championName,
          sumScores: Object.entries(json.allPlayers[0].scores)
        });
        //console.log(json);
    }
    catch (error) {console.log(error);}
}

//console.log(state.allPlayers);


if (!state.sumScores) {
  return (
    <p> loading... </p>
  ) 
}

let imgURL = "/champion/icon_" + state.champName + ".png";
console.log(state.sumScores);
let assists = state.sumScores[0][1];
let creepScore = state.sumScores[1][1];
let death = state.sumScores[2][1];
let kills = state.sumScores[3][1];
return (
  <Fragment>
 {state.timer}
    <ul>{state.sumName}
      <li>{state.champName}</li>
      <div> <img src={imgURL} /> </div>
      <li>
          Kills = {kills}
      </li>
      <li>
          Assists = {assists}
      </li>
      <li>
          Creepscore = {creepScore}
      </li>
      <li>
          Deaths = {death}
      </li>
      
    </ul>
  </Fragment>
);
}

export default App;