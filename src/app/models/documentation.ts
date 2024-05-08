import { User } from "./user"

export class Documentation {
    
    id:number | undefined
    
    titulo:string = ''
    descricao:string = ''
    abas:any[] = []
    imagemCapa:string = ''
    commitText:string = ''
    versao:string = ''
    status:number | undefined = 1
    dataAlteracao:string | undefined = new Date().toLocaleString()
    usuarioAlteracao:User = new User()
    tags:any[] = []
    
    abasAlteradas:any[] = []

    acessoUsuario:any

    constructor(
        documentationJson : Partial<Documentation> | undefined = undefined
    ){
        if(documentationJson){
            Object.assign(this, documentationJson);
        }
    }

}
