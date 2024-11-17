package com.maxdev.plaxbackend.modules.Security.Configuration;

import com.maxdev.plaxbackend.modules.User.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers(HttpMethod.GET,
                                        "/swagger-ui/**",
                                        "/v3/api-docs/**",
                                        "/swagger-ui.html",
                                        "/api/stays/**",
                                        "/api/categories/**",
                                        "/api/features/**"
                                ).permitAll()
                                .requestMatchers(HttpMethod.POST,
                                        "/api/stays/**",
                                        "/api/categories/**",
                                        "/api/features/**"
                                ).hasRole(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.PUT,
                                        "/api/stays/**",
                                        "/api/categories/**",
                                        "/api/features/**"
                                ).hasRole(Role.ADMIN.name())
                                .requestMatchers(HttpMethod.DELETE,
                                        "/api/stays/**",
                                        "/api/categories/**",
                                        "/api/features/**"
                                ).hasRole(Role.ADMIN.name())
                                .anyRequest().authenticated())
                .sessionManagement(
                        session -> session
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }
}
