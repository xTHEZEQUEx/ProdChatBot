<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// require 'conexion_nicolas.php'; 

// $query = "SELECT * FROM camposformulario";
// $result = mysqli_query($conn, $query);

// if (mysqli_num_rows($result) > 0) {
//     $docu = "detalles.xls";


//     header('Content-type: application/vnd.ms-excel');
//     header('Content-Disposition: attachment; filename=' . $docu);
//     header('Pragma: no-cache');
//     header('Expires: 0');


//     echo '<table border=1>';
//     echo '<tr>';
//     echo '<th colspan=3>Usuarios registrados en chatbot</th>';
//     echo '</tr>';
//     echo '<tr><th>Nombre</th><th>Correo</th><th>Telefono</th></tr>';
//     while ($row = mysqli_fetch_array($result)) {
//         echo '<tr>';
//         echo '<td>' . (isset($row['nombre']) ? $row['nombre'] : '') . '</td>';
//         echo '<td>' . (isset($row['correo']) ? $row['correo'] : '') . '</td>';
//         echo '<td>' . (isset($row['telefono']) ? $row['telefono'] : '') . '</td>';
//         echo '</tr>';
//     }
//     echo '</table>';
//     exit(); 
// } else {
//     echo 'No data available in the table.';
// }


error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'conexion_nicolas.php'; 

$query = "SELECT * FROM camposformulario";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    $docu = "detalles.csv";

    header('Content-type: text/csv');
    header('Content-Disposition: attachment; filename=' . $docu);
    header('Pragma: no-cache');
    header('Expires: 0');

    $output = fopen('php://output', 'w');

    // Output header row
    fputcsv($output, ['Nombre', 'Correo', 'Telefono']);

    // Output data rows
    while ($row = mysqli_fetch_assoc($result)) {
        fputcsv($output, $row);
    }

    fclose($output);
    exit();
} else {
    echo 'No data available in the table.';
}
?>
