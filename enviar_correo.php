<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $asunto = $_POST["asunto"];
    $mensaje = $_POST["mensaje"];
    $destinatario = "danielfigueroa1879@gmail.com";
    $cuerpo = "Nombre: " . $nombre . "\nEmail: " . $email . "\nTeléfono: " . $telefono . "\nAsunto: " . $asunto . "\nMensaje: " . $mensaje;
    mail($destinatario, $cuerpo);
    echo "¡Mensaje enviado!";
}
?>
