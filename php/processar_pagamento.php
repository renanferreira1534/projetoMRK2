<?php

// Conexão com o banco
$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "lojamrk"; // Substitua pelo nome real do seu banco

$conn = new mysqli($host, $usuario, $senha, $banco);

// Verifica conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Recebe dados do formulário
$cpf = $_POST['cpf'];
$telefone = $_POST['telefone'];
$cep = $_POST['cep'];
$cidade = $_POST['cidade'];
$endereco = $_POST['endereco'];
$numero = $_POST['numero'];
$ponto_referencia = $_POST['ponto_referencia'];
$pagamento = $_POST['pagamento']; // 1 = cartão, 2 = pix
$total_pagar = $_POST['total_pagar'];
$id_produto = $_POST['id_produto'];
$id_cliente = $_POST['id_cliente'];

// Dados do cartão (opcional, se for pagamento com cartão)
$numero_cartao = $_POST['numero_cartao'] ?? null;
$nome_cartao = $_POST['nome_cartao'] ?? null;
$validade_cartao = $_POST['validade_cartao'] ?? null;
$cvv = $_POST['cvv'] ?? null;

// Remove "R$" e formata valor
$total_pagar = str_replace(['R$', ',', ' '], ['', '.', ''], $total_pagar);

// Query para inserir no banco
$sql = "INSERT INTO compra (
    cpf, telefone, cep, cidade, endereco, numero, ponto_referencia, forma_pagamento, total, 
    id_produto, id_cliente, numero_cartao, nome_cartao, validade_cartao, cvv
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "ssssssssddisssss",
    $cpf, $telefone, $cep, $cidade, $endereco, $numero, $ponto_referencia,
    $pagamento, $total_pagar, $id_produto, $id_cliente,
    $numero_cartao, $nome_cartao, $validade_cartao, $cvv
);

if ($stmt->execute()) {
    header("Location: ../confirmacao.html");
    exit;
} else {
    echo "Erro ao finalizar pagamento: " . $stmt->error;
}
<?php
// ... lógica de inserção no banco aqui ...

header("Content-Type: application/json");
echo json_encode([
    "status" => "sucesso",
    "mensagem" => "Compra registrada com sucesso."
]);
exit;



$stmt->close();
$conn->close();
?>