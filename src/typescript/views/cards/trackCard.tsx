








import { trace } from "console";
import * as React from "react"
import { Link, useNavigate } from "react-router-dom";
import { Track } from "../../models/track";
import { MediaContext } from "../app/app";

interface ITrackCardProperties 
{
    track: Track; 
}



function TrackCard(props: ITrackCardProperties)
{
    
    const media = React.useContext(MediaContext); 
    const navigate = useNavigate(); 

    React.useEffect(() => 
    {

    }, []); 


    return (


    <div
    onClick={ () => 
    {
        media.updateMedia(props.track); 
    }}
    className={ `track-card${ (props.track.previewURL ? ` playable` : ``) }` }>

        <div className="cover">
            <img src={ props.track.coverURL } alt={ props.track.title } />
        </div>

        <div className="info">
            <p className="subtitle truncated">{ props.track.title }</p>

            {/* <Link to={ `/artist/${ props.track.artists[0].id }` } children=
            {
            }/> */}
            <p className="truncated">{ props.track.artists[0].name }</p>

        </div>

        <div className="metadata">
            <p>{ props.track.duration.digitalTimeFormat() }</p>
        </div>

    </div>


    )

}


export { TrackCard }







