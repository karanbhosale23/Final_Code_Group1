package com.example.gstapp.exception;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .findFirst()
                .orElse("Invalid input");
        return ResponseEntity.badRequest().body(errorMessage);
    }
    
   @ExceptionHandler(UsernameNotFoundException.class)
   public ResponseEntity<String> handleUsernameNotFoundException(UsernameNotFoundException ex) {
       return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
   }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        String msg = ex.getMessage() != null ? ex.getMessage() : "Bad request";
        if (msg.toLowerCase().contains("expired password reset token")) {
            return ResponseEntity.status(HttpStatus.GONE).body("Expired password reset token"); // 410 Gone
        }
        if (msg.toLowerCase().contains("invalid password reset token")) {
            return ResponseEntity.badRequest().body("Invalid password reset token"); // 400
        }
        return ResponseEntity.badRequest().body(msg);
    }
}
