






import * as React from "react"
import { Architect } from "../../admin/architect";
import { Axis, Scrollview } from "../../components/scrollview";
import { Album } from "../../models/album";
import { Artist } from "../../models/artist";
import { Track } from "../../models/track";
import { TrackCard } from "../cards/trackCard";


interface IArtistPageProperties
{

}

function ArtistPage(props: IArtistPageProperties)
{

    const [artist, setArtist] = React.useState<Artist>( undefined ); 
    const [artistAlbums, setArtistAlbums] = React.useState<Album[]>( [] ); 
    const [artistTopTracks, setArtistTopTracks] = React.useState<Track[]>( [] ); 


    React.useEffect(() => 
    {
        const artistID = `1vyhD5VmyZ7KMfW5gqLgo5`;
        
        setupArtistPage(artistID); 

    }, []); 


    // #region Setup Page
    const setupArtistPage = React.useCallback( async (id: string) => 
    {
        setArtist( await Architect.network.fetchArtist(id) ); 
        setArtistAlbums( await Architect.network.fetchArtistAlbums(id) );
        setArtistTopTracks( await Architect.network.fetchArtistTopTracks(id) );

    }, []); 
    // #endregion


    return (

    <Scrollview axis={ Axis.vertical } classes="sheet" content=
    {
    <>
        { artist && <ArtistShowcase artist={ artist } /> }
        <ArtistTopTracks songs={ artistTopTracks } />
        <ArtistAlbums albums={ artistAlbums } />
    
    </>
    } />

    )

}


// #region Artist Showcase 
interface IArtistShowcaseProperties 
{
    artist: Artist; 
}

function ArtistShowcase(props: IArtistShowcaseProperties)
{

    return (

        <h1>{ props.artist.name }</h1>

    )

}
// #endregion


// #region Artist Albums 
interface IArtistAlbums 
{
    albums: Album[]; 
}

function ArtistAlbums(props: IArtistAlbums) 
{

    const [minView, setMinView] = React.useState(true); 

    const albums = React.useMemo<Album[]>(() => 
    {
        const items = (minView) ? props.albums.slice(0, 5) : props.albums;
        return items;  

    }, [minView, props.albums])

    return (

        <h1>Artist Albums</h1>


    )

}
// #endregion


// #region Artist Top Tracks 
interface IArtistTopTracks 
{
    songs: Track[]; 
}


function ArtistTopTracks(props: IArtistTopTracks)
{

    const [minView, setMinView] = React.useState(true); 


    const displaySongs = React.useMemo<Track[]>(() => 
    {
        const items = (minView) ? props.songs.slice(0, 5) : props.songs; 
        return items; 

    }, [minView, props.songs])


    return (

    <div id="top-tracks">
    {
        (displaySongs.map((song, songIndex) => <TrackCard key={ songIndex } track={ song } />))
    }
    </div>

    )

}
// #endregion



export { ArtistPage }





