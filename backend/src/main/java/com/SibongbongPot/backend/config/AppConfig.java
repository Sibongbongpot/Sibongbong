package com.SibongbongPot.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AppConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // PasswordEncoder를 별도의 설정 파일에서 Bean으로 등록
        return new BCryptPasswordEncoder();
    }
}