<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $mensaje = $_POST["mensaje"];
    $destinatario = "danielfigueroa1879@gmail.com";
    $asunto = "Nuevo mensaje del formulario de contacto";
    $cuerpo = "Nombre: " . $nombre . "\nEmail: " . $email . "\nTeléfono: " . $telefono . "\nMensaje: " . $mensaje;
    mail($destinatario, $asunto, $cuerpo);
    echo "¡Mensaje enviado!";
}
?>
