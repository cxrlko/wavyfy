








import * as React from "react"
import { Architect } from "../../admin/architect";
import { Grid } from "../../components/grid";
import { Region } from "../../components/region";
import { Axis, Scrollview } from "../../components/scrollview";
import { Album } from "../../models/album";
import { AlbumCard } from "../cards/albumCard";


interface IHomePageProperties 
{

}


function HomePage(props: IHomePageProperties)
{

    const [newReleases, setNewReleases] = React.useState<Album[]>([]); 


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

        setNewReleases( await Architect.network.fetchNewReleases() ); 
        
    }, []); 
    // #endregion



    // #region Component 
    return (

    <Scrollview id="Home" axis={ Axis.vertical } classes="sheet" content=
    {
    <>
    {
        
        <Region header="New Releases" content=
        {
            <Grid gap={{ x: 1, y: 2 }} minItemWidth={ 342 } contentItems=
            {
                (newReleases.map((release, index) => <AlbumCard key={ index } album={ release } />))
            }/>
        }/>


    }
    </>
    }/>

    )
    // #endregion




}





export { HomePage }






