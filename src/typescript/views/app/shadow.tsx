







import * as React from "react"
import ReactDOM from "react-dom";
import { clamp } from "../../utilities/clamp";

// #region Shadow
interface IShadowProperties 
{
    hue: number; 
}

function Shadow(props: IShadowProperties) 
{
    const rootElement = document.getElementById(`root`); 

    React.useEffect(() => 
    {
        const safariThemeTag = document.getElementById(`safari-theme`);

        safariThemeTag.setAttribute(`content`, `hsl(${ clamp(props.hue, 0, 360) }, 100%, 80%)`)

    }, [ props.hue ]); 

    return (
        <div id="shadow" style={{ background: `linear-gradient(180deg, hsl(${ clamp(props.hue, 0, 360) }, 100%, 80%) 0%, transparent 100%)` }}>

        </div>
    )
}
// #endregion


export { Shadow }




