package com.example.gstapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.frontend.base-url:http://localhost:8081}")
    private String frontendBaseUrl;

    public void sendResetEmail(String toEmail, String token) {
        String base = frontendBaseUrl != null ? frontendBaseUrl.replaceAll("/+$", "") : "http://localhost:8081";
        String resetUrl = base + "/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, click the following link:\n" + resetUrl);
        mailSender.send(message);
    }
}
