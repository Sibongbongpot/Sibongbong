package com.SibongbongPot.backend.controller;

import com.SibongbongPot.backend.service.UserService; 
import com.SibongbongPot.backend.domain.User;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.Authentication;
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

    // 회원가입 API
    @PostMapping("/api/users/signup")
    public String signup(@RequestBody UserSignupRequest request) {
        userService.signup(request);
        return "회원가입 성공";
    }

    // 로그인 API
    @PostMapping("/api/users/login")
    public String login(@RequestBody LoginRequest request) {
        return userService.login(request.getUsername(), request.getPassword());
    }

    // URL에서 {userId}가 빠지고, 엔드포인트를 '/api/me/preferences'로 변경
    @PutMapping("/api/me/preferences")
    public String updateUserPreferences(
            Authentication authentication, // SecurityContext에서 인증 정보 받아오기
            @RequestBody PreferencesRequest request) {

        String username = authentication.getName(); // 인증 정보에서 사용자 이름 꺼내기
        userService.updateUserPreferences(username, request.getTags());
        return "사용자 취향이 저장되었습니다.";
    }

    // 내 정보 조회 API
    // 이 API는 JWT 토큰으로 인증된 사용자만 접근 가능합니다.
    @GetMapping("/api/me")
    public User getMyInfo(Authentication authentication) {
        String username = authentication.getName();
        return userService.findByUsername(username);
    }

    // 비밀번호 변경 API
    @PutMapping("/api/me/password")
    public String updatePassword(Authentication authentication, @RequestBody UpdatePasswordRequest request) {
        String username = authentication.getName();
        userService.updatePassword(username, request.getCurrentPassword(), request.getNewPassword());
        return "비밀번호가 성공적으로 변경되었습니다.";
    }
}