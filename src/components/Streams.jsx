import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Streams() {

    let api = axios.create({
        headers: { 
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Client-ID': 'v72svl0nh7v182q5dzzngh9xrjoy42'
        }
    })

    const [topStreams, setTopStreams] = useState([]);

    useEffect (() => {
        const fetchData = async () => {
            
            const streamData = await api.get('https://api.twitch.tv/helix/streams?first=30');
            console.log(streamData.data.data);
            setTopStreams(streamData.data.data);
        }
        fetchData();
    }, [])

    return(
        <div className="streams">   
            
           {topStreams.map((stream, index) => {
                return(
                    <div className="streams__stream" key={index}>
                        <Link className="streams__link" to={{
                            pathname: "/streams/" + stream.user_name,
                            state: { userID: stream.user_id }
                            }}>
                                <img className="streams__stream__img" src={stream.thumbnail_url.replace('{width}', 700).replace('{height}', 360)} />
                                <div className="streams__stream__heading">
                                    <span className="streams__stream__heading--title">{stream.title}</span>
                                    <span className="streams__stream__heading--user">{stream.user_name} is playing</span>
                                </div>
                        </Link>
                    </div>)
           })}
           
        </div>
    )
};

export default Streams;