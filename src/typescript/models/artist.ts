








class MVArtist 
{

    id: string; 
    name: string; 


    constructor(data: any)
    {
        this.id = data.id; 
        this.name = data.name; 
    }
}

class Artist extends MVArtist
{
    
    coverURL?: string; 

    genres: string[];
    popularity: number;  
    followers: number; 


    constructor(data: any)
    {
        super(data); 

        this.coverURL = (data.images as any[])[0] ? (data.images as any[])[0].url : undefined;

        this.popularity = data.popularity;
        this.followers = data.followers.total;
        this.genres = (data.genres as any[]).map((label) => `${ label }`); 

        // console.log(this); 
    }

}


export { MVArtist, Artist }



