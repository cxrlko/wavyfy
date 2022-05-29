




import * as React from "react"; 
import { Album } from "../../models/album";



interface IAlbumCardProperties 
{
    album: Album;
}

interface IAlbumCardStates 
{
   
}


class AlbumCard extends React.Component<IAlbumCardProperties, IAlbumCardStates>
{

    constructor(props: IAlbumCardProperties)
    {
        super(props); 

        this.state = 
        {

        }
    }

    render(): React.ReactNode
    {
        return (

            <div>albumcard</div>

        );
    }
}




export { AlbumCard }









