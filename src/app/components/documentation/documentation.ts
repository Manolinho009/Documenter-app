import { User } from "../../models/user"

export class Documentation {
    
    titulo:any
    descricao:any
    sections:any

    imagemCapa:any = ''

    commitText:any
    sectionsChanges:any[]

    version:any
    status:any
    
    dh_alteracao:any
    user_alteracao:User

    constructor(
        titulo:any
        ,user_alteracao:User
        ,descricao:any = ''
        ,sections:any = []
        ,commitText:any = ''
        ,sectionsChanges:any = []
        ,version:any = ''
        ,status:any = ''
        ,dh_alteracao:any = ''
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
