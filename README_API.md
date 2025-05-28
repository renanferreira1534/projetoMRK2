
# 🛒 IMPORTS MRK - Loja Virtual

<!-- Descrição principal -->
Este é um projeto completo de e-commerce fictício, desenvolvido com **HTML, CSS, JavaScript**, e um **backend em Node.js com Express e MySQL**.

---

## 📌 Funcionalidades

### 🖥️ Frontend
- Página principal com carrossel de banners (`index.html`)
- Catálogo de produtos (`index.html`, `lancamentos.html`, `detalhes.html`, `oferta.html`)
- Cadastro e login de usuários (`cadastrologin.html`, `login.html`)
- Adição de produtos ao carrinho (`carrinho.html`) com `localStorage`
- Finalização de compra com formulário e escolha de pagamento (`finalizar.html`)
- Layout responsivo com arquivos de estilo separados

### 🔙 Backend (Node.js + Express + MySQL)
- API RESTful com rotas para produtos, clientes, login e pedidos
- Integração com banco MySQL (`mrk`)
- Senhas com criptografia `bcrypt`
- Middleware CORS e suporte para JSON

---

## ⚙️ Tecnologias Utilizadas

**Frontend**: HTML, CSS, JS puro, Font Awesome, LocalStorage  
**Backend**: Node.js, Express, MySQL, Bcrypt, Cors  
**Banco de Dados**: Script SQL (`mrk_banco.sql`) com tabelas e relacionamentos

---

## 🗃️ Estrutura do Projeto

```bash
/
├── frontend/
│   ├── index.html                                Página inicial da loja, com destaque para produtos e carrossel
│   ├── login.html                                Página de login para clientes já registrados
│   ├── cadastrologin.html                        Tela de cadastro de novos usuários
│   ├── carrinho.html                             Visualização do carrinho com produtos e total de compra
│   ├── finalizar.html                            Etapa de checkout: preenchimento de endereço e forma de pagamento
│   ├── detalhes.html                             Detalhes de um produto específico (imagens, descrição, etc.)
│   ├── lancamentos.html                          Lista de novos produtos (novos lançamentos)
│   ├── cadastrarPD.html                          Tela para cadastro de novos produtos (uso administrativo)
│   ├── oferta.html                               Página para promoções e ofertas (ainda em teste)
│   ├── style.css                                 Arquivos principais de estilos visuais (cores, fontes, layout)
│   ├── style2.css                                Estilo específico do carrinho e layouts adicionais
│   ├── styles.css                                Estilo específico do carrinho e layouts adicionais
│   ├── style-cadastroPD.css                      Estilo específico da página de cadastro de produtos
│   ├── finalizar.css                             Estilo da tela de finalização de compras
│   └── assets/                                   Pasta com imagens (como prints usados no README)
│       ├── home.png
│       ├── detalhe.png
│       ├── login.png
│
├── backend/
│   ├── index.js                                  Principal arquivo do servidor Express (rotas, conexões, lógica de API)
│   ├── package.json                              Lista de dependências e scripts do projeto Node.js
│   ├── package-lock.json                         Registro detalhado das versões instaladas (gerado pelo npm)
│   ├── .gitignore                                Arquivos e pastas ignorados pelo Git (ex: node_modules)
│
├── database/
│   ├── mrk_banco.sql                             Criação de tabelas cliente, produto, compra, pagamento, com seus relacionamentos
```

---

## ▶️ Como Executar

### Backend

```bash
cd backend
npm install
npm start (nodemon)
```

Servidor: `http://127.0.0.1:3000`

> Importar o banco de dados via `mrk_banco.sql`.

### Frontend

Abrir qualquer arquivo HTML diretamente no navegador, ou usar Live Server no VSCode.

---

## 🖼️ Capturas de Tela

### Página Inicial
![Página Inicial](images/111%20(2).png)

### Detalhes do Produto
![Detalhes do Produto](images/111%20(1).png)

### Tela de Login
![Login](images/111%20(3).png)

---

## 🧑‍💻 Autor

Desenvolvido por **[Renan ferreira e Marcos Victor]** — projeto educacional de e-commerce com Node e frontend puro.
