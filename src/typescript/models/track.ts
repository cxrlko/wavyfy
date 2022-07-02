



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
    
    artists: MVArtist[] = []; 
    
    previewURL : string; 
    
    coverURL: string | undefined = undefined; 
    albumID: string | undefined = undefined; 
    albumName: string | undefined = undefined; 

    constructor(data: any)
    { 
        this.id = data.id; 

        this.title = data.name;
        this.explicit = data.explicit; 

        this.duration = new Duration(data.duration_ms);
        this.trackIndex = data.track_number; 
        
        this.artists = (data.artists as any[]).map((artistData) => new MVArtist(artistData)); 

        this.previewURL = data.preview_url ? data.preview_url : undefined; 
        this.albumID = data.album.id; 
        this.coverURL = (data.album.images as any[])[0].url; 

        this.albumName = data.album.name; 

    }

}



export { Track }








