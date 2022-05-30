







import * as React from "react";
import { Link } from "react-router-dom";
import { Artist, MVArtist } from "../../models/artist";


interface IArtistCardProperties 
{
    artist: Artist; 
}


function ArtistCard(props: IArtistCardProperties)
{


    return (

        <Link to={ `/artist/${ props.artist.id }` } className="artist-card" children=
        {
        <>
            <div className="pfp icon">
            {
                props.artist.coverURL ? 
                <img src={ props.artist.coverURL } alt={ props.artist.name } /> : 

                <div className="icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </div>
            }
            </div>

            <div className="info">
                <p className="small">Artist</p>
                <p>{ props.artist.name }</p>
            </div>
        </>
        } />
            
    )

}


export { ArtistCard }



