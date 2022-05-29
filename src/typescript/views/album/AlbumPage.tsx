



import * as React from "react"
import { Architect } from "../../admin/architect";
import { Axis, Scrollview } from "../../components/scrollview"
import { Album } from "../../models/album";


interface IAlbumPageProperties
{

}


function AlbumPage(props: IAlbumPageProperties)
{
    const [album, setAlbum] = React.useState<Album>( undefined );
    

    React.useEffect(() => 
    {
        const id = `02uWB8Kekadkl3yGBoOOcx`;

        fetchPageAlbum(id); 

    }, []); 

    const fetchPageAlbum = React.useCallback( async (id: string) => 
    {
        const item = await Architect.network.fetchAlbum(id);
        setAlbum(item); 

        console.log(item); 

    }, []); 


    return (

    <Scrollview id="albumpage" classes="sheet" axes={ Axis.vertical } content=
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
            <h1>{ props.album.title }</h1>
            <p className="mtdata">Album&nbsp;&middot;&nbsp;{ `${ props.album.releaseDate.getFullYear() }` }</p>
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
        { props.album.id }
        </div>
    )

}

// #endregion


export { AlbumPage }




