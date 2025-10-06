package com.SibongbongPot.backend.controller;

import com.SibongbongPot.backend.domain.User;
import com.SibongbongPot.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// 요청 데이터를 담을 DTO 클래스 (별도의 파일로 만들어도 좋습니다)
class UserSignupRequest {
    private String username;
    private String password;
    
    // Getters
    public String getUsername() { return username; }
    public String getPassword() { return password; }
}

@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/api/users/signup")
    public String signup(@RequestBody UserSignupRequest request) {
        // 1. 요청 데이터를 바탕으로 id가 없는 새로운 User 객체를 생성
        User newUser = new User(request.getUsername(), request.getPassword());
        
        // 2. DB에 저장
        userRepository.save(newUser);
        
        return "회원가입 성공";
    }
}