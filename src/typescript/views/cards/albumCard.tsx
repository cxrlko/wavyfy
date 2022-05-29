




import * as React from "react"; 
import { Link } from "react-router-dom";
import { Album } from "../../models/album";



interface IAlbumCardProperties 
{
    album: Album;
    class? : string; 
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

            <Link to={ `/album/${ this.props.album.id }` } className={ `album-card${ this.props.class ? ` ${this.props.class}` : `` }` } children=
            {
            <>

                <div className="cover">
                    <img src={ this.props.album.coverURL } alt={ this.props.album.title } />
                </div>

                <div className="content">
                    <p className="label name">{ this.props.album.title }</p>
                    <p className="artists">{ this.props.album.artists[0].name }</p>
                </div>

                
            </>
            } />

        )
    }
}

// 


export { AlbumCard }









