

import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlbumPage } from "../album/AlbumPage";
import { Home } from "../home/home";
import { NavBar } from "../nav/navbar";


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
                <Route exact index element={ <Home /> } />
                <Route path="/album/:id" element={ <AlbumPage /> } />
                <Route path="/artist/:id" element={ <AlbumPage /> } />
                <Route path="/search/:id" element={ <AlbumPage /> } />
            </Routes>
        </>
        )
    }
}


export { App }





