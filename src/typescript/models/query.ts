






import { json } from "stream/consumers";
import { Album } from "./album";
import { Artist, MVArtist } from "./artist";
import { Track } from "./track"



class Query 
{

    songs: Track[];
    albums: Album[]; 
    artists: Artist[]; 


    constructor(data: any)
    {
        this.songs = (data.tracks.items as any[]).map((trackData) => new Track(trackData)); 
        this.albums = (data.albums.items as any[]).map((albumData) => new Album(albumData)); 
        this.artists = (data.artists.items as any[]).map((artistData) => new Artist(artistData)); 
    }

}


export { Query }










