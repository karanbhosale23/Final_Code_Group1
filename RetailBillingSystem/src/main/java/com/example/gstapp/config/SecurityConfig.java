package com.example.gstapp.config;

import com.example.gstapp.service.CustomUserDetailsService;
import com.example.gstapp.util.JwtFilter;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        // Allow register, login, forgot-password, reset-password without authentication
                        .requestMatchers(
                                "/api/v1/auth/register",
                                "/api/v1/auth/login",
                                "/api/v1/auth/forgot-password",
                                "/api/v1/auth/reset-password",
                                "/api/v1/auth/validate-reset-token")
                        .permitAll()

                        // Allow specific user profile endpoints without authentication (temporary)
                        .requestMatchers(HttpMethod.GET, "/api/v1/auth/user/*")
                        .permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/v1/auth/user/*")
                        .permitAll()

                        // Token validation requires authentication
                        .requestMatchers("/api/v1/auth/validate")
                        .authenticated()

                        // Allow admin access to user management endpoints
                        .requestMatchers(HttpMethod.GET, "/api/v1/users/**").hasRole("ADMIN")

                        // Allow both ADMIN and MERCHANT roles to access sales reports
                        .requestMatchers("/api/v1/reports/**").hasAnyRole("ADMIN", "MERCHANT")

                        // All other requests require authentication
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
