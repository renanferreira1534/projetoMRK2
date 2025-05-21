function listar(){
    fetch("http://127.0.0.1:3000/produto/listar")
    .then((rs)=>rs.json())
    .then((dados)=>{
       const product_grid=document.getElementsByClassName("product-grid")[0]
       let produtos=""
       dados.msg.map((prod)=>{
        produtos+=`<a href="detalhes.html?id_produto=${prod.id_produto}">
        <div class="product-card scroll-animation">
                <img src="${prod.foto}" class="product-image" alt="conjuntonike">
                <div class="product-info">
                    <h3 class="product-title">${prod.nome}</h3>
                    <p class="product-price">${prod.preco}</p>
                </div>
            </div> </a>`
       })
       product_grid.innerHTML=produtos
    })
    .catch((e)=>console.error(e))
}


function pesquisar(){
    fetch("http://127.0.0.1:3000/produto/pesquisar/"+document.getElementById("input-search").value)
    .then((rs)=>rs.json())
    .then((dados)=>{
       const product_grid=document.getElementsByClassName("product-grid")[0]
       let produtos=""
       dados.msg.map((prod)=>{
        produtos+=`<a href="detalhes.html?id_produto=${prod.id_produto}">
        <div class="product-card scroll-animation">
                <img src="${prod.foto}" class="product-image" alt="conjuntonike">
                <div class="product-info">
                    <h3 class="product-title">${prod.nome}</h3>
                    <p class="product-price">${prod.preco}</p>
                </div>
            </div> </a>`
       })
       product_grid.innerHTML=produtos
    })
    .catch((e)=>console.error(e))
}

function detalhes() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id_produto");
  
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
  
        // Preenche informações
        document.getElementById("ProdutoImg").src = prod.foto || "";
        document.getElementById("nome-produto").textContent = prod.nome || "Sem nome";
        document.getElementById("preco-produto").textContent = "R$ " + (prod.preco || "0,00");
        document.getElementById("categoria").textContent = "Categoria: " + (prod.categoria || "Indefinida");
        document.getElementById("descricao-produto").textContent = prod.descricao || "Sem descrição.";
  
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
  
  


function cadastrar(){
    const nProduto =document.getElementById("nome")
    const categoria =document.getElementById("categoria")
    const tamanho =document.getElementById("tamanho")
    const preco =document.getElementById("preco")
    const descricao =document.getElementById("descricao")
    const imagem =document.getElementById("imagem")
    const estoque =document.getElementById("estoque")
    const foto1 =document.getElementById("foto1")
    const foto2 =document.getElementById("foto2")
    const foto3 =document.getElementById("foto3")
    const foto4 =document.getElementById("foto4")
    
    fetch("http://127.0.0.1:3000/produto/cadastrar",{
        method:"POST",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            nome: nProduto.value,
            descricao: descricao.value,
            preco: preco.value,
            tamanho: tamanho.value,
            foto:imagem.value,
            categoria:categoria.value
        })
    })
    .then((res)=>res.json())
    .then((rs)=>{
        // alert(rs.msg)
        console.log(rs)
    })
    .catch((error)=>console.error(error))

    
}

