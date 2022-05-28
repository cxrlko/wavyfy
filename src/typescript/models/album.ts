






class Album
{
    id: string; 

    title: string; 
    coverURL: string; 

    constructor(data: any)
    {
        // console.log(data); 

        this.id = data.id; 

        this.title = data.name; 
        this.coverURL = (data.images as any[])[0].url;
    }

}



export { Album }






