package com.example.gstapp.service;

import com.example.gstapp.repository.PasswordResetTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PasswordResetCleanupService {

    private static final Logger log = LoggerFactory.getLogger(PasswordResetCleanupService.class);

    private final PasswordResetTokenRepository tokenRepository;

    public PasswordResetCleanupService(PasswordResetTokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    // Run every hour to delete expired tokens
    // Cron: second minute hour day-of-month month day-of-week
    @Scheduled(cron = "0 0 * * * *")
    public void deleteExpiredTokensHourly() {
        LocalDateTime now = LocalDateTime.now();
        long removed = tokenRepository.deleteByExpiryDateBefore(now);
        if (removed > 0) {
            log.info("PasswordResetCleanupService: deleted {} expired password reset tokens.", removed);
        }
    }
}
