


import { Buffer } from "buffer";
import { METHODS } from "http";
import { Album } from "../models/album";

const clientID = `7c79ca1d91b24f3fa7057f1bfc10bcec`; 
const secretID = `ddc089f46cde4fc6ab46219fd0481373`;


class Network 
{

    constructor()
    {

    }


    // - Fetches an authenticated token from spotify API to allow for other calls
    // #region Fetch Authentication Token
    private async fetchAuthToken()
    {
        let token : string = undefined; 

        const header = new Headers(); 
        header.append(`Authorization`, `Basic ${ Buffer.from(clientID + ':' + secretID).toString('base64') }`);
        header.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");

        const authOptions =
        {
            method: 'POST',
            headers: header,
            body: urlencoded,
            redirect: 'follow'
        }

        await fetch(`https://accounts.spotify.com/api/token`, authOptions as any)
        .then((responce) => { return responce.json() })
        .then((json) =>
        {
            token = json.access_token; 
        })

        if (token == undefined) { console.error(`Couldn't fetch Authentication token from Spotify API`); return; }

        return token; 
    }
    // #endregion

    // #region Fetch Album
    async fetchAlbum(id: string)
    {
        let album: Album = undefined; 
        const authToken = await this.fetchAuthToken(); 

        const fetchOptions = 
        {
            headers: 
            {
                Authorization: `Bearer ${ authToken }`, 
            }
        }

        await fetch(`https://api.spotify.com/v1/albums/${ id }`, fetchOptions as any)
        .then((responce) => { return responce.json( )})
        .then((json) => 
        {
            album = new Album(json);  
        }) 

        if (album == undefined) { console.error(`Couldn't fetch album with id: ${ id }`); return; }

        return album; 
    }
    // #endregion


}



export { Network }






