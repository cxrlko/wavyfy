


import Link from "next/link";
import styles from "../styles/cards.module.scss"; 

const AlbumCard = () => {

    const { cover } = { cover: "https://i.scdn.co/image/ab67616d0000b273e1ac646ed6f25125e2a77229" }

    return (
        <Link href={ `/album/link` } className={ styles.albumCard }>
            <div className={ styles.cover }>
                <img src={ cover } alt="" />
            </div>

            <div className={ styles.info }>
                <p>Album Name</p>
                <p>Album Artist</p>
            </div>
        </Link>
    )
}

export default AlbumCard; 


