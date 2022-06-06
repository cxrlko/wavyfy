






import * as React from "react"
import { Architect } from "../../admin/architect";
import { Chip } from "../../components/chip";
import { Divider } from "../../components/divider";
import { Grid } from "../../components/grid";
import { Region } from "../../components/region";
import { Axis, Scrollview } from "../../components/scrollview";
import { Album } from "../../models/album";
import { Artist, MVArtist } from "../../models/artist";
import { Track } from "../../models/track";
import { getIDfromURL } from "../../utilities/getId";
import { AlbumCard } from "../cards/albumCard";
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

        const artistID
        = getIDfromURL(window.location.pathname); 
        // = `4q3ewBCX7sLwd24euuV69X`;
        
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

    <Scrollview id="artistpage" axis={ Axis.vertical } classes="sheet" content=
    {
    <>
        { artist && <ArtistShowcase artist={ artist } /> }
        <ArtistTopTracks songs={ artistTopTracks } />
        <ArtistAlbums albums={ artistAlbums } />
    
    </>
    } />

    )

}


// #region MVArtist Showcase 
interface IArtistShowcaseProperties 
{
    artist: Artist; 
}

function ArtistShowcase(props: IArtistShowcaseProperties)
{

    return (

        <div id="artist-showcase">
            <h1>{ props.artist.name }</h1>
            <img src={ props.artist.coverURL } alt={ props.artist.name } />
            <h1 className="top">{ props.artist.name }</h1>
        </div>


    )

}
// #endregion


// #region MVArtist Albums 
interface IArtistAlbums 
{
    albums: Album[]; 
}

function ArtistAlbums(props: IArtistAlbums) 
{

    const [minView, setMinView] = React.useState(true); 


    return (

        <Region articleID="artist-albums" header={ "Albums" } content=
        {

            <Grid gap={{ x: 1, y: 1 }} minItemWidth={ 320 } contentItems=
            {
                <>
                { (props.albums.map((album, albumIndex) => <AlbumCard key={ albumIndex } album={ album } class="grid-item" />)) }
                </>
            } />
        }/>

    )

}
// #endregion


// #region MVArtist Top Tracks 
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

    <Region articleID="top-artist-songs" header="Top Songs" content=
    {
        <>
        { 
            (displaySongs.map((song, songIndex) => <TrackCard key={ songIndex } track={ song } />))
        }
        </>
    } />

    )

}
// #endregion



export { ArtistPage }





