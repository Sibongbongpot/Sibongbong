package com.SibongbongPot.backend.controller;

import lombok.Getter;

// 이 클래스는 회원가입 요청 시 넘어오는 JSON 데이터를 담는 역할을 합니다.
@Getter
public class UserSignupRequest {
    private String username;
    private String password;
    private String email;
}