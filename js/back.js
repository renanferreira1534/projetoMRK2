// LISTAR PRODUTO -----------------------
function listar() {
  fetch("http://127.0.0.1:3000/produto/listar")
    .then((rs) => rs.json())
    .then((dados) => {
      const product_grid = document.getElementsByClassName("product-grid")[0];
      let produtos = "";
      dados.msg.map((prod) => {
        produtos += `<a href="detalhes.html?id_produto=${prod.id}">
        <div class="product-card scroll-animation">
                <img src="${prod.imagem}" class="product-image" alt="conjuntonike">
                <div class="product-info">
                    <h3 class="product-title">${prod.nome}</h3>
                    <p class="product-price">${prod.preco}</p>
                </div>
            </div> </a>`;
      });
      product_grid.innerHTML = produtos;
    })
    .catch((e) => console.error(e));
}

// PESQUISAR PRODUTO -------------------------------
function pesquisar() {
  fetch("http://127.0.0.1:3000/produto/pesquisar/" + document.getElementById("input-search").value)
    .then((rs) => rs.json())
    .then((dados) => {
      const product_grid = document.getElementsByClassName("product-grid")[0];
      let produtos = "";
      dados.msg.map((prod) => {
        produtos += `<a href="detalhes.html?id_produto=${prod.id}">
        <div class="product-card scroll-animation">
                <img src="${prod.imagem}" class="product-image" alt="conjuntonike">
                <div class="product-info">
                    <h3 class="product-title">${prod.nome}</h3>
                    <p class="product-price">${prod.preco}</p>
                </div>
            </div> </a>`;
      });
      product_grid.innerHTML = produtos;
    })
    .catch((e) => console.error(e));
}



// DETALHES DE PRODUTO ----------------------------
function detalhes() {
  const urlParams = window.location.search;
  const id = urlParams.substring(12, urlParams.length);

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

      const prod = dados.msg[0];

      document.getElementById("ProdutoImg").src = prod.imagem || "";
      document.getElementById("nome-produto").textContent = prod.nome || "Sem nome";
      document.getElementById("preco-produto").textContent = "R$ " + (prod.preco || "0,00");
      document.getElementById("categoria").textContent = "Categoria: " + (prod.categoria || "Indefinida");
      document.getElementById("descricao-produto").textContent = prod.descricao || "Sem descrição.";

      const galeria = document.getElementById("galeria-imgs");
      galeria.innerHTML = "";

      const imagens = [prod.foto1, prod.foto2, prod.foto3, prod.foto4].filter(Boolean);

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
  const nProduto = document.getElementById("nome");
  const categoria = document.getElementById("categoria");
  const tamanho = document.getElementById("tamanho");
  const preco = document.getElementById("preco");
  const descricao = document.getElementById("descricao");
  const imagem = document.getElementById("imagem");
  const estoque = document.getElementById("estoque");
  const foto1 = document.getElementById("foto1");
  const foto2 = document.getElementById("foto2");
  const foto3 = document.getElementById("foto3");
  const foto4 = document.getElementById("foto4");

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
      console.log(rs);
    })
    .catch((error) => console.error(error));
}




// PAGAMENTO ----------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const selectPagamento = document.getElementById("formaPG");
  const cartaoInfo = document.getElementById("cartao-info");
  const pixInfo = document.getElementById("pix-info");
  const campoTotal = document.getElementById("total_pagar");
  const bnt_pagar = document.querySelector("btn-pagar");
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

  const total = localStorage.getItem("totalCompra") || "0.00";
  const totalFormatado = `R$ ${parseFloat(total).toFixed(2).replace(".", ",")}`;
  if (campoTotal) campoTotal.value = totalFormatado;

  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData
        });

      const text = await response.text();
      console.log("Resposta do servidor :", text);
      // alert("✅ Compra finalizada !");


        const tipo = selectPagamento.value;
        let forma = "";

        if (tipo === "1") forma = "credito";
        else if (tipo === "2") forma = "pix";
        else return alert("Escolha uma forma de pagamento!");

      const apiResponse = await fetch("http://127.0.0.1:3000/compra/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({

          formaPG: forma,
          cpf: document.getElementById("cpf").value,
          telefone: document.getElementById("telefone").value,
          cep: document.getElementById("cep").value,
          cidade: document.getElementById("cidade").value,
          endereco: document.getElementById("endereco").value,
          numero: document.getElementById("numero").value,
          ponto_referencia: document.getElementById("ponto_referencia").value,
          total_pagar: document.getElementById("total_pagar").value,
          numeroCard: document.getElementById("numero_cartao").value,
          nomeCard: document.getElementById("nome_cartao").value,
          validadeCard: document.getElementById("validade_cartao").value,
          cvvCard: document.getElementById("cvv").value,
          pixPG: document.getElementById("pix-info").value
          
          
        })
      });

      const dados = await apiResponse.json();
      console.log("Resposta da API:", dados);

        form.reset();
        document.getElementById("total_pagar").value = "R$ 0,00";
        window.location.href = "index.html";  
        alert("compra bem sucedida aguarde o email")
        
        form.reset();
      document.getElementById("total_pagar").value = "R$ 0,00";

      // Limpa o carrinho e o total
      localStorage.removeItem("carrinho");
      localStorage.removeItem("totalCompra");

      // Redireciona para a página inicial
      window.location.href = "index.html";


      } catch (error) {
        console.error("Erro:", error);
        // alert("❌ Erro ao finalizar compra.");

        
      }
    });
  }
});
