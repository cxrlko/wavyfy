


import * as React from "react"
import { Architect } from "../../admin/architect";
import { Axis, Scrollview } from "../../components/scrollview"
import { getIDfromURL } from "../../utilities/getId";


interface ISearchPageProperties
{

}

function SearchPage(props: ISearchPageProperties)
{

    React.useEffect(() => 
    {

        const encoded = getIDfromURL(window.location.pathname);
        const query = decodeURIComponent(encoded);
    

        setupPage(query); 

    }, []); 


    // #region Fetch Query Items 
    const setupPage = React.useCallback( async (value: string) => 
    {

        Architect.network.fetchQueryItems(value); 

    }, []); 
    // #endregion


    return (
    
    <Scrollview axis={ Axis.vertical } content=
    {

    <></>

    }/>

    )

}


export { SearchPage }



