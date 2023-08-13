# Desafio - CaixaDaLanchonete
Olá!
Você foi contratado para automatizar o caixa da Lanchonete.
Sua missão será construir a lógica que calcula o valor de uma compra de acordo com o cardápio, regras e descontos da Lanchonete.

## Cardápio
"codigo - descrição - valor":
* cafe - Café - R$ 3,00
* chantily - Chantily (extra do Café) - R$ 1,50
* suco - Suco Natural - R$ 6,20
* sanduiche - Sanduíche - R$ 6,50
* queijo - Queijo (extra do Sanduíche) - R$ 2,00
* salgado - Salgado - R$ 7,25
* combo1 - Suco e 1 Sanduíche - R$ 9,50
* combo2 - Café e 1 Sanduíche - R$ 7,50

# Formas de Pagamento
Atualmente a Lanchonete aceita as seguintes formas de pagamento:
* dinheiro
* debito
* credito

O sistema deve receber essa informação como string, utilizando a grafia exatamente igual aos exemplos acima.

# Descontos e Taxas

* Pagamento em dinheiro tem 5% de desconto

* Pagamento a crédito tem acréscimo de 3% no valor total

# Outras regras

* Caso item extra seja informado num pedido que não tenha o respectivo item principal, apresentar mensagem "Item extra não pode ser pedido sem o principal".

* Combos não são considerados como item principal.

* É possível pedir mais de um item extra sem precisar de mais de um principal.

* Se não forem pedidos itens, apresentar mensagem "Não há itens no carrinho de compra!"

* Se a quantidade de itens for zero, apresentar mensagem "Quantidade inválida!".

* Se o código do item não existir, apresentar mensagem "Item inválido!"

* Se a forma de pagamento não existir, apresentar mensagem "Forma de pagamento inválida!"

# Código
O método calcularValorDaCompra recebe dois parâmetros: formaDePagamento e itens , sendo:
* O primeiro uma string com os possíveis valores válidos: debito, credito e dinheiro
* O segundo parâmetro contém uma array dos itens que serão comprados. Cada item é uma string contendo o código do item e a quantidade do mesmo separados por uma vírgula.

EXEMPLO:
['cafe,1','chantily,1']



# Outputs

O retorno do método calcularValorDaCompra deve ser sempre uma string e conteúdo dela pode ser ou o valor total da compra ou uma mensagem de erro conforme as regras descritas anteriormente. O valor da compra deve ser formatado com R$ e decimais separados por vírgula.
Para padronizar a quantidade de decimais, utilize o método toFixed do JavaScript. Esse método serve o propósito deste desafio, porém na vida real a regra de arredondamento deve ser conferida! Para saber mais consulte a Documentação do Number.

# Exemplos

EXEMPLO 1: Compra de chantily sem café. - O resultado esperado deve ser:  "Item extra não pode ser pedido sem o principal"

    new CaixaDaLanchonete()   .calcularValorDaCompra('debito', ['chantily,1']);

EXEMPLO 2: Compra de café com chantily. - O resultado esperado deve ser: "R$ 4,50"

    new CaixaDaLanchonete()   .calcularValorDaCompra('debito', ['cafe,1','chantily,1']);



EXEMPLO 3: Compra de combo e dois cafés. -  O resultado esperado deve ser: "R$ 15,96"

    new CaixaDaLanchonete()   .calcularValorDaCompra('credito', ['combo1,1','cafe,2']);




