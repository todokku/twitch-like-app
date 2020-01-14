import React, {useState, useEffect} from 'react';
import api from './api';
import {Link} from 'react-router-dom';

function Streams() {

    const [topStreams, setTopStreams] = useState([]);

    useEffect (() => {
        const fetchData = async () => {
            
            const streamData = await api.get('https://api.twitch.tv/helix/streams?first=30');
            console.log(streamData.data.data);
            setTopStreams(streamData.data.data);
        }
        fetchData();
    }, []);

    return(
        <section className="streams">   
            
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
                                    <span className="streams__stream__heading--user">{stream.user_name}</span>
                                </div>
                        </Link>
                    </div>)
           })}
           
        </section>
    )
};

export default Streams;