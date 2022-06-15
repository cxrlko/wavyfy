






import Vibrant from "node-vibrant";
import * as React from "react"
import { Architect } from "../../admin/architect";
import { Chip } from "../../components/chip";
import { Divider } from "../../components/divider";
import { Grid } from "../../components/grid";
import { Region } from "../../components/region";
import { Axis, Scrollview } from "../../components/scrollview";
import { Color, RGB } from "../../core/color";
import { Album } from "../../models/album";
import { Artist, MVArtist } from "../../models/artist";
import { Track } from "../../models/track";
import { getIDfromURL } from "../../utilities/getId";
import { Shadow } from "../app/shadow";
import { AlbumCard } from "../cards/albumCard";
import { TrackCard } from "../cards/trackCard";


interface IArtistPageProperties
{

}

function ArtistPage(props: IArtistPageProperties)
{

    const [artistHue, setArtistHue] = React.useState(undefined); 

    const [artist, setArtist] = React.useState<Artist>( undefined ); 
    const [artistAlbums, setArtistAlbums] = React.useState<Album[]>( [] ); 
    const [artistTopTracks, setArtistTopTracks] = React.useState<Track[]>( [] ); 


    React.useEffect(() => 
    {

        const artistID
        = getIDfromURL(window.location.pathname); 
        // = `4q3ewBCX7sLwd24euuV69X`;
        // = `7MhMgCo0Bl0Kukl93PZbYS`;
        // = `3B9O5mYYw89fFXkwKh7jCS`;
        // = `6OBGbSaBUvQtk9wpQfDbOE`;
        // = `6tbjWDEIzxoDsBA1FuhfPW`;
        // = `4O15NlyKLIASxsJ0PrXPfz`;
        
        setupArtistPage(artistID); 

    }, []); 


    // #region Setup Page
    const setupArtistPage = React.useCallback( async (id: string) => 
    {
        const artist = await Architect.network.fetchArtist(id);

        if (!artist.coverURL) { return; }

        Vibrant.from(`${ artist.coverURL! }`)
        .getPalette()
        .then((responce) => 
        {
            const vibrant = responce.Vibrant; 
            if (!vibrant) { return; }


            const color = Color.rgbToHSL(new RGB(vibrant.r, vibrant.g, vibrant.b));
            setArtistHue(color.hue); 

        })
        .catch((error) => { console.log(`Error with vibrant js: ${ error }`) }); 


        setArtist( artist ); 
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

        {
            (artistHue != undefined) &&
            <Shadow hue={ artistHue } />
        }

    
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
            <div className="image"><img src={ props.artist.coverURL } alt={ props.artist.name } /></div>

            <div className="details">
                <h1 className="truncated">{ props.artist.name }</h1>
                <p>{ props.artist.followers.toLocaleString("en-US") } followers</p>
            </div>
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





