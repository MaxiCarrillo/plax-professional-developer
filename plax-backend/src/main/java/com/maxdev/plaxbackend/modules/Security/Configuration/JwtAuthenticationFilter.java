package com.maxdev.plaxbackend.modules.Security.Configuration;

import java.io.IOException;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.maxdev.plaxbackend.modules.Security.Service.JwtService;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Log4j2
@Component // This annotation is used to mark the class as a Spring Bean
@RequiredArgsConstructor // Lombok will generate a constructor with all the required arguments
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    // This class will be used to intercept the incoming requests and validate the
    // JWT token
    // It extends the OncePerRequestFilter class which ensures that the filter is
    // only applied once per request
    // The filter will be applied to all incoming requests
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException, ExpiredJwtException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return; // Si no hay token, se continúa con la cadena de filtros
        }

        jwt = authHeader.substring(7);
        try {
            userEmail = jwtService.extractUsername(jwt);
        } catch (ExpiredJwtException e) {
            log.error("JWT token has expired");
            response.setStatus(HttpStatus.UNAUTHORIZED.value()); // 401 Unauthorized
            return;
        }
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            log.info("Validating JWT token for user: {}", userEmail);
            try {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

                if (!jwtService.isTokenValid(jwt, userDetails)) {
                    response.setStatus(HttpStatus.UNAUTHORIZED.value()); // 401 si el token es inválido
                    return;
                }

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            } catch (ExpiredJwtException e) {
                response.setStatus(HttpStatus.UNAUTHORIZED.value()); // 401 Unauthorized
                return;
            } catch (Exception e) {
                response.setStatus(HttpStatus.FORBIDDEN.value()); // 403 Forbidden en caso de otros errores
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

}
