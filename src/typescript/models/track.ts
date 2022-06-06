



import { Duration } from "../core/duration";
import { Album } from "./album";
import { MVArtist } from "./artist";



class Track 
{
    id: string; 

    title: string; 
    explicit: boolean; 

    duration: Duration; 
    trackIndex: number; 
    
    albumID: string | undefined; 
    coverURL: string | undefined; 
    artists: MVArtist[] = []; 


    constructor(data: any)
    { 
        // console.log(data); 
        this.id = data.id; 

        this.title = data.name;
        this.explicit = data.explicit; 

        this.duration = new Duration(data.duration_ms);
        this.trackIndex = data.track_number; 
        
        this.albumID = (data.album) ? (data.album.id) : undefined;
        this.coverURL = (data.album) ? (data.album.images as any[])[0].url : undefined;
        this.artists = (data.artists as any[]).map((artistData) => new MVArtist(artistData)); 
    }

}



export { Track }








