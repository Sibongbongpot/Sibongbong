package com.SibongbongPot.backend.service;

import com.SibongbongPot.backend.controller.UserSignupRequest;
import com.SibongbongPot.backend.domain.User;
import com.SibongbongPot.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service // 이 클래스가 비즈니스 로직을 담당하는 서비스임을 선언합니다.
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 회원가입 로직을 담당할 메소드
    public void signup(UserSignupRequest request) {
        User newUser = new User(request.getUsername(), request.getPassword());
        userRepository.save(newUser);
    }
    
    public String login(String username, String password) {
        // 1. username으로 사용자를 DB에서 조회합니다.
        Optional<User> userOptional = userRepository.findByUsername(username);

        // 2. 사용자가 존재하고, 비밀번호가 일치하는지 확인합니다.
        if (userOptional.isPresent() && userOptional.get().getPassword().equals(password)) {
            return "로그인 성공"; // 성공 시
        } else {
            return "로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다."; // 실패 시
        }
    }
}