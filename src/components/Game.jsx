import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Game({match, location}) {
    let apiGame = axios.create({
        headers: {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Client-ID': 'v72svl0nh7v182q5dzzngh9xrjoy42'
        }
    });

    const [gameStreams, setGameStreams] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const gameData = await apiGame.get(`https://api.twitch.tv/helix/streams?first=20&game_id=${location.state.gameID}`)
            console.log(gameData.data.data);
            
            setGameStreams(gameData.data.data)
        }
        fetchData()
    }, []); 

   console.log(location.state);

    return(
        <div className='streams'>
            {/* deconstructing props into match and location
                match is information contained as /games/:id, game name is stored as :id when it renders               
             */}
            {/*{match.params.id}*/}
            {/* 
                location is an information taken from Games comp. 
                to set location.state I used <Link to={{state: {key: value}}}
            */}
            {/*{location.state.gameID}*/}
            

            {gameStreams.map((stream, index) => {
                {var streamThumbnail = stream.thumbnail_url.replace('{width}', 700).replace('{height}', 360)}
                return(
                    <div className="streams__stream" key={index}>
                        <Link to={{
                            pathname: '/streams/' + stream.user_name,
                            state: {streamName: stream.user_name}
                        }}>
                            <img className="streams__stream__img" src={streamThumbnail} alt="stream"/>
                            <div className="streams__stream__heading">
                                <span className="streams__stream__heading--title">{stream.title}</span>
                                <span className="streams__stream__heading--user">{stream.user_name} is streaming {match.params.id}</span>
                            </div>
                        </Link>
                    </div>           
            )})}

        </div>
    )
}

export default Game;