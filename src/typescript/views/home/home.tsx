








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
        <HomeShowcase albums={ newReleases.slice(0, 3) } />

        <Region articleID="new-releases" header="New Releases" content=
        {
            <Grid gap={{ x: 1, y: 2 }} minItemWidth={ 280 } contentItems=
            {
                (newReleases.map((release, index) => <AlbumCard key={ index } album={ release } />))
            }/>
        }/>


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

}

class HomeShowcase extends React.Component <IHomeShowcaseProperties, IHomeShowcaseStates>
{

    constructor(props: IHomeShowcaseProperties)
    {
        super(props); 
        this.state = {  }; 
    }


    render(): React.ReactNode
    {
        return (

            <></>

        );
    }

}
// #endregion


export { HomePage }






