

import styles from "../styling/grid.module.scss";

interface GridProps {
    id: string; 
    minItemWidth: number; 
    children?: JSX.Element; 
}

const Grid = ({ children, minItemWidth, id }: GridProps) => {
    return (
        <div id={ id } className={ styles.grid } style={{
            gridTemplateColumns:`repeat(auto-fill, minmax(${ minItemWidth }px, 1fr))`, 
        }}>
            { children } 
        </div>
    )
}

export default Grid; 


