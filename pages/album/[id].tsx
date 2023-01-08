
import Link from "next/link";
import styles from "../../styles/albumPage.module.scss"; 


const AlbumPage = () => {

    const { title, cover } = { title: "Album", cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36" }

    return (
        <>
            <div id={ styles.showcase }>
                <div className={ styles.header }>
                    <h1 className="truncated">{ title }</h1>
                    <p>
                        <Link href={ `/artist/id` }>{ "Artist name" }</Link>
                        &nbsp;&middot;&nbsp;{ "Album" }
                        &nbsp;&middot;&nbsp;{ 2022 }
                    </p>
                </div>

                <div className={ styles.cover }>
                <img src={ cover } alt="" />
                </div>

                <div className={ styles.metadata }>
                    <p>200 Million plays</p>
                    <span></span>
                    <p>{ `${ 8 } song${ (8 > 1) ? `s` : `` }` }</p>
                </div>
            </div>

            <div id={ styles.albumTracks }>
                <Track />
                <Track />
                <Track />
            </div>
        </>
    )
}


const Track = () => {
    return (
        <div className={ styles.track }>
            <p className={ styles.index }>1</p>
            <p className={ styles.title }>Song Name</p>
            <p>10:54</p>
        </div>
    )
}


export default AlbumPage; 
