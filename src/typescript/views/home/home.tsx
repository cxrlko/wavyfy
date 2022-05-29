








import * as React from "react"
import { Album } from "../../models/album";


interface IHomePageProperties 
{

}


function HomePage(props: IHomePageProperties)
{

    const [newReleases, setNewReleases] = React.useState<Album[]>([]); 

    return (

        <h1>Hello world</h1>

    )
}





export { HomePage }






