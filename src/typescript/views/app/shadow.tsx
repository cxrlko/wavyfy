







import * as React from "react"
import ReactDOM from "react-dom";

// #region Shadow
interface IShadowProperties 
{

}

function Shadow(props: IShadowProperties) 
{
    const rootElement = document.getElementById(`root`); 

    React.useEffect(() => 
    {

    }, []); 

    return ReactDOM.createPortal(
        <div id="shadow" style={{ background: `background: linear-gradient(180deg, #FFE299 0%, transparent 100%)` }}>

        </div>, 

        rootElement
    )
}
// #endregion


export { Shadow }




