package com.maxdev.plaxbackend.modules.Security.Configuration;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component // This annotation is used to mark the class as a Spring Bean
@RequiredArgsConstructor // Lombok will generate a constructor with all the required arguments
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    // This class will be used to intercept the incoming requests and validate the JWT token
    // It extends the OncePerRequestFilter class which ensures that the filter is only applied once per request
    // The filter will be applied to all incoming requests

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
    }

}
