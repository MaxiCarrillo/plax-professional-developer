package com.maxdev.plaxbackend.modules.Email.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendConfirmationEmail(String firstname, String lastname, String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("¡Bienvenido a Plax!");
        message.setText("Hola " + firstname + " " + lastname + ",\n" +
                "¡Gracias por registrarte en Plax! Ya podés ingresar al sistema haciendo clic en el siguiente enlace:\n\n" +
                "http://localhost:5173/iniciar-sesion" + "\n\n" +
                "¡Nos vemos pronto!\n" +
                "El equipo de Plax");
        mailSender.send(message);
    }

    public void sendConfirmReservation(String firstname, String lastname, String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("¡Reserva confirmada!");
        message.setText("Hola " + firstname + " " + lastname + ",\n" +
                "¡Gracias por reservar en Plax! Tu reserva ha sido confirmada.\n\n" +
                "¡Nos vemos pronto!\n" +
                "El equipo de Plax");
        mailSender.send(message);
    }
}
