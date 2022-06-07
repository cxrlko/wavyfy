



import Vibrant from "node-vibrant";
import * as React from "react"
import { Link, NavLink } from "react-router-dom";
import { Architect } from "../../admin/architect";
import { Divider } from "../../components/divider";
import { Axis, Scrollview } from "../../components/scrollview"
import { Color, RGB } from "../../core/color";
import { Album } from "../../models/album";
import { Track } from "../../models/track";
import { getIDfromURL } from "../../utilities/getId";
import { Shadow } from "../app/shadow";


interface IAlbumPageProperties
{

}


function AlbumPage(props: IAlbumPageProperties)
{
    const [albumHue, setAlbumHue] = React.useState<number>(undefined); 

    const [album, setAlbum] = React.useState<Album>( undefined );
    const [songs, setSongs] = React.useState<Track[]>([]);
    

    React.useEffect(() => 
    {
        const id = getIDfromURL(window.location.pathname); 
        // const id = `7dqftJ3kas6D0VAdmt3k3V`; 
        setupPage(id); 

    }, []); 

    // #region Setup page
    /**
     * 
     */
    const setupPage = React.useCallback( async (id: string) => 
    {
        const item = await Architect.network.fetchAlbum(id);


        Vibrant.from(`${ item.coverURL }`)
        .getPalette()
        .then((responce) => 
        {
            const vibrant = responce.Vibrant; 
            if (!vibrant) { return; }


            const color = Color.rgbToHSL(new RGB(vibrant.r, vibrant.g, vibrant.b));
            setAlbumHue(color.hue); 

        })
        .catch((error) => { console.log(`Error with vibrant js: ${ error }`) }); 

        setAlbum(item); 

        const songs = await Architect.network.fetchAlbumTracks(id); 
        setSongs(songs); 

 
    }, []); 
    // #endregion


    return (

    <Scrollview id="albumpage" classes="sheet" axis={ Axis.vertical } content=
    {
    <>
        <div id="showcase">
        {
            album &&
            <>
            <AlbumPageHeader album={ album } />
            <AlbumPageCover  album={ album } />
            <AlbumPageMetadata album={ album } />
            </>
        }
        </div>


        <div id="albumTracks">
            <div className="toolkit">

            </div>

            <>
            {
                (songs.map((song, songIndex) => <AlbumTrack key={ songIndex } item={ song } />))
            }
            </>
        </div>

        {
            (albumHue != undefined) &&
            <Shadow hue={ albumHue } />
        }

    </>
    }/>


    )
}


// #region Album Page Header
interface IAlbumPageHeaderProperties 
{
    album: Album; 
}

function AlbumPageHeader(props: IAlbumPageHeaderProperties)
{
    return (

        <div className="header">
            <h1 className="truncated">{ props.album.title }</h1>
            <div className="mtdata">
                <Link to={ `/artist/${ props.album.artists[0].id }` } children={ <p className="label">{ props.album.artists[0].name }</p> } />
                <p>&nbsp;&middot;&nbsp;{ (props.album.trackCount == 1) ? `Single` : `Album` }&nbsp;&middot;&nbsp;{ props.album.releaseDate.getFullYear() }</p>
            </div>
        </div>

    )
}
// #endregion

// #region Album Page Cover
interface IAlbumPageCoverProperties
{
    album: Album; 
}

function AlbumPageCover(props: IAlbumPageCoverProperties)
{
    return (

        <div className="cover">
            <img src={ props.album.coverURL } alt="" />
        </div>

    )
}
// #endregion

// #region Album Page Metadata 
interface IAlbumPageMetadata 
{
    album: Album; 
}

function AlbumPageMetadata(props: IAlbumPageMetadata)
{

    return (

        <div className="metadata">
            <p>{ props.album.popularity } Million plays</p>
            <Divider />
            <p>{ `${ props.album.trackCount } song${ (props.album.trackCount > 1) ? `s` : `` }` }</p>
        </div>
    )

}

// #endregion

// #region Album Track 
interface IAlbumTrackProperties 
{
    item: Track; 
}

function AlbumTrack(props: IAlbumTrackProperties)
{

    return (

        <div className="album-track">
            <p className="index">{ props.item.trackIndex }</p>
            <p>{ props.item.title }</p>
            <p className="time">{ props.item.duration.digitalTimeFormat() }</p>

        </div>

    )

}
// #endregion

export { AlbumPage }




