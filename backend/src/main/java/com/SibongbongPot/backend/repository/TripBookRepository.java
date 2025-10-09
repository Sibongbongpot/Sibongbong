package com.SibongbongPot.backend.repository;

import com.SibongbongPot.backend.domain.TripBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TripBookRepository extends JpaRepository<TripBook, Long> {
    Optional<TripBook> findByUserId(Long userId);   // 유저의 트립북 1개
    List<TripBook> findAllByUserId(Long userId);    // 형태 유지(목록 응답 용도)
}
