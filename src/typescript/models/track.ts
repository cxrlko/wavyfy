



import { Duration } from "../core/duration";
import { Album } from "./album";
import { Artist } from "./artist";



class Track 
{
    id: string; 

    title: string; 
    explicit: boolean; 

    duration: Duration; 
    trackIndex: number; 
    
    coverURL: string | undefined; 
    artists: Artist[] = []; 


    constructor(data: any)
    { 
        // console.log(data); 
        this.id = data.id; 

        this.title = data.name;
        this.explicit = data.explicit; 

        this.duration = new Duration(data.duration_ms);
        this.trackIndex = data.track_number; 
        
        this.coverURL = (data.album) ? (data.album.images as any[])[0].url : undefined;
        this.artists = (data.artists as any[]).map((artistData) => new Artist(artistData)); 
    }

}



export { Track }








