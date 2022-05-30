


import { MVArtist } from "./artist";
import { Track } from "./track";




class Album
{
    id: string; 

    title: string; 
    coverURL: string; 

    label: string; 
    releaseDate: Date; 

    trackCount : number; 
    popularity: number; 

    artists: MVArtist[] = [];

    constructor(data: any)
    {   
        this.id = data.id; 

        this.title = data.name; 
        this.coverURL = (data.images as any[])[0].url;

        this.label = data.label; 
        this.releaseDate = new Date(data.release_date); 

        this.trackCount = data.total_tracks; 
        this.popularity = data.popularity; 

        this.artists = (data.artists as any[]).map((artistData) => new MVArtist(artistData)); 
    }

}



export { Album }






