package com.SibongbongPot.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA가 사용하는 기본 생성자를 보호된 수준으로 만듭니다.
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;
    private String preferences;

    // 회원가입 시 사용할 생성자는 유지합니다.
    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

