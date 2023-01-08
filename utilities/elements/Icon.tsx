

import styles from "../styling/icon.module.scss"

interface IconProperties {
    id? : string; 
    disabled? : boolean; 
    children? : JSX.Element; 
}

function Icon({ disabled, children, id }: IconProperties) {
    return (
        <button id={ id } disabled={ disabled } className={ styles.icon }>
            { children }
        </button>
    )
}

export default Icon; 


