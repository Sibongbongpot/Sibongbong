package com.SibongbongPot.backend.service;

import com.SibongbongPot.backend.controller.UserSignupRequest;
import com.SibongbongPot.backend.domain.User;
import com.SibongbongPot.backend.repository.UserRepository;
import com.SibongbongPot.backend.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // 생성자를 통해 필요한 부품들(Repository, PasswordEncoder, JwtUtil)을 주입받습니다.
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * 회원가입 로직을 처리하는 메소드
     */
    public void signup(UserSignupRequest request) {
        // 아이디 중복 체크
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }
        // 비밀번호를 암호화해서 저장합니다.
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        User newUser = new User(request.getUsername(), encodedPassword, request.getEmail());
        userRepository.save(newUser);
    }

    /**
     * 로그인 로직을 처리하는 메소드
     */
    public String login(String username, String password) {
        // 1. username으로 사용자를 DB에서 조회합니다.
        Optional<User> userOptional = userRepository.findByUsername(username);

        // 2. 사용자가 존재하고, 입력된 비밀번호가 DB의 암호화된 비밀번호와 일치하는지 확인합니다.
        //    passwordEncoder.matches()가 이 비교 과정을 안전하게 처리해줍니다.
        if (userOptional.isPresent() &&
                passwordEncoder.matches(password, userOptional.get().getPassword())) {

            // 로그인 성공 시, 해당 username으로 JWT 토큰을 생성해서 반환합니다.
            return jwtUtil.createToken(username);
        } else {
            // 사용자가 없거나 비밀번호가 틀린 경우
            throw new IllegalArgumentException("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    }

    /**
     * 사용자 취향을 업데이트하는 서비스 메소드
     */
    public void updateUserPreferences(String username, List<String> preferences) {
        User user = findByUsername(username); // 아래에 만든 헬퍼 메소드 사용
        String preferencesString = String.join(",", preferences);
        user.setPreferences(preferencesString);
        userRepository.save(user);
    }
    
    /**
     * 비밀번호를 변경하는 서비스 메소드
     */
    public void updatePassword(String username, String currentPassword, String newPassword) {
        User user = findByUsername(username);

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    /**
     * 현재 로그인한 사용자 정보를 조회하는 서비스 메소드
     */
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
    }
}
