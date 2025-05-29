<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Método não permitido
    echo "Método não permitido.";
    exit;
}

// Conexão com o banco
$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "lojamrk";

$conn = new mysqli($host, $usuario, $senha, $banco);

// Verifica conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Recebe dados do formulário
$cpf = $_POST['cpf'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$cep = $_POST['cep'] ?? '';
$cidade = $_POST['cidade'] ?? '';
$endereco = $_POST['endereco'] ?? '';
$numero = $_POST['numero'] ?? '';
$ponto_referencia = $_POST['ponto_referencia'] ?? '';
$pagamento = $_POST['pagamento'] ?? ''; // 1 = cartão, 2 = pix
$total_pagar = $_POST['total_pagar'] ?? '0.00';
$id_produto = $_POST['id_produto'] ?? 0;
$id_cliente = $_POST['id_cliente'] ?? 0;

// Campos de cartão
$numero_cartao = $_POST['numero_cartao'] ?? '';
$nome_cartao = $_POST['nome_cartao'] ?? '';
$validade_cartao = $_POST['validade_cartao'] ?? '';
$cvv = $_POST['cvv'] ?? '';
$pixPG = ($pagamento === "2") ? "@lojamrk.com" : ''; 

// Remove "R$" e substitui vírgula por ponto
$total_pagar = str_replace(['R$', '.', ','], ['', '', '.'], $total_pagar);
$total_pagar = floatval($total_pagar);

// Define forma de pagamento para salvar: '1' = cartão, '2' = pix
$formaPG = $pagamento;

// Monta e executa a query
$sql = "INSERT INTO com
