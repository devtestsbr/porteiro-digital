# porteiro-digital
Projeto de estudo para galera mostrar seu pontencial! A ideia é desenvolver um porteiro digital onde a partir de um qrcode os visitantes e entregadores consigam notificar ou falar com os moradores rapidamente.


![Especificação 1.0](./spec-10.png)

## Desafios CPBSB5

### 1- Criar um frontend inicialmente com duas telas:
* Tela 01: Montar os botões do interfone a partir de um parâmetro (query parameter) contendo a identificação do prédio.
* Tela 02: A partir de um botão da tela 01 apertado, abrir uma nova tela com um form solicitando os dados de quem está chamando e uma mensagem de notificação.

### 2- Cria um backend ( neste exemplo uma API Rest ) inicialmente com 2 operações (sugestão iniciar com o swagger e um mock dos dados.):
* GET /interfone/{idPredio} : consulta de lista de "ramais" do prédio para serem acionados
* POST /interfone/{idPredio}/{idApto}/notificacoes : enviar uma notificação com os dados recebidos (pode ser usado um canal apenas incialmente.)


### 3- Criar casos de testes para frontend e implementar testes automatizados.

### 4- Criar casos de testes para backend e implementar testes automatizados.

### Em breve teremos mais desafios aqui (após a Campus também!!)

Quem estiver na Campus Brasília até dia 08/04 procure pelo Pimenta no período da tarde na bancada da comunidade DevTestsBR que está junto com o Papo De Sysadmin (atrás da área da Coca-Cola na Arena!)
