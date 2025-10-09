package com.SibongbongPot.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy; // SessionCreationPolicy import 추가
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // CSRF, Form Login, HTTP Basic 인증 비활성화
            .csrf(csrf -> csrf.disable())
            .formLogin(formLogin -> formLogin.disable())
            .httpBasic(httpBasic -> httpBasic.disable())

            // 세션을 사용하지 않는 Stateless 서버로 설정
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // 특정 경로에 대한 접근 권한 설정
            .authorizeHttpRequests(authz -> authz
                // 아래 경로들은 인증 없이 누구나 접근 허용
                .requestMatchers(
                    "/",
                    "/api/users/signup",
                    "/api/users/login",
                    "/h2-console/**",
                    "/swagger-ui.html/**",
                    "/v3/api-docs/**",
                    "/swagger-ui/**"
                ).permitAll()
                // 나머지 모든 경로는 인증된 사용자만 접근 가능
                .anyRequest().authenticated()
            );

        // H2 콘솔은 iframe을 사용하므로, frame 옵션을 허용
        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));

        return http.build();
    }
}