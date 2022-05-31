


import * as React from "react"
import { useLocation } from "react-router";
import { Architect } from "../../admin/architect";
import { Grid } from "../../components/grid";
import { Region } from "../../components/region";
import { Axis, Scrollview } from "../../components/scrollview"
import { Album } from "../../models/album";
import { Query } from "../../models/query";
import { Track } from "../../models/track";
import { getIDfromURL } from "../../utilities/getId";
import { AlbumCard } from "../cards/albumCard";
import { ArtistCard } from "../cards/artistCard";
import { TrackCard } from "../cards/trackCard";



interface ISearchPageProperties
{

}

function SearchPage(props: ISearchPageProperties)
{
    const location = useLocation(); 
    const [query, setQuery] = React.useState<Query>( undefined );


    // #region On Mount
    React.useEffect(() => 
    {

        const encoded = getIDfromURL(window.location.pathname);
        const searchString = decodeURIComponent(encoded);

        // const searchString = `The A Team`;
        console.log(`Changed with: ${ searchString }`); 

        setupPage(searchString); 

    }, [location]); 
    // #endregion

    // #region Fetch Query Items 
    const setupPage = React.useCallback( async (value: string) => 
    {
        const queryItem = await Architect.network.fetchQueryItems(value);
        setQuery( queryItem ); 

    }, []); 
    // #endregion

    // #region Display Songs
    const displaySongs = React.useMemo<Track[]>(() => 
    {
        if (!query) { return }; 

        return (query.songs.slice(0, 5)); 

    }, [query]); 
    // #endregion

    return (
    
    <Scrollview axis={ Axis.vertical } classes="sheet" content=
    {
        query &&
        <>
        <Region header="Songs" content=
        {
            (displaySongs.map((track, trackIndex) => <TrackCard key={ trackIndex } track={ track } />))
        }/>


        <Region articleID="search-artists" header={ "Artists" } content=
        {

            <Grid gap={{ x: 1, y: 1 }} minItemWidth={ 320 } contentItems=
            {
                <>
                { (query.artists.map((artist, artistIndex) => <ArtistCard key={ artistIndex } artist={ artist } />)) }
                </>
            } />

        }/>


        <Region articleID="search-albums" header={ "Albums" } content=
        {

            <Grid gap={{ x: 1, y: 1 }} minItemWidth={ 320 } contentItems=
            {
                <>
                { (query.albums.map((album, albumIndex) => <AlbumCard key={ albumIndex } album={ album } class="grid-item" />)) }
                </>
            } />

        }/>

        </>
    }/>

    )

}


export { SearchPage }



