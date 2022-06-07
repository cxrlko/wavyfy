






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
import { Shadow } from "../app/shadow";
import Vibrant from "node-vibrant"
import { Color, RGB } from "../../core/color";





interface IHomePageProperties 
{

}


function HomePage(props: IHomePageProperties)
{

    const [index, setIndex] = React.useState <number> (0); 
    const [hue, setHue] = React.useState<number>(42); 

    const [newReleases, setNewReleases] = React.useState<Album[]>([]); 
    const [topArtists, setTopArtists] = React.useState <Artist[]> ([]); 
    const [topTracks, setTopTracks] = React.useState <Track[]> ([]); 
    const [topAlbums, setTopAlbums] = React.useState <Album[]> ([]); 


    React.useEffect(() => 
    {
        setupPage(); 

    }, []); 


    // #region Dominant Color
    React.useEffect(() => 
    {
        if (newReleases.length <= 0) { return; }


        Vibrant.from(`${ newReleases[index].coverURL }`)
        .getPalette()
        .then((responce) => 
        {
            const vibrant = responce.Vibrant; 
            if (!vibrant) { return; }


            const color = Color.rgbToHSL(new RGB(vibrant.r, vibrant.g, vibrant.b));

            setHue(color.hue); 

        })
        .catch((error) => { console.log(`Error with vibrant js: ${ error }`) }); 

    }, [index, newReleases]); 
    // #endregion


    // #region Setup Page 
    /** 
     * 
     */
    const setupPage = React.useCallback( async () => 
    {

        setTopArtists( await Architect.network.fetchTopArtists() ); 

        const newReleases = await Architect.network.fetchNewReleases();
        setNewReleases( newReleases.slice(0, 10) ); 

        setTopTracks( await Architect.network.fetchTopTracks() ); 

        setTopAlbums( await Architect.network.fetchTopAlbums() ); 


    }, []); 
    // #endregion

    // #region Component 

    return (

    <Scrollview id="Home" axis={ Axis.vertical } classes="sheet" content=
    {
    <>
        <HomeShowcase focusIndex={ index } setFocusIndex={ setIndex } albums={ newReleases } />

        <Region articleID="top-tracks" header="Top Tracks" content=
        {
            <Grid gap={{ x: 1, y: 2 }} minItemWidth={ 332 } contentItems=
            {
                (topTracks.map((track, trackIndex) => <TrackCard key={ trackIndex } track={ track } />))
            }/>
        }/>



        <Region articleID="top-artists" header="Top Artists" content=
        {
            <Grid gap={{ x: 1, y: 1 }} minItemWidth={ 280 } contentItems=
            {
                (topArtists.map((artist, artistIndex) => <ArtistCard key={ artistIndex } artist={ artist } />))
            }/>
        }/>


        <Region articleID="top-albums" header="Top Albums 2022" content=
        {
            <Grid gap={{ x: 1, y: 2 }} minItemWidth={ 280 } contentItems=
            {
                (topAlbums.map((release, index) => <AlbumCard key={ index } album={ release } />))
            }/>
        }/>

        {
            (hue != undefined) &&
            <Shadow hue={ hue } />
        }

    </>
    }/>

    )
    // #endregion


}








// #region Home Showcase 
interface IHomeShowcaseProperties 
{
    albums: Album[]; 
    focusIndex: number; 
    setFocusIndex : React.Dispatch<React.SetStateAction<number>>;
}

let previousIndex : number = -1; 

function HomeShowcase(props: IHomeShowcaseProperties)
{

    const navigate = useNavigate();


    // #region Handle Window Paging
    const handleWindowPaging = React.useCallback((event: KeyboardEvent) => 
    {
        if (event.key == `ArrowLeft`)
        { 
            if (props.focusIndex == 0) { return; } props.setFocusIndex( props.focusIndex - 1 ); 

        }
        else if ((event.key == `ArrowRight`))
        {
            if (props.focusIndex == props.albums.length - 1) { return; } props.setFocusIndex( props.focusIndex + 1 ); 

        };

    }, [props.focusIndex]); 
    // #endregion

    // #region Navigate to current album
    const navigateToCurrentAlbum = React.useCallback(() => 
    {
        navigate(`/album/${ props.albums[props.focusIndex].id }`); 

    }, [props.focusIndex, props.albums]); 
    // #endregion

    React.useEffect(() => 
    {
        window.addEventListener((`keydown`), handleWindowPaging);

        return () => 
        {
            window.removeEventListener('keydown', handleWindowPaging);
        }
        
    }, [props.focusIndex]); 


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
        if (albumIndex == props.focusIndex) 
        {
            list.push((previousIndex <= props.focusIndex) ? `active` : `recover`); 

            previousIndex = albumIndex; 

        }; 
        if (albumIndex < props.focusIndex) { list.push(`dismissed`) }
        else if (albumIndex > props.focusIndex + 2) { list.push(`lost`) };


        return list.join(` `); 

    }, [props.focusIndex]); 
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
                if (props.focusIndex == 0) { return; }
                props.setFocusIndex( props.focusIndex - 1 ); 
            }
            // Scroll Right
            else if ((velocity < -scrollThreshhold))
            {
                if (props.focusIndex == props.albums.length - 1) { return; }
                props.setFocusIndex( props.focusIndex + 1 ); 
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
                props.albums[props.focusIndex] &&
                <div className="info">
                    <p className="title truncated">{ props.albums[props.focusIndex].title }</p>

                    <div className="trailer">
                    {
                        props.albums[props.focusIndex].artists[0] &&
                        <p className="truncated">{ props.albums[props.focusIndex].artists[0].name } &middot; { props.albums[props.focusIndex].releaseDate.getFullYear() }</p>
                    }
                    <div className="pagigation">
                        <div
                        onClick={ () => 
                        {
                            props.setFocusIndex( props.focusIndex - 1 );
                        }}
                        aria-disabled={ props.focusIndex == 0 }
                        className="icon">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.25 12.2743L19.25 12.2743" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.2998 18.2987L4.2498 12.2747L10.2998 6.24969" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </div>

                        <div
                        onClick={ () => 
                        {
                            props.setFocusIndex( props.focusIndex + 1 );
                        }}
                        aria-disabled={ props.focusIndex == props.albums.length - 1 }
                        className="icon">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.75 11.7257L4.75 11.7257" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.7002 5.70131L19.7502 11.7253L13.7002 17.7503" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </div>
                    </div>
                    </div>
                </div>
            }

        </article>
    )
    // #endregion


}


// #endregion





export { HomePage }
















