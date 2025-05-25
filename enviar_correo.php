<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $mensaje = $_POST["mensaje"];
    $destinatario = "danielfigueroa1879@gmail.com";
    $asunto = "Nuevo mensaje del formulario de contacto";
    $cuerpo = "Nombre: " . $nombre . "\nCorreo: " . $correo . "\nMensaje: " . $mensaje;
    mail($destinatario, $asunto, $cuerpo);
    echo "¡Mensaje enviado!";
}
?>
