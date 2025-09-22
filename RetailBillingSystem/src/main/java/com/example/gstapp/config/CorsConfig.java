package com.example.gstapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration cors = new CorsConfiguration();
        cors.setAllowCredentials(true);

        // Allow your dev frontend origins
        cors.setAllowedOrigins(Arrays.asList(
                "http://localhost:8081",   // metro/expo
                "http://localhost:19006",  // expo web (newer)
                "http://192.168.1.49:19000",
                "http://192.168.1.49:19006"
        ));

        // Additionally allow common localhost/LAN patterns during development
        cors.setAllowedOriginPatterns(Arrays.asList(
                "http://localhost:*",
                "http://127.0.0.1:*",
                "http://192.168.*:*"
        ));

        cors.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization"));
        cors.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);

        return new CorsFilter(source);
    }
}


