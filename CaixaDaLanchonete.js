class Item {
  constructor(descricao, valor) {
    this.descricao = descricao;
    this.valor = valor;
  }
}

class Extra extends Item {
  constructor(descricao, valor, referencia) {
    super(descricao, valor);
    this.referencia = referencia;
  }
}

class ItemPedido {
  constructor(item, quantidade) {
    this.item = item;
    this.quantidade = quantidade;
  }
}

class CaixaDaLanchonete {
  constructor() {
    this.itens = {
      cafe: new Item("Café", 3),
      suco: new Item("Suco Natural", 1.5),
      sanduiche: new Item("Sanduíche", 6.5),
      salgado: new Item("Salgado", 7.25),
      chantily: new Extra("Chantily (extra do café)", 1.5, "cafe"),
      queijo: new Extra("Queijo (extra do sanduíche)", 2, "sanduiche"),
      combo1: new Item("Suco e 1 sanduíche", 9.5),
      combo2: new Item("Café e 1 sanduíche", 7.5),
    };

    this.forma_pagamento = ["dinheiro", "debito", "credito"];
  }

  validarExtras(pedido) {
    for (let index in pedido) {
      let itemPedido = pedido[index];
      let item = itemPedido.item;
      if (item instanceof Extra) {
        let referencia = item.referencia;
        let found = 0;
        for (let index in pedido) {
          if (
            this.itens[referencia].descricao == pedido[index].item.descricao
          ) {
            if (itemPedido.quantidade > pedido[index].quantidade) {
              throw new Error("Item extra não pode ser pedido sem o principal");
            }
            found = found + 1;
          }
        }
        if (found < 1) {
          throw new Error("Item extra não pode ser pedido sem o principal");
        }
      }
    }
  }

  validarFormaDePagamento(string) {
    let found = 0;
    for (let index in this.forma_pagamento) {
      if (this.forma_pagamento[index] == string) {
        found++;
      }
    }
    if (found < 1) {
      throw new Error("Forma de pagamento inválida!");
    }
  }

  criarPedido(stringArray) {
    let pedido = [];
    for (let index in stringArray) {
      let arr = stringArray[index].split(",");
      let itemPedido = new ItemPedido(this.itens[arr[0]], arr[1]);
      pedido.push(itemPedido);
    }
    return pedido;
  }

  calcularValorDoPedido(pedido) {
    let valorFinal = 0;
    for (let index in pedido) {
      let item = pedido[index];
      let valorItem = item.quantidade * item.item.valor;
      valorFinal += valorItem;
    }
    return valorFinal;
  }

  calcularDescontoOuAcrescimo(pgto, valor) {
    switch (pgto) {
      case "dinheiro":
        let desconto = valor * 0.05;
        return valor - desconto;
        break;
      case "credito":
        let acrescimo = valor * 0.03;
        return valor + acrescimo;
      default:
        return valor;
    }
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    try {
      let pedido = this.criarPedido(itens);
      this.validarFormaDePagamento(formaDePagamento);
      this.validarExtras(pedido);
      let valorFinal = this.calcularValorDoPedido(pedido);
      valorFinal = this.calcularDescontoOuAcrescimo(
        formaDePagamento,
        valorFinal
      );
      valorFinal = valorFinal.toFixed(2);
      console.log("R$ %f", valorFinal);
    } catch (e) {
      console.log(e.message);
    }
  }

  calcularValorDaCompraSaidaJson(formaDePagamento, itens) {
    try {
      let pedido = this.criarPedido(itens);
      this.validarFormaDePagamento(formaDePagamento);
      this.validarExtras(pedido);
      let valorFinal = this.calcularValorDoPedido(pedido);
      valorFinal = this.calcularDescontoOuAcrescimo(
        formaDePagamento,
        valorFinal
      );
      for (let i in pedido) {
        pedido[i] = {
          ...pedido[i],
          valorItem: pedido[i].quantidade * pedido[i].item.valor,
        };
      }
      valorFinal = valorFinal.toFixed(2);
      let out = { pedido: pedido, valor: valorFinal };
      console.log(JSON.stringify(out));
    } catch (e) {
      console.log(e.message);
    }
  }
}

new CaixaDaLanchonete().calcularValorDaCompra("debito", ["chantily,1"]);
new CaixaDaLanchonete().calcularValorDaCompra("debito", [
  "cafe,1",
  "chantily,1",
]);
new CaixaDaLanchonete().calcularValorDaCompra("credito", [
  "combo1,1",
  "cafe,2",
]);

new CaixaDaLanchonete().calcularValorDaCompraSaidaJson("debito", [
  "cafe,2",
  "suco,2",
  "sanduiche,2",
  "salgado,2",
  "chantily,2",
  "queijo,2",
  "combo1,2",
  "combo2,2",
]);
