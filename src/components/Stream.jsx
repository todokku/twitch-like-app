import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Stream({match, location}) {

    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://embed.twitch.tv/embed/v1.js";
        script.async = true;

        document.body.appendChild(script);

        // console.log(script);
        const script2 = document.createElement('script');

        script2.type = "text/javascript";
        script2.async = true;
        script2.innerHTML = `new Twitch.Embed("twitch-embed", {
            width: '100%',
            height: '100%',
            channel: '${match.params.id}'
          });`

        document.body.appendChild(script2);
        // console.log(script2)

    });

    console.log(match.params.id);

    return(
        <div className="stream">   
            <div className="stream__window" id="twitch-embed"></div>
           
        </div>
    )
};

export default Stream;