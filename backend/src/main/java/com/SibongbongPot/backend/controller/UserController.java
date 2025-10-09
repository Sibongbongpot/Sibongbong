package com.SibongbongPot.backend.controller;

import com.SibongbongPot.backend.service.UserService; // UserService import

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService; // 이제 UserRepository가 아닌 UserService를 사용합니다.

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 회원가입 API (이 부분은 그대로 둡니다)
    @PostMapping("/api/users/signup")
    public String signup(@RequestBody UserSignupRequest request) {
        userService.signup(request);
        return "회원가입 성공";
    }

    // 로그인 API 추가
    @PostMapping("/api/users/login")
    public String login(@RequestBody LoginRequest request) {
        return userService.login(request.getUsername(), request.getPassword());
    }

    // 사용자 취향 저장/수정 API
    // 참고: 지금은 임시로 URL에 사용자 ID를 포함해서 테스트합니다.
    @PutMapping("/api/users/{userId}/preferences")
    public String updateUserPreferences(
            @PathVariable Long userId,
            @RequestBody PreferencesRequest request) {
        
        userService.updateUserPreferences(userId, request.getTags());
        return "사용자 취향이 저장되었습니다.";
    }
}