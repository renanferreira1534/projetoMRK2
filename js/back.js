function listar(){
    fetch("http://127.0.0.1:3000/produto/listar")
    .then((rs)=>rs.json())
    .then((dados)=>{
       const product_grid=document.getElementsByClassName("product-grid")[0]
       let produtos=""
       dados.msg.map((prod)=>{
        produtos+=`<div class="product-card scroll-animation">
                <img src="${prod.foto}" class="product-image" alt="conjuntonike">
                <div class="product-info">
                    <h3 class="product-title">${prod.nome}</h3>
                    <p class="product-price">${prod.preco}</p>
                </div>
            </div> `
       })
       product_grid.innerHTML=produtos
    })
    .catch((e)=>console.error(e))
}