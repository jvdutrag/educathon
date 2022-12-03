import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-br')

export function displayIfLogged(logged: boolean) {
    return {
        display: logged ? 'flex' : 'none'
    }
}

export function dateFormat(date: string) {
    return moment(date).format('DD/MM/YYYY HH:mm')
}

export function dateHumanize(date: string) {
    return moment(date).fromNow(true)
}
