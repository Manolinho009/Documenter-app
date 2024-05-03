import { User } from "../../models/user"

export class Documentation {
    
    id:any
    
    titulo:any
    descricao:any
    sections:any
    tags:any[] = []

    imagemCapa:any = ''

    commitText:any
    sectionsChanges:any[]

    version:any
    status:any
    
    dh_alteracao:any
    user_alteracao:User
    idUser:number = 0

    constructor(
        titulo:any
        ,user_alteracao:User
        ,descricao:any = ''
        ,sections:any = []
        ,commitText:any = ''
        ,sectionsChanges:any = []
        ,version:any = 0
        ,status:any = '1'
        ,dh_alteracao:any = new Date().toLocaleString()
    ){
        this.titulo = titulo
        this.sections = sections
        this.commitText = commitText
        this.sectionsChanges = sectionsChanges
        this.version = version
        this.status = status
        this.dh_alteracao = dh_alteracao
        this.user_alteracao = user_alteracao
        this.descricao = descricao
    }

}
