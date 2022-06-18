

import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlbumPage } from "../album/AlbumPage";
import { ArtistPage } from "../artist/ArtistPage";
import { HomePage } from "../home/home";
import { MediaPlayer } from "../media/mediaPlayer";
import { NavBar } from "../nav/navbar";
import { SearchPage } from "../search/SearchPage";


interface IAppProperties 
{

}


class App extends React.Component 
{
    constructor(props: IAppProperties)
    {
        super(props); 
    }

    render(): React.ReactNode 
    {
        return (
        <>
            <NavBar />

            <Routes>
                <Route exact index element={ <HomePage /> } />
                <Route path="/album/*" element={ <AlbumPage /> } />
                <Route path="/artist/*" element={ <ArtistPage /> } />
                <Route path="/search/*" element={ <SearchPage /> } />
            </Routes>

            <MediaPlayer />
        </>
        )
    }
}


export { App }





