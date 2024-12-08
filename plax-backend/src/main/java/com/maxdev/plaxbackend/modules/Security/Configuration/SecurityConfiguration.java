package com.maxdev.plaxbackend.modules.Security.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfiguration {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;
        private final AuthenticationProvider authenticationProvider;
        private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
        private final CustomAccessDeniedHandler customAccessDeniedHandler;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(AbstractHttpConfigurer::disable) // Deshabilita CSRF (para APIs REST, es común
                                                                       // hacerlo)
                                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Configuración de
                                                                                                   // CORS
                                .authorizeHttpRequests(auth -> auth
                                                // Rutas públicas (sin necesidad de autenticación)
                                                .requestMatchers("/api/auth/**").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/swagger-ui/**", "/v3/api-docs/**",
                                                                "/api/stays/**", "/api/categories/**",
                                                                "/api/features/**")
                                                .permitAll()
                                                // Rutas que requieren autenticación
                                                .requestMatchers(HttpMethod.GET, "/api/users/**").authenticated()
                                                .requestMatchers(HttpMethod.PATCH, "/api/users/**").authenticated()
                                                // Rutas restringidas a administradores
                                                .requestMatchers(HttpMethod.POST, "/api/stays/**", "/api/categories/**",
                                                                "/api/features/**", "/api/users/**")
                                                .hasAuthority("ADMIN")
                                                .requestMatchers(HttpMethod.PUT, "/api/stays/**", "/api/categories/**",
                                                                "/api/features/**", "/api/users/**")
                                                .hasAuthority("ADMIN")
                                                .requestMatchers(HttpMethod.DELETE, "/api/stays/**",
                                                                "/api/categories/**", "/api/features/**",
                                                                "/api/users/**")
                                                .hasAuthority("ADMIN")
                                                // Cualquier otra solicitud requiere autenticación
                                                .anyRequest().authenticated())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                                .exceptionHandling(exceptionHandling -> exceptionHandling
                                                .authenticationEntryPoint(customAuthenticationEntryPoint)
                                                .accessDeniedHandler(customAccessDeniedHandler));
                return http.build();
        }

        @Bean
        public UrlBasedCorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration corsConfig = new CorsConfiguration();
                corsConfig.setAllowCredentials(true);
                corsConfig.addAllowedOrigin("http://localhost:5173");
                corsConfig.addAllowedHeader("*");
                corsConfig.addAllowedMethod("*");
                corsConfig.addExposedHeader("Authorization");

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", corsConfig);

                return source;
        }
}
