package com.SibongbongPot.backend.repository; // 본인 패키지 경로 확인

import java.util.Optional;
import com.SibongbongPot.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // "User를 관리하고, User의 ID는 Long 타입이다"라는 의미

    // username으로 사용자를 찾기 위한 메소드 (JPA가 메소드 이름을 보고 자동으로 기능을 만들어줍니다)
    Optional<User> findByUsername(String username);
}