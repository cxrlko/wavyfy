







import { addListener } from "process";
import * as React from "react"
import { useNavigate } from "react-router";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { Architect } from "../../admin/architect";
import { Divider } from "../../components/divider";
import { Grid } from "../../components/grid";
import { Region } from "../../components/region";
import { Axis, Scrollview } from "../../components/scrollview";
import { Album } from "../../models/album";
import { Artist } from "../../models/artist";
import { Track } from "../../models/track";
import { AlbumCard } from "../cards/albumCard";
import { ArtistCard } from "../cards/artistCard";
import { TrackCard } from "../cards/trackCard";




interface IHomePageProperties 
{

}


function HomePage(props: IHomePageProperties)
{

    const [newReleases, setNewReleases] = React.useState<Album[]>([]); 
    const [topArtists, setTopArtists] = React.useState <Artist[]> ([]); 
    const [topTracks, setTopTracks] = React.useState <Track[]> ([]); 
    const [topAlbums, setTopAlbums] = React.useState <Album[]> ([]); 


    React.useEffect(() => 
    {
        setupPage(); 

    }, []); 


    // #region Setup Page 
    /** 
     * 
     */
    const setupPage = React.useCallback( async () => 
    {

        setTopArtists( await Architect.network.fetchTopArtists() ); 
        setNewReleases( await Architect.network.fetchNewReleases() ); 

        setTopTracks( await Architect.network.fetchTopTracks() ); 

        setTopAlbums( await Architect.network.fetchTopAlbums() ); 


    }, []); 
    // #endregion

    // #region Component 
    return (

    <Scrollview id="Home" axis={ Axis.vertical } classes="sheet" content=
    {
    <>
        <HomeShowcase albums={ newReleases.slice(0, 10) } />

        <Region articleID="top-artists" header="Top Artists" content=
        {
            <Grid gap={{ x: 1, y: 1 }} minItemWidth={ 280 } contentItems=
            {
                (topArtists.map((artist, artistIndex) => <ArtistCard key={ artistIndex } artist={ artist } />))
            }/>
        }/>


        <Region articleID="top-tracks" header="Top Tracks" content=
        {
            <Grid gap={{ x: 1, y: 2 }} minItemWidth={ 280 } contentItems=
            {
                (topTracks.map((track, trackIndex) => <TrackCard key={ trackIndex } track={ track } />))
            }/>
        }/>


        <Region articleID="top-albums" header="Top Albums 2022" content=
        {
            <Grid gap={{ x: 1, y: 2 }} minItemWidth={ 280 } contentItems=
            {
                (topAlbums.map((release, index) => <AlbumCard key={ index } album={ release } />))
            }/>
        }/>
    </>
    }/>

    )
    // #endregion


}





// #region Home Showcase 
interface IHomeShowcaseProperties 
{
    albums: Album[]; 
}

let previousIndex : number = -1; 

function HomeShowcase(props: IHomeShowcaseProperties)
{

    const navigate = useNavigate();
    const [index, setIndex] = React.useState <number> (0); 


    const pallete = React.useMemo(() => 
    {

    }, [index]); 


    // #region Handle Window Paging
    const handleWindowPaging = React.useCallback((event: KeyboardEvent) => 
    {
        if (event.key == `ArrowLeft`)
        { 
            if (index == 0) { return; } setIndex( index - 1 ); 

        }
        else if ((event.key == `ArrowRight`))
        {
            if (index == props.albums.length - 1) { return; } setIndex( index + 1 ); 

        };

    }, [index]); 
    // #endregion

    // #region Navigate to current album
    const navigateToCurrentAlbum = React.useCallback(() => 
    {
        navigate(`/album/${ props.albums[index].id }`); 

    }, [index, props.albums]); 
    // #endregion

    React.useEffect(() => 
    {
        window.addEventListener((`keydown`), handleWindowPaging);

        return () => 
        {
            window.removeEventListener('keydown', handleWindowPaging);
        }
        
    }, [index]); 


    // #region Scroll variables
    const scrollThreshhold : number = 0.4; 
    let startTouch : React.TouchEvent<HTMLElement> = undefined; 
    let endTouch : React.TouchEvent<HTMLElement> = undefined; 

    let touchStartTimer : number = 0; 
    let touchEndTimer : number = 0;
    // #endregion

    // #region Get Image Class List
    const getImageClassList = React.useCallback((albumIndex: number) => 
    {
        const list : string[] = []; 
        if (albumIndex == index) 
        {
            list.push((previousIndex <= index) ? `active` : `recover`); 

            previousIndex = albumIndex; 

        }; 
        if (albumIndex < index) { list.push(`dismissed`) }
        else if (albumIndex > index + 2) { list.push(`lost`) };


        return list.join(` `); 

    }, [index]); 
    // #endregion

    // #region Component
    return (

        <article

        onTouchStart={ (event) => 
        {

            startTouch = event;
            touchStartTimer = Date.now();
        }}
        onTouchEnd={ (event) => 
        {
            endTouch = event;
            touchEndTimer = Date.now();

            let distance = ((endTouch.changedTouches[0].pageX) - (startTouch.changedTouches[0].pageX));
            let time = (touchEndTimer - touchStartTimer);
            let velocity = (distance / time);


            //Scroll Left
            if ((velocity > scrollThreshhold))
            {
                if (index == 0) { return; }
                setIndex( index - 1 ); 
            }
            // Scroll Right
            else if ((velocity < -scrollThreshhold))
            {
                if (index == props.albums.length - 1) { return; }
                setIndex( index + 1 ); 
            }

        }}
        id="home-showcase">
        
            <div
                onClick={ () =>
                {
                    navigateToCurrentAlbum(); 
                }}
                id="new-releases">
                {

                    (props.albums.map((album : Album, albumIndex : number) => 
                        <img
                            className={ getImageClassList(albumIndex) }
                            key={ albumIndex } 
                            src={ album.coverURL }
                            alt={ album.title }
                        ></img> 
                    ))
                }
            </div>

            {
                props.albums[index] &&
                <div className="info">
                    <p className="title truncated">{ props.albums[index].title }</p>

                    {
                        props.albums[index].artists[0] &&
                        <p className="truncated">{ props.albums[index].artists[0].name } &middot; { props.albums[index].releaseDate.getFullYear() }</p>
                    }
                </div>
            }

        </article>
    )
    // #endregion


}


// #endregion





export { HomePage }




















