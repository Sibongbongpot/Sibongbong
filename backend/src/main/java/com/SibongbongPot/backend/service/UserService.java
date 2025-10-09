package com.SibongbongPot.backend.service;

import com.SibongbongPot.backend.controller.UserSignupRequest;
import com.SibongbongPot.backend.domain.User;
import com.SibongbongPot.backend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service // 이 클래스가 비즈니스 로직을 담당하는 서비스임을 선언합니다.
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // PasswordEncoder 주입받기

    // 생성자 수정
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 회원가입 로직을 담당할 메소드
    public void signup(UserSignupRequest request) {
        // 비밀번호를 암호화해서 저장
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        User newUser = new User(request.getUsername(), encodedPassword);
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

    // 사용자 취향을 업데이트하는 서비스 메소드
    // 참고: 지금은 '어떤' 사용자인지 구분하는 로직이 없으므로, 임시로 ID를 받아서 처리합니다.
    //      나중에 JWT 인증을 도입하면, 토큰에서 사용자 ID를 꺼내 쓰게 됩니다.
    public void updateUserPreferences(Long userId, List<String> preferences) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // List<String>을 쉼표로 구분된 하나의 String으로 변환해서 저장
            String preferencesString = String.join(",", preferences);
            user.setPreferences(preferencesString);
            userRepository.save(user);
        } else {
            // 사용자를 찾지 못한 경우에 대한 예외 처리 (나중에 구현)
            throw new RuntimeException("User not found");
        }
    }
}