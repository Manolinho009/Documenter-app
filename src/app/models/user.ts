export class User {
    
    login:string
    password:string 
    nome:string | undefined
    id:number = 0

    constructor(
        login:any
        , password:any
        , nome:any | undefined
    ){
        this.login = login
        this.password = password
        this.nome = nome

    }
}
