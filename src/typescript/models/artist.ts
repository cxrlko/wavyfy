








class Artist 
{

    id: string; 

    name: string; 


    constructor(data: any)
    {
        console.log(data); 

        this.id = data.id; 
        this.name = data.name; 
    }

}



export { Artist }



