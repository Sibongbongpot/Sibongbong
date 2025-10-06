package com.SibongbongPot.backend.repository; // 본인 패키지 경로 확인

import com.SibongbongPot.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // "User를 관리하고, User의 ID는 Long 타입이다"라는 의미
}