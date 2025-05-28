
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
│   ├── index.html
│   ├── login.html
│   ├── cadastrologin.html
│   ├── carrinho.html
│   ├── finalizar.html
│   ├── detalhes.html
│   ├── lancamentos.html
│   ├── cadastrarPD.html
│   ├── oferta.html
│   ├── style.css
│   ├── style2.css
│   ├── styles.css
│   ├── style-cadastroPD.css
│   ├── finalizar.css
│   └── assets/
│       ├── home.png
│       ├── detalhe.png
│       ├── login.png
│
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .gitignore
│
├── database/
│   ├── mrk_banco.sql
```

---

## ▶️ Como Executar

### Backend

```bash
cd backend
npm install
npm start
```

Servidor: `http://127.0.0.1:3000`

> Importar o banco de dados via `mrk_banco.sql`.

### Frontend

Abrir qualquer arquivo HTML diretamente no navegador, ou usar Live Server no VSCode.

---

## 🖼️ Capturas de Tela

### Página Inicial
![Página Inicial](assets/home.png)

### Detalhes do Produto
![Detalhes do Produto](assets/detalhe.png)

### Tela de Login
![Login](assets/login.png)

<!-- Você pode adicionar outras imagens abaixo no mesmo padrão -->
<!-- Exemplo:
### Carrinho
![Carrinho](assets/carrinho.png)
 -->

---

## 💡 Melhorias Futuras

- Admin para controle de produtos
- Integração com APIs de pagamento
- Sessões com JWT
- Upload de imagens para produtos

---

## 🧑‍💻 Autor

Desenvolvido por **[Seu Nome Aqui]** — projeto educacional de e-commerce com Node e frontend puro.
