import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import axios from 'axios';

function Games() {

    {/* making api variable to create header with client ID */}
    let api = axios.create({
        headers: {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Client-ID': 'v72svl0nh7v182q5dzzngh9xrjoy42'
        }
    });

    const [games, setGames] = useState([]);


    {/* 
        1) useEffect to fetchData on subpage load
        2) set fetchData to async function
        3) new result variable to store api.get
        4) calling fetchData
    */}
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/games/top');  
            let resultArray = result.data.data;  
            console.log(resultArray);
            setGames(result.data.data);
        };
        fetchData();
    }, []);
  

    {/* 
        Rendering every game card
     */}
    return(<div className='games'>
       {games.map((game, index) => {
            {var art = game.box_art_url.replace('{width}', 270).replace('{height}', 400); 
            var gameNameLink = '/games/' + game.name.replace(/ /g, '_')}
            return (
                            
                <Link to={{
                        pathname: gameNameLink,
                        state: { gameID: game.id}
                    }} className='games__game' key={index}>                   
                    <img src={art} className="games__game__img"/>                   
                    <h1 className="games__game__header">{game.name}</h1>
                </Link>

                
           )
       })}
    </div>)
}

export default Games;