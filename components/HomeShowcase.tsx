

import styles from "../styles/showcase.module.scss"
import Icon from "../utilities/elements/Icon";

const HomeShowcase = () => {
    return (
        <article id={ styles.showcase }>
            <p className={ styles.title }>New Releases</p>

            <div id={ styles.releases }>
                <img src="https://i.scdn.co/image/ab67616d0000b2730cce24b9cfe0301847312f74" alt="" />
                <img src="https://i.scdn.co/image/ab67616d0000b273464d776b632888543353596d" alt="" />
                <img src="https://i.scdn.co/image/ab67616d0000b273a7e86044a15f55db6fa268cb" alt="" />
            </div>

            <div className={ styles.info }>
                <p className={ styles.title }>Album Title</p>

                <div className={ styles.trailer }>
                    <p>Artist Name &middot; 7 Days ago</p>

                    <div className={ styles.pagination }>
                    <Icon>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.25 12.2743L19.25 12.2743" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.2998 18.2987L4.2498 12.2747L10.2998 6.24969" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </Icon>

                    <Icon>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.75 11.7257L4.75 11.7257" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.7002 5.70131L19.7502 11.7253L13.7002 17.7503" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </Icon>
                    </div>


                </div>
            </div>


            <Shadow />

        </article>
    )
}

const Shadow = () => {
    return (
        <div id={ styles.shadow }></div>
    )
}


// https://i.scdn.co/image/ab67616d0000b273a7f2bf7c6eeb841cb4cf0b15
// https://i.scdn.co/image/ab67616d0000b273a7e86044a15f55db6fa268cb
// https://i.scdn.co/image/ab67616d0000b273464d776b632888543353596d


export default HomeShowcase; 

