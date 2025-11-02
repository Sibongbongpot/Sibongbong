package com.SibongbongPot.backend.service;

import com.SibongbongPot.backend.domain.Place;
import com.SibongbongPot.backend.domain.TripBook;
import com.SibongbongPot.backend.domain.User;
import com.SibongbongPot.backend.repository.PlaceRepository;
import com.SibongbongPot.backend.repository.TripBookRepository;
import com.SibongbongPot.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.List;

@Service
@Transactional
public class TripBookService {

    private final TripBookRepository tripBookRepository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;

    public TripBookService(TripBookRepository tripBookRepository,
                           UserRepository userRepository,
                           PlaceRepository placeRepository) {
        this.tripBookRepository = tripBookRepository;
        this.userRepository = userRepository;
        this.placeRepository = placeRepository;
    }

    /** 트립북 생성/가져오기 (유저당 최대 1개, 제목 없음) */
    public TripBook createOrGetTripBook(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        // 이미 있으면 기존 것 반환
        return tripBookRepository.findByUserId(userId)
                .orElseGet(() -> {
                    TripBook tb = new TripBook();
                    tb.setUser(user);
                    return tripBookRepository.save(tb);
                });
    }

    /** 내 트립북 목록 (요구사항상 0 또는 1개지만, 응답은 목록 형태 유지) */
    public List<TripBook> getMyTripBooks(Long userId) {
        return tripBookRepository.findAllByUserId(userId);
    }

    /** 특정 트립북 상세 */
    public TripBook getTripBook(Long tripBookId) {
        return tripBookRepository.findById(tripBookId)
                .orElseThrow(() -> new IllegalArgumentException("TripBook not found: " + tripBookId));
    }

    /** 트립북에 장소 추가 (중복 추가 방지) */
    public TripBook addPlace(Long tripBookId, Long placeId) {
        TripBook tb = getTripBook(tripBookId);
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new IllegalArgumentException("Place not found: " + placeId));

        tb.getPlaces().add(place); // Set이라 자동 중복방지
        return tb; // 트랜잭션 종료 시 flush
    }

    /** 트립북에서 장소 삭제 */
    public TripBook removePlace(Long tripBookId, Long placeId) {
        TripBook tb = getTripBook(tripBookId);
        tb.getPlaces().removeIf(p -> p.getId().equals(placeId));
        return tb;
    }
}