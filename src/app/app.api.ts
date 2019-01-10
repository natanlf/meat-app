/*não precisamos nos preocupar se é prod ou dev
Ao fazer o build de produçao por exemplo, lá no angular-cli.json ficará marcado para usar o ambiente de produção */

import { environment } from './../environments/environment'; 

export const MEAT_API = environment.api //pega o valor do ambiente que desejamos