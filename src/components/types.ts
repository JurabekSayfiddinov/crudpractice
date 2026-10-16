

export type User{
    id:number,
    name:string,
    description:string,
    images:string,
    isCompleted:boolean
}

export type InitialState{
    data:User[],
    loading:boolean,
    error:any
}