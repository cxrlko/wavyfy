


import { Buffer } from "buffer";
import { METHODS } from "http";
import { Album } from "../models/album";
import { Artist } from "../models/artist";
import { Track } from "../models/track";

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

    // ^ Home 
    // #region Fetch New Releases 
    async fetchNewReleases() : Promise<Album[]>
    {
        let releases: Album[] = undefined; 
        const authToken = await this.fetchAuthToken(); 

        const fetchOptions = 
        {
            headers: 
            {
                Authorization: `Bearer ${ authToken }`, 
            }
        }

        await fetch(`https://api.spotify.com/v1/browse/new-releases`, fetchOptions as any)
        .then((responce) => { return responce.json( )})
        .then((json) => 
        {
            // album = new Album(json);  
            releases = (json.albums.items as any[]).map((albumData) => { return new Album(albumData) });
        }) 

        if (releases == undefined) { console.error(`Couldn't fetch New releases`); return; }

        return releases; 
    }
    // #endregion


    // #region Fetch Query Items
    async fetchQueryItems(query: string)
    {
        const authToken = await this.fetchAuthToken(); 

        const fetchOptions = 
        {
            headers: 
            {
                Authorization: `Bearer ${ authToken }`, 
            }
        }

        await fetch(`https://api.spotify.com/v1/search?q=${ query }`, fetchOptions as any)
        .then((responce) => { return responce.json( )})
        .then((json) => 
        {
            console.log(json); 
        }) 
    }
    // #endregion


    // ^ Album
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

    // #region Fetch Album Tracks
    async fetchAlbumTracks(albumID: string) : Promise<Track[]>
    {
        let items: Track[] = []; 

        await this.fetchAuthToken()
        .then((token: string) => 
        {
            const fetchOptions = 
            {
                headers: 
                {
                    Authorization: `Bearer ${ token }`, 
                }
            }

            return fetch(`https://api.spotify.com/v1/albums/${ albumID }/tracks`, fetchOptions as any)
        })
        .then((responce) => { return responce.json() })
        .then((json) => 
        {
            items = (json.items as any[]).map((trackData) => new Track(trackData)); 
        })

        return items; 
    }
    // #endregion


    // ^ Artist 
    // #region Fetch Artist 
    async fetchArtist(artistID) : Promise<Artist>
    {
        let artist: Artist = undefined; 
        const authToken = await this.fetchAuthToken(); 

        const fetchOptions = 
        {
            headers: 
            {
                Authorization: `Bearer ${ authToken }`, 
            }
        }

        await fetch(`https://api.spotify.com/v1/artists/${ artistID }`, fetchOptions as any)
        .then((responce) => { return responce.json( )})
        .then((json) => 
        {
            artist = new Artist(json);  
        }) 

        if (artist == undefined) { console.error(`Couldn't fetch artist with id: ${ artistID }`); return; }

        return artist; 
    }
    // #endregion

    // #region Fetch Artist Top Track 
    async fetchArtistTopTracks(artistID: string) : Promise<Track[]>
    {
        let items: Track[] = []; 

        await this.fetchAuthToken()
        .then((token: string) => 
        {
            const fetchOptions = 
            {
                headers: 
                {
                    Authorization: `Bearer ${ token }`, 
                }
            }

            return fetch(`https://api.spotify.com/v1/artists/${ artistID }/top-tracks?market=US`, fetchOptions as any)
        })
        .then((responce) => { return responce.json() })
        .then((json) => 
        {
            items = (json.tracks as any[]).map((trackData) => new Track(trackData)); 
        })

        return items; 
    }
    // #endregion

    // #region Fetch Artist Top Albums 
    async fetchArtistAlbums(artistID: string) : Promise<Album[]>
    {
        let items: Album[] = []; 

        await this.fetchAuthToken()
        .then((token: string) => 
        {
            const fetchOptions = 
            {
                headers: 
                {
                    Authorization: `Bearer ${ token }`, 
                }
            }

            return fetch(`https://api.spotify.com/v1/artists/${ artistID }/albums`, fetchOptions as any)
        })
        .then((responce) => { return responce.json() })
        .then((json) => 
        {
            items = (json.items as any[]).map((albumData) => new Album(albumData)); 
        })

        return items; 
    }
    // #endregion



}

export { Network }






