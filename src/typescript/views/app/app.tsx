

import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Architect } from "../../admin/architect";
import { Network } from "../../admin/network";
import { Track } from "../../models/track";
import { AlbumPage } from "../album/AlbumPage";
import { ArtistPage } from "../artist/ArtistPage";
import { HomePage } from "../home/home";
import { MediaPlayer } from "../media/mediaPlayer";
import { NavBar } from "../nav/navbar";
import { SearchPage } from "../search/SearchPage";


interface IAppProperties 
{

}


interface IMediaContext 
{
    media: Track; 
    updateMedia: (media: Track) => Promise<void>; 
}

const MediaContext = React.createContext<IMediaContext>(undefined);
const MediaProvider = MediaContext.Provider


function App(props: IAppProperties)
{

    const [playingMedia, setPlayingMedia] = React.useState<Track>(undefined); 

    // #region Player
    const player = React.useMemo(() => 
    {
        return new Audio(); 
    }, []); 
    // #endregion


    React.useEffect(() => 
    {
        if (!playingMedia) { return }; 

        player.src = playingMedia.previewURL; 
        player.load();
        player.play(); 

        navigator.mediaSession.metadata = new MediaMetadata({
            album: playingMedia.albumName, 
            title: playingMedia.title, 
            artist: playingMedia.artists[0].name, 
            artwork: [{ src: playingMedia.coverURL }]
        })


    }, [playingMedia]); 

    // #region Update Playing Media
    const updatePlayingMedia = React.useCallback(async (media: Track) => 
    {
        if (!media.previewURL) { return }; 
        try 
        {
            setPlayingMedia(media); 

        } catch (error) { console.log(`Error playing media: ${ error }`) }

    }, []); 
    // #endregion

    return (
        <MediaProvider value={{ media: playingMedia, updateMedia: updatePlayingMedia }}>
            <NavBar />

            <Routes>
                <Route exact index element={ <HomePage /> } />
                <Route path="/album/*" element={ <AlbumPage /> } />
                <Route path="/artist/*" element={ <ArtistPage /> } />
                <Route path="/search/*" element={ <SearchPage /> } />
            </Routes>

            {
                playingMedia &&
                <MediaPlayer />
            }

        </MediaProvider>
    )
}

export { App, MediaContext }





