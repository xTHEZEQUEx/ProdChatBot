<?php
//File required
require 'conexion_nicolas.php';
// Database credentials
$servername = "localhost";
$username = "sakashima";
$password = "1031540877";
$dbname = "chatbotscn";
global $table;
$table = "camposformulario";

// Establish database connection
// $conn = new mysqli($servername, $username, $password, $dbname,$table); //Quitar el table en dado caso

// Check connection
// if ($conn->connect_error) {
//     die("Conexión fallida: " . $conn->connect_error);
// }

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the form data
    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $telefono = $_POST["telefono"];

    // Prepare the SQL query (Note: Using prepared statements is recommended for security)
    $sql = "INSERT INTO $table (nombre, correo, telefono) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $nombre, $correo, $telefono);

    if ($stmt->execute()) {
        // If the data was inserted successfully, send a success response
        $response = array("status" => "success", "message" => "Datos guardados correctamente.");
        echo json_encode($response);
    } else {
        // If there was an error in the query, send an error response
        $response = array("status" => "error", "message" => "Error al guardar los datos: " . $stmt->error);
        echo json_encode($response);
    }

    // Close the prepared statement
    $stmt->close();
} else {
    // If the form was not submitted via POST, return an error response
    $response = array("status" => "error", "message" => "Form data was not submitted");
    echo json_encode($response);
}
// Close the database connection
$conn->close();
?>
