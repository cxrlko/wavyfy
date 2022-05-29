


import { Artist } from "./artist";
import { Track } from "./track";




class Album
{
    id: string; 

    title: string; 
    coverURL: string; 

    label: string; 
    releaseDate: Date; 

    popularity: number; 

    artists: Artist[] = [];
    tracks: Track[] = []; 

    constructor(data: any)
    {
        this.id = data.id; 

        this.title = data.name; 
        this.coverURL = (data.images as any[])[0].url;

        this.label = data.label; 
        this.releaseDate = new Date(data.release_date); 

        this.popularity = data.popularity; 

        this.artists = (data.artists as any[]).map((artistData) => new Artist(artistData)); 
        this.tracks = (data.tracks.items as any[]).map((trackData) => new Track(trackData))
    }

}



export { Album }






