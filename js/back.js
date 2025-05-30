// LISTAR PRODUTO -----------------------
function listar() {
  fetch("http://127.0.0.1:3000/produto/listar")
    .then((rs) => rs.json())
    .then((dados) => {
      const product_grid = document.getElementsByClassName("product-grid")[0]
      let produtos = ""
      dados.msg.map((prod) => {
        produtos += `<a href="detalhes.html?id_produto=${prod.id}">
        <div class="product-card scroll-animation">
                <img src="${prod.imagem}" class="product-image" alt="conjuntonike">
                <div class="product-info">
                    <h3 class="product-title">${prod.nome}</h3>
                    <p class="product-price">${prod.preco}</p>
                </div>
            </div> </a>`
      })
      product_grid.innerHTML = produtos
    })
    .catch((e) => console.error(e))
}

//PESQUISAR PRODUTO -------------------------------
function pesquisar() {
  fetch("http://127.0.0.1:3000/produto/pesquisar/" + document.getElementById("input-search").value)
    .then((rs) => rs.json())
    .then((dados) => {
      const product_grid = document.getElementsByClassName("product-grid")[0]
      let produtos = ""
      dados.msg.map((prod) => {
        produtos += `<a href="detalhes.html?id_produto=${prod.id_produto}">
        <div class="product-card scroll-animation">
                <img src="${prod.foto}" class="product-image" alt="conjuntonike">
                <div class="product-info">
                    <h3 class="product-title">${prod.nome}</h3>
                    <p class="product-price">${prod.preco}</p>
                </div>
            </div> </a>`
      })
      product_grid.innerHTML = produtos
    })
    .catch((e) => console.error(e))
}

// DETALHES DE PRODUTO ----------------------------
function detalhes() {
  const urlParams = window.location.search;
  const id = urlParams.substring(12, urlParams.length)
  console.log(id)

  if (!id) {
    console.error("ID do produto não encontrado na URL.");
    return;
  }

  fetch(`http://127.0.0.1:3000/produto/detalhes/${id}`)
    .then((res) => res.json())
    .then((dados) => {
      if (!dados || !dados.msg || dados.msg.length === 0) {
        console.error("Produto não encontrado.");
        return;
      }

      console.log = dados.msg;


      // Preenche informações
      document.getElementById("ProdutoImg").src = dados.msg[0].imagem || "";
      document.getElementById("nome-produto").textContent = dados.msg[0].nome || "Sem nome";
      document.getElementById("preco-produto").textContent = "R$ " + (dados.msg[0].preco || "0,00");
      document.getElementById("categoria").textContent = "Categoria: " + (dados.msg[0].categoria || "Indefinida");
      document.getElementById("descricao-produto").textContent = dados.msg[0].descricao || "Sem descrição.";

      // Galeria
      const galeria = document.getElementById("galeria-imgs");
      galeria.innerHTML = "";

      const imagens = prod.fotos && prod.fotos.length > 0 ? prod.fotos : [];

      // Sempre mostrar 4 miniaturas (reais ou placeholders)
      for (let i = 0; i < 4; i++) {
        const url = imagens[i] || "https://via.placeholder.com/80x80?text=+";
        const img = document.createElement("img");
        img.src = url;
        img.alt = `Miniatura ${i + 1}`;
        img.style.opacity = imagens[i] ? "1" : "0.3";
        img.onclick = () => {
          if (imagens[i]) {
            document.getElementById("ProdutoImg").src = imagens[i];
          }
        };
        galeria.appendChild(img);
      }
    })
    .catch((e) => console.error("Erro ao carregar produto:", e));
}



// CADASTRAR PRODUTO ----------------------------------
function cadastrar() {
  const nProduto = document.getElementById("nome")
  const categoria = document.getElementById("categoria")
  const tamanho = document.getElementById("tamanho")
  const preco = document.getElementById("preco")
  const descricao = document.getElementById("descricao")
  const imagem = document.getElementById("imagem")
  const estoque = document.getElementById("estoque")
  const foto1 = document.getElementById("foto1")
  const foto2 = document.getElementById("foto2")
  const foto3 = document.getElementById("foto3")
  const foto4 = document.getElementById("foto4")

  fetch("http://127.0.0.1:3000/produto/cadastrar", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      nome: nProduto.value,
      descricao: descricao.value,
      preco: preco.value,
      tamanho: tamanho.value,
      imagem: imagem.value,
      categoria: categoria.value,
      estoque: estoque.value,
      foto1: foto1.value,
      foto2: foto2.value,
      foto3: foto3.value,
      foto4: foto4.value
    })
  })
    .then((res) => res.json())
    .then((rs) => {
      // alert(rs.msg)
      console.log(rs)
    })
    .catch((error) => console.error(error))


}

document.addEventListener("DOMContentLoaded", function () {
  const selectPagamento = document.getElementById("formaPG");
  const cartaoInfo = document.getElementById("cartao-info");
  const pixInfo = document.getElementById("pix-info");
  const campoTotal = document.getElementById("total_pagar");
  const botaoFinalizar = document.querySelector(".btn-pagar");
  const camposCartao = [
    document.getElementById("numero_cartao"),
    document.getElementById("nome_cartao"),
    document.getElementById("validade_cartao"),
    document.getElementById("cvv")
  ];

  function habilitarCampos(campoArray, habilitar) {
    campoArray.forEach(input => {
      if (input) {
        input.disabled = !habilitar;
        input.required = habilitar;
      }
    });
  }

  // Mostrar/esconder campos conforme forma de pagamento
  if (selectPagamento) {
    selectPagamento.addEventListener("change", function () {
      const tipo = this.value;
      cartaoInfo.style.display = "none";
      pixInfo.style.display = "none";
      habilitarCampos(camposCartao, false);

      if (tipo === "1") {
        cartaoInfo.style.display = "block";
        habilitarCampos(camposCartao, true);
      } else if (tipo === "2") {
        pixInfo.style.display = "block";
      }
    });
  }

  // Preenche o total do localStorage
  const total = localStorage.getItem("totalCompra") || "0.00";
  const totalFormatado = `R$ ${parseFloat(total).toFixed(2).replace(".", ",")}`;
  if (campoTotal) campoTotal.value = totalFormatado;

  // SUBMIT DO FORMULÁRIO
  document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      // Envio para processar_pagamento.php
      const response = await fetch(form.action, {
        method: "POST",
        body: formData
      });

      const text = await response.text();
      console.log("Resposta do servidor PHP:", text);
      alert("✅ Compra finalizada no servidor PHP!");

      // Envio para a API (localhost:3000)
      const tipo = selectPagamento.value;
      let forma = "";

      if (tipo === "1") forma = "credito";
      else if (tipo === "2") forma = "pix";
      else return alert("Escolha uma forma de pagamento!");

      const apiResponse = await fetch("http://127.0.0.1:3000/compra/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_compra: 10, // substitua pelo ID real se necessário
          forma_pagamento: forma,
          status_pagamento: "Aprovado"
        })
      });

      const dados = await apiResponse.json();
      console.log("Resposta da API:", dados);
      alert("✅ Compra também registrada na API!");

      form.reset();
      document.getElementById("total_pagar").value = "R$ 0,00";

    } catch (error) {
      console.error("Erro:", error);
      alert("❌ Erro ao finalizar compra.");
    }
  });
});
