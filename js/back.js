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

function cadastrar(){
    const nProduto =document.getElementById("nome")
    const categoria =document.getElementById("categoria")
    const tamanho =document.getElementById("tamanho")
    const preco =document.getElementById("preco")
    const descricao =document.getElementById("descricao")
    const imagem =document.getElementById("imagem")
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