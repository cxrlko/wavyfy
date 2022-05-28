



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
        <></>
    }/>
    )
}


export { AlbumPage }




