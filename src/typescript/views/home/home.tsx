








import * as React from "react"
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

interface IHomeShowcaseStates 
{
    index: number; 
}

class HomeShowcase extends React.Component <IHomeShowcaseProperties, IHomeShowcaseStates>
{
    scrollThreshhold : number = 0.4; 
    startTouch : React.TouchEvent<HTMLDivElement> = undefined; 
    endTouch : React.TouchEvent<HTMLDivElement> = undefined; 

    touchStartTimer : number = 0; 
    touchEndTimer : number = 0;

    constructor(props: IHomeShowcaseProperties)
    {
        super(props); 
        this.state = { index: 0 }; 

    }


    render(): React.ReactNode
    {
        return (

            <div
                onTouchStart={ (event) => 
                {

                    this.startTouch = event;
                    this.touchStartTimer = Date.now();
                }}
                onTouchEnd={ (event) => 
                {
                    event.preventDefault(); 

                    this.endTouch = event;
                    this.touchEndTimer = Date.now();

                    let distance = ((this.endTouch.changedTouches[0].pageX) - (this.startTouch.changedTouches[0].pageX));
                    let time = (this.touchEndTimer - this.touchStartTimer);
                    let velocity = (distance / time);

                    //main Left
                    if ((velocity < -this.scrollThreshhold))
                    {
                        if (this.state.index == this.props.albums.length - 1) { return; }
                        this.setState({ index: this.state.index + 1 }); 
                    }
                    //main left
                    else if ((velocity > this.scrollThreshhold))
                    {
                        if (this.state.index == 0) { return; }
                        this.setState({ index: this.state.index - 1 }); 
                    }

                }}
                id="new-releases">
                {
                    (this.props.albums.map((album, albumIndex) => 
                        <img
                            className={ `${ albumIndex == this.state.index ? `active` : `` }` }
                            key={ albumIndex } 
                            src={ album.coverURL }
                            alt={ album.title }
                        ></img> 
                    ))
                }
            </div>

        );
    }

}
// #endregion


export { HomePage }






