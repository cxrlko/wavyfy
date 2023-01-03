

import styles from "../styling/scrollview.module.scss"

enum Axis
{
    horizontal = `horizontal`, 
    vertical = `vertical`, 
    both = `horizontal vertical`
}

interface ScrollviewProperties {
    axis: Axis; 
    children? : JSX.Element; 
}

const Scrollview = (props: ScrollviewProperties) => {

    const { axis, children } = props; 

    const getDirectionalClasses = () => {
        const classes : string[] = []; 
        if (axis === Axis.both || axis === Axis.horizontal) { classes.push(styles.horizontal); }
        if (axis === Axis.both || axis === Axis.vertical) { classes.push(styles.vertical); }

        return classes.join(` `); 
    }

    return (    
        <div className={ `${ styles.scrollview } ${ getDirectionalClasses() }`}>
            <div className={ styles.viewport }>
                <div className={ styles.content }>{ children }</div>
            </div>
        </div>
    )
}

export { Axis }
export default Scrollview; 


