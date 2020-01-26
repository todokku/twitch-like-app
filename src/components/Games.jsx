import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from "./api";

function Games() {



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
            // console.log(resultArray);
            setGames(result.data.data);
        };
        fetchData();
    }, []);
  

    {/* 
        Rendering every game card
     */}
    return(<div className='games'>
       {games.map((game, index) => {
            {
                let width;
                let height;
                if (window.innerWidth <= 460 || window.outerWidth <= 460) {
                    width = 203;
                    height = 300;
                } else if (window.innerWidth <= 880 || window.outerWidth <= 880) {
                    width = 236;
                    height = 345;
                } else if (window.innerWidth >= 880 || window.outerWidth >= 880) {
                    width = 270;
                    height = 400;
                }
                var art = game.box_art_url.replace('{width}', width).replace('{height}', height); 
                var gameNameLink = '/games/' + game.name.replace(/ /g, '_');
            };
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