package com.example.gstapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.frontend.base-url:http://localhost:8081}")
    private String frontendBaseUrl;

    // Add from address and logger
    @Value("${spring.mail.username:}")
    private String fromAddress;

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    public void sendResetEmail(String toEmail, String token) {
        try {
            String base = frontendBaseUrl != null ? frontendBaseUrl.replaceAll("/+$", "") : "http://localhost:8081";
            String resetUrl = base + "/reset-password?token=" + token;

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            if (fromAddress != null && !fromAddress.isBlank()) {
                message.setFrom(fromAddress);
            }
            message.setSubject("Password Reset Request");
            message.setText("To reset your password, click the following link:\n" + resetUrl);
            mailSender.send(message);
            log.info("Password reset email sent to {}", toEmail);
        } catch (Exception e) {
            // Do not break the flow in development; just log the failure
            log.error("Failed to send password reset email to {}: {}", toEmail, e.getMessage(), e);
        }
    }
}
