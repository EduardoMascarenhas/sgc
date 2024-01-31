import { format } from 'date-fns'

export class ClienteModel {
    id: string
    name: string
    email: string
    coordX: number
    coordY: number
    tel: string
    createdAt: string
    updatedAt: string

    constructor(
        id = '',
        name = '',
        email = '',
        coordX = 0,
        coordY = 0,
        tel = '',
        createdAt = '',
        updatedAt = ''
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.coordX = coordX
        this.coordY = coordY
        this.tel = tel
        this.createdAt = this.convertDate(createdAt)
        this.updatedAt = this.convertDate(updatedAt)
    }

    private convertDate(date: string): string {
        if (date.length) {
            return format(new Date(date), 'dd/MM/yyyy')
        }

        return ''
    }
}
