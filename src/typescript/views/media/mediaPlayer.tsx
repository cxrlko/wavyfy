









import * as React from "react";
import { MediaContext } from "../app/app";




interface IMediaPlayerProperties 
{
    
}

function MediaPlayer(props: IMediaPlayerProperties)
{

    const media = React.useContext(MediaContext);


    return (

        <section id="media">
        <div className="content">
            <div className="nowplaying-bar">
                <div className="content">
                <div className="image"><img src={ media.media.coverURL } alt="" /></div>

                <div className="details">
                    <p className="label">{ media.media.title }</p>
                    <p>{ media.media.artists[0].name }</p>
                </div>
                </div>

                <input readOnly id="track-progress" type="range" min={ 0 } value={ 5 } max={ 10 }/>
            </div>
        </div>
        </section>
    )

}

export { MediaPlayer }


















