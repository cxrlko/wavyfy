


import { Buffer } from "buffer";
import { METHODS } from "http";
import { json } from "stream/consumers";
import { Album } from "../models/album";
import { Artist, MVArtist } from "../models/artist";
import { Query } from "../models/query";
import { Track } from "../models/track";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth"

const clientID = `7c79ca1d91b24f3fa7057f1bfc10bcec`; 
const secretID = `ddc089f46cde4fc6ab46219fd0481373`;


const FirebaseConfiguration = 
{
    apiKey: "AIzaSyAASUE2iVhpOmBVN9-1Ljalz3m_I27uL6c",
    authDomain: "wavyfy.firebaseapp.com",
    projectId: "wavyfy",
    storageBucket: "wavyfy.appspot.com",
    messagingSenderId: "492135810754",
    appId: "1:492135810754:web:a9f13df2b00e14626e1d5b",
    measurementId: "G-HE3DMNYP24"
}

const Firebase = initializeApp(FirebaseConfiguration); 
export const Authentication = getAuth(Firebase); 



class Network 
{

    constructor()
    {

    }

    static async authenticateUser()
    {
        await signInAnonymously(Authentication); 
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

    // #region Get Fetch Options 
    async getFetchOptions()
    {
        const authToken = await this.fetchAuthToken(); 

        const fetchOptions = 
        {
            headers: 
            {
                Authorization: `Bearer ${ authToken }`, 
            }
        }

        return fetchOptions; 
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

    // #region Fetch Artists 
    async fetchTopArtists()
    {
        let artists : Artist[] = []; 
        const authToken = await this.fetchAuthToken(); 

        const fetchOptions = 
        {
            headers: 
            {
                Authorization: `Bearer ${ authToken }`, 
            }
        }

        await fetch(`https://api.spotify.com/v1/artists?ids=6eUKZXaKkcviH0Ku9w2n3V,1uNFoZAHBGtllmzznpCI3s,1Xyo4u8uXC1ZmMpatF05PJ,6KImCVD70vtIoJWnq6nGn3,6M2wZ9GZgrQXHCFfjv46we,4q3ewBCX7sLwd24euuV69X,3TVXtAsR1Inumwj472S9r4,06HL4z0CvFAxyc27GXpf02,4gzpq5DPGxSnKTe4SA8HAU,53XhwfbYqKCa1cC15pYq2q`, fetchOptions as any)
        .then((responce) => { return responce.json( )})
        .then((json) => 
        {
            artists = (json.artists as any[]).map((artistData) => new Artist(artistData)); 
        });

        return artists; 
    }
    // #endregion

    // #region Fetch Top Tracks 
    async fetchTopTracks()
    {
        let tracks: Track[] = []; 
        const options = await this.getFetchOptions(); 

        // 

        await fetch(`https://api.spotify.com/v1/tracks?ids=7qiZfU4dY1lWllzX7mPBI3,0VjIjW4GlUZAMYd2vXMi3b,2N8m6CYs74qQO4mjVcXO30,0e7ipj03S05BNilyu5bRzt,7qEHsqek33rTcFNT9PFqLf,1zi7xx7UVEFkmKfv06H8x0,3KkXRkHbMCARz0aVfEt68P,7BKLCZ1jbUBVqRi2FVlTVw,0TK2YIli7K1leLovkQiNik,0pqnGHJpmpxLKifKRmU6WP`, options as any)
        .then((responce) => { return responce.json() })
        .then((json) => 
        {
            tracks = (json.tracks as any[]).map((trackData, trackIndex) => new Track(trackData)); 
        })

        return tracks; 
    }
    // #endregion

    // #region Fetch Top Albums 
    async fetchTopAlbums() : Promise<Album[]>
    {
        let albums : Album[] = []; 

        const options = await this.getFetchOptions(); 

        await fetch(`https://api.spotify.com/v1/albums?ids=21jF5jlMtzo94wbxmJ18aa,25L8ck3KGcmCo3901ztPzR,02uWB8Kekadkl3yGBoOOcx,0vRN2oePynCSTspdY9NDsM,0Gmf4pfe0POEQq2FgGAj2q,3sKZHtQoq3tPtkXbT8PJAc,2ITVvrNiINKRiW7wA3w6w6,45ba6QAtNrdv6Ke4MFOKk9,6o38CdD7CUlZDCFhjZYLDH,6tE9Dnp2zInFij4jKssysL,3RQQmkQEvNCY4prGKE6oc5,1atjqOZTCdrjxjMyCPZc2g,5r36AJ6VOJtp00oxSkBZ5h`, options)
        .then((responce) => { return responce.json() })
        .then((json) => 
        {
            albums = (json.albums as any[]).map((albumData) => new Album(albumData));
        })


        return albums; 
    }
    // #endregion

    //  ^ Search
    // #region Fetch Query Items
    async fetchQueryItems(query: string) : Promise<Query>
    {
        let item: Query = undefined; 
        const authToken = await this.fetchAuthToken(); 

        const fetchOptions = 
        {
            headers: 
            {
                Authorization: `Bearer ${ authToken }`, 
            }
        }

        await fetch(`https://api.spotify.com/v1/search?q=${ query }&market=US&type=album,track,artist`, fetchOptions as any)
        .then((responce) => { return responce.json( )})
        .then((json) => 
        {
            item = new Query(json); 
        }) 

        if (item == undefined) { console.log(`Couldn't get query for item: ${ query }`); return; }; 

        return item; 
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


    // ^ MVArtist 
    // #region Fetch MVArtist 
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

    // #region Fetch MVArtist Top Track 
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

    // #region Fetch MVArtist Top Albums 
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






