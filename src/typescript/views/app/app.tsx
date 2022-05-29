

import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlbumPage } from "../album/AlbumPage";
import { ArtistPage } from "../artist/ArtistPage";
import { Home } from "../home/home";
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
                <Route exact index element={ <ArtistPage /> } />
                <Route path="/album/:id" element={ <AlbumPage /> } />
                <Route path="/artist/:id" element={ <ArtistPage /> } />
                <Route path="/search/:id" element={ <SearchPage /> } />
            </Routes>
        </>
        )
    }
}


export { App }





