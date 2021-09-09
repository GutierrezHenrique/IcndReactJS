import axios from 'axios';

const apiMain = axios.create({
    baseURL: "https://api.icndb.com/"
})

export default apiMain;