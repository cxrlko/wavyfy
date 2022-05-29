




import * as React from "react"


enum Axis
{
    horizontal = `horizontal`, 
    vertical = `vertical`, 
    both = `horizontal vertical`
}


interface IScrollviewProperties
{
    axis : Axis, 
    id?: string, 
    classes?: string,
    content: React.ReactNode
}

interface IScrollviewStates 
{

}

class Scrollview extends React.Component<IScrollviewProperties, IScrollviewStates>
{

    constructor(props: IScrollviewProperties)
    {
        super(props); 

        this.state = 
        {
             
        }
    }

    render(): React.ReactNode 
    {
        return(
            <div id={ (this.props.id) ? this.props.id : `` } className={`scrollview ${this.props.axis }${(this.props.classes) ? ` ${this.props.classes}` : ``}`}>
            <div className="viewport">
            <div className="content">
                { this.props.content }
            </div>
            </div>
            </div>
        )
    }
}



export { Axis, Scrollview }




