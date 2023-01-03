


import HomeShowcase from "../components/HomeShowcase";
import Scrollview, { Axis } from "../utilities/elements/Scrollview";
import styles from "../styles/index.module.scss";
import Region from "../utilities/elements/Region";
import Grid from "../utilities/elements/Grid";
import TrackCard from "../components/TrackCard";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";

const Home = () => {
    return (
        <>
            <HomeShowcase />

            <Region header="Top Tracks">
            <Grid id="" minItemWidth={ 332 }>
                <>
                <TrackCard />
                <TrackCard />
                <TrackCard />
                <TrackCard />
                </>
            </Grid>
            </Region>


            <Region header="Top Artists">
            <Grid id="" minItemWidth={ 332 }>
                <>
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                    <ArtistCard />
                </>
            </Grid>
            </Region>


            <Region header="Top Albums">
            <Grid id="" minItemWidth={ 332 }>
                <>
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
                <AlbumCard />
                </>
            </Grid>
            </Region>


        </>
    )
}


export default Home; 


