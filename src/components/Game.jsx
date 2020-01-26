import React, {useState, useEffect} from 'react';
import api from './api';
import {Link} from 'react-router-dom';

function Game({match, location}) {


    const [gameStreams, setGameStreams] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const gameData = await api.get(`https://api.twitch.tv/helix/streams?first=20&game_id=${location.state.gameID}`)
            
            setGameStreams(gameData.data.data)
        }
        fetchData()
    }, []); 

//    console.log(location.state);

    return(
        <section className='streams'>
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
                {var streamThumbnail = stream.thumbnail_url.replace('{width}', 490).replace('{height}', 252)}
                return(
                    <div className="streams__stream" key={index}>
                        <Link className="streams__link" to={{
                            pathname: '/streams/' + stream.user_name,
                            state: {streamName: stream.user_name}
                        }}>
                            <img className="streams__stream__img" src={streamThumbnail} alt="stream"/>
                            <div className="streams__stream__heading">
                                <span className="streams__stream__heading--title">{stream.title}</span>
                                <span className="streams__stream__heading--user">{stream.user_name}</span>
                            </div>
                        </Link>
                    </div>           
            )})}

        </section>
    )
}

export default Game;