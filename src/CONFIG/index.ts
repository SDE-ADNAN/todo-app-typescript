import { API_URL_LIVE, API_URL_LOCAL, isLive } from "../api";

export const getUrl =(remUrl:string) => `${isLive ? API_URL_LIVE : API_URL_LOCAL}${remUrl}`

const Todos = {
    getUrl:getUrl
}

export default Todos;