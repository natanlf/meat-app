import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';

/*para ter um módulo precisamos usar o decorator @NgModule
Em um modulo temos declarations, imports, providers e bootstrap mas no nosso caso não precisamos
do bootstrap aqui, usamos ele somente no modulo raiz da aplicacao
Aqui não vamos ter providers pois só vamos usar o componente about e ele não usa nenhum tipo de serviço
Na verdade o que queremos é carregar esse componente somente quando formos usá-lo
O Router que faz o Lazy Loading, que é carregar esse modulo somente quando precisarmos usar
Como o componente about é usado somente nesse módulo, não precisamos colocar na lista de exports

Do mesmo jeito que fazemos no modulo raiz onde importamos as rotas daquele modulo usando o método forRoot passando a referencia para as rotas daquele modulo 
mas vamos usar o forChild pois usamos o loadChildren indicando que estamos carregando um modulo filho*/

const ROUTES: Routes = [
    {path: '', component: AboutComponent} //componente padrão que será carregado ao acessar o modulo
]

@NgModule({
    declarations:[AboutComponent], //lista todos os componentes que temos nesse módulo
    imports:[RouterModule.forChild(ROUTES)] 
})

export class AboutModule {

}