
import Link from "next/link";
import styles from "../styles/cards.module.scss"
import Icon from "../utilities/elements/Icon";

interface ArtistCardProps {
    coverURL? : string; 
}

const ArtistCard = ({ coverURL }: ArtistCardProps) => {


    return (
        <Link href={ `/artist/link` }>
            <div className={ styles.pfp }>
            {
                coverURL ?
                 
                <img src={ coverURL } alt={ "" }></img> : 
                    
                <Icon>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Icon>
            }
            </div>
            <div className={ styles.info }></div>
        </Link>
    )
}

export default ArtistCard; 


