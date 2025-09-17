// src/main/java/com/example/gstapp/service/AuthService.java
package com.example.gstapp.service;

import com.example.gstapp.dto.AuthRequestDTO;
import com.example.gstapp.dto.AuthResponseDTO;
import com.example.gstapp.dto.RegisterRequestDTO;
import com.example.gstapp.exception.AppException;
import com.example.gstapp.model.User;
import com.example.gstapp.model.User.Role;
import com.example.gstapp.repository.UserRepository;
import com.example.gstapp.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private static final String PEPPER = System.getenv("PASSWORD_PEPPER");

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    // Register new user
    public void register(RegisterRequestDTO request) {
        String rawPassword = request.getPassword();

        // Password strength validation
        if (!isValidPassword(rawPassword)) {
            throw new AppException("Password does not meet security criteria. It must be at least 8 characters long and include uppercase letters, digits, and special characters.");
        }

        // Check if username or email already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException("Username already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException("Email already in use");
        }

        // Append pepper if present
        String passwordWithPepper = rawPassword + (PEPPER != null ? PEPPER : "");
        String hashedPassword = passwordEncoder.encode(passwordWithPepper);

        // Assign default role MERCHANT if no role is provided
        Role assignedRole = (request.getRole() == null) ? Role.MERCHANT : request.getRole();

        // Build user entity
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(hashedPassword);
        user.setRole(assignedRole);
        user.setBusinessName(request.getBusinessName());
        user.setPhoneNumber(request.getPhoneNumber());

        userRepository.save(user);
    }

    // Password validation method
    private boolean isValidPassword(String password) {
        if (password == null) return false;
        if (password.length() < 8) return false;
        if (!password.matches(".*[A-Z].*")) return false;
        if (!password.matches(".*[0-9].*")) return false;
        if (!password.matches(".*[!@#$%^&*()].*")) return false;
        return true;
    }

    // Authenticate and generate JWT token
    public AuthResponseDTO authenticate(AuthRequestDTO request) {
        // Append pepper if present
        String passwordWithPepper = request.getPassword() + (PEPPER != null ? PEPPER : "");

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                passwordWithPepper));

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException("Invalid username or password"));

        String token = jwtUtil.generateToken(user);

        AuthResponseDTO response = new AuthResponseDTO();
        response.setToken(token);
        response.setUsername(user.getUsername());
        response.setRole(user.getRole().name());

        return response;
    }
}
