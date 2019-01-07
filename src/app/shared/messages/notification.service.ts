import { EventEmitter } from '@angular/core';

//Nessa classe teremos um eventEmitter pois quando um componente precisar notificar algo com snackbar usará esse serviço
//o snackbar vai se inscrever nesse serviço para exibir a notificação quando houver a chamada
//Qualquer parte da aplicacao pode usar esse serviço
export class NotificationService {
    notifier = new EventEmitter<any>()

    notify(message: any){
        this.notifier.emit(message) //assim passamos a mensagem que será exibida no snackbar
    }
}