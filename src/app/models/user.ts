export class User {
    
    id:number = 0
    
    nome:string | undefined
    funcao:string = ''
    imagem:string = ''

    acesso:string = ''
    editar:boolean = false
    criar:boolean = false
    apagar:boolean = false
    
    projetos:string[] = []

    login:string = ''
    password:string = ''

    constructor(
        userJson : Partial<User> | undefined = undefined
    ){
        if(userJson){
            Object.assign(this, userJson);
        }
    }
}
