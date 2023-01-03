


import styles from "../styling/region.module.scss"

interface RegionProperties {
    header: string; 
    children: JSX.Element; 
}

const Region = ({ header, children } : RegionProperties) => {
    return (
        <section>
            <p className="subtitle">{ header }</p>

            <div className={ styles.region }>
                { children }
            </div>
        </section>
    )
}

export default Region; 
