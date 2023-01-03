

import styles from "../styling/icon.module.scss"

interface IconProperties {
    disabled? : boolean; 
    children? : JSX.Element; 
}

function Icon({ disabled, children }: IconProperties) {
    return (
        <button disabled={ disabled } className={ styles.icon }>
            { children }
        </button>
    )
}

export default Icon; 


