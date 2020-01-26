import axios from "axios"

let Api = axios.create({
    headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'v72svl0nh7v182q5dzzngh9xrjoy42'
    }
});

export default Api;