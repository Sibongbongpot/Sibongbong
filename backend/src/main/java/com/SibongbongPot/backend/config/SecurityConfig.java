package com.SibongbongPot.backend.config;

import com.SibongbongPot.backend.filter.JwtFilter;
import com.SibongbongPot.backend.util.JwtUtil;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    // Swagger(OpenAPI)의 전역 설정을 위한 Bean
    @Bean
    public OpenAPI openAPI() {
        String jwtSchemeName = "jwtAuth";
        // API 요청 헤더에 인증 정보를 담을 수 있도록 보안 요구사항을 정의합니다.
        SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwtSchemeName);
        // Swagger UI에서 JWT 인증을 사용할 수 있도록 보안 스키마를 정의합니다.
        Components components = new Components()
                .addSecuritySchemes(jwtSchemeName, new SecurityScheme()
                        .name(jwtSchemeName)
                        .type(SecurityScheme.Type.HTTP) // HTTP 방식을 사용
                        .scheme("bearer") // bearer 토큰 방식을 사용
                        .bearerFormat("JWT")); // 토큰 형식은 JWT

        return new OpenAPI()
                .info(new Info().title("Sibongbong API").version("v1.0.0")) // API 문서의 제목과 버전을 설정
                .addSecurityItem(securityRequirement)
                .components(components);
    }
    
    // Spring Security의 필터 체인을 설정하는 Bean
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // CSRF, Form Login, HTTP Basic 인증을 사용하지 않도록 설정
            .csrf(csrf -> csrf.disable())
            .formLogin(formLogin -> formLogin.disable())
            .httpBasic(httpBasic -> httpBasic.disable())
            
            // 세션을 사용하지 않는 Stateless 서버로 설정 (JWT 사용을 위함)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // 경로별 접근 권한 설정
            .authorizeHttpRequests(authz -> authz
                // 아래 명시된 경로들은 인증 없이 누구나 접근 가능
                .requestMatchers(
                    "/",
                    "/api/users/signup",
                    "/api/users/login",
                    "/h2-console/**",
                    "/swagger-ui.html/**",
                    "/v3/api-docs/**",
                    "/swagger-ui/**"
                ).permitAll()
                // 나머지 모든 경로는 반드시 인증(로그인)이 필요함
                .anyRequest().authenticated()
            )
            
            // H2 콘솔이 iframe을 사용하므로, frame 옵션을 허용
            .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()))
            
            // 우리가 만든 JwtFilter를 Spring Security의 필터 체인에 추가
            // UsernamePasswordAuthenticationFilter 이전에 실행되도록 설정
            .addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}