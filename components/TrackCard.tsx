

import Link from "next/link";
import styles from "../styles/cards.module.scss";


const TrackCard = () => {
    return (
        <div className={ styles.trackcard }>
            <div className={ styles.cover }><img src="https://i.scdn.co/image/ab67616d0000b2730cce24b9cfe0301847312f74"></img></div>

            <div className={ styles.info }>
                <p className="">Song title</p>
                <Link href={ `/` }>Artist Name</Link>
            </div>

            <div className={ styles.metadata }>
                <p>10:30</p>
            </div>
        </div>
    )
}

export default TrackCard; 

