<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

$conn = new mysqli("localhost", "usuario", "senha", "nome_do_banco");

if ($conn->connect_error) {
    echo json_encode(["status" => "erro", "mensagem" => "Erro na conexão: " . $conn->connect_error]);
    exit;
}

// Proteção básica contra SQL Injection
$cpf = $conn->real_escape_string($_POST['cpf'] ?? '');
$telefone = $conn->real_escape_string($_POST['telefone'] ?? '');
$cep = $conn->real_escape_string($_POST['cep'] ?? '');
$cidade = $conn->real_escape_string($_POST['cidade'] ?? '');
$endereco = $conn->real_escape_string($_POST['endereco'] ?? '');
$numero = $conn->real_escape_string($_POST['numero'] ?? '');
$ponto_referencia = $conn->real_escape_string($_POST['ponto_referencia'] ?? '');
$pagamento = $conn->real_escape_string($_POST['pagamento'] ?? '');
$id_produto = (int) ($_POST['id_produto'] ?? 0);
$id_cliente = (int) ($_POST['id_cliente'] ?? 0);

$sql = "INSERT INTO compra (cpf, telefone, cep, cidade, endereco, numero, ponto_referencia, pagamento, id_produto, id_cliente)
        VALUES ('$cpf', '$telefone', '$cep', '$cidade', '$endereco', '$numero', '$ponto_referencia', '$pagamento', $id_produto, $id_cliente)";

if ($conn->query($sql)) {
    echo json_encode(["status" => "sucesso"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => $conn->error]);
}

$conn->close();

?>
