








import * as React from "react"
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { Architect } from "../../admin/architect";
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


function HomeShowcase(props: IHomeShowcaseProperties)
{

    const [index, setIndex] = React.useState <number> (0); 

    // #region Scroll variables
    const scrollThreshhold : number = 0.4; 
    let startTouch : React.TouchEvent<HTMLDivElement> = undefined; 
    let endTouch : React.TouchEvent<HTMLDivElement> = undefined; 

    let touchStartTimer : number = 0; 
    let touchEndTimer : number = 0;
    // #endregion

 
    const getImageClassList = React.useCallback((albumIndex: number) => 
    {
        const list : string[] = []; 
        if (albumIndex == index) { list.push(`active`)}; 
        if (albumIndex < index) { list.push(`lost`) };

        return list.join(` `); 

        // return `${ index }`

    }, [index]); 


    return (

    <React.Fragment>

        <div
            onTouchStart={ (event) => 
            {

                startTouch = event;
                touchStartTimer = Date.now();
            }}
            onTouchEnd={ (event) => 
            {
                event.preventDefault(); 

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

        <p>{ index }</p>



    </React.Fragment>
    )


}






export { HomePage }






