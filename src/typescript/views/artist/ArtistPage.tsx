






import * as React from "react"
import { Architect } from "../../admin/architect";
import { Album } from "../../models/album";
import { Artist } from "../../models/artist";
import { Track } from "../../models/track";


interface IArtistPageProperties
{

}

function ArtistPage(props: IArtistPageProperties)
{

    const [artist, setArtist] = React.useState<Artist>( undefined ); 
    const [artistTopAlbums, setArtistTopAlbums] = React.useState<Album[]>( [] ); 
    const [artistTopTracks, setArtistTopTracks] = React.useState<Track[]>( [] ); 


    React.useEffect(() => 
    {
        const artistID = `4pQxRQ2bUyVpk89wzztCLw`;
        
        setupArtistPage(artistID); 

    }, []); 


    // #region Setup Page
    const setupArtistPage = React.useCallback( async (id: string) => 
    {
        setArtist( await Architect.network.fetchArtist(id) ); 
        setArtistTopAlbums( await Architect.network.fetchArtistAlbums(id) );
        setArtistTopTracks( await Architect.network.fetchArtistTopTracks(id) );

    }, []); 
    // #endregion


    return (

    <main id="artist-page">
    {
        artist &&
        <h1>{ artist.name }</h1>
    }
    </main>

    )

}


export { ArtistPage }





