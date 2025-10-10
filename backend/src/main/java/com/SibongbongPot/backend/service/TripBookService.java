package com.SibongbongPot.backend.service;

import com.SibongbongPot.backend.domain.Place;
import com.SibongbongPot.backend.domain.TripBook;
import com.SibongbongPot.backend.domain.User;
import com.SibongbongPot.backend.repository.PlaceRepository;
import com.SibongbongPot.backend.repository.TripBookRepository;
import com.SibongbongPot.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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

    /** 트립북 생성/가져오기 */
    public TripBook createOrGetTripBook(String username) {
        User user = findUserByUsername(username);
        return tripBookRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    TripBook tb = new TripBook();
                    tb.setUser(user);
                    return tripBookRepository.save(tb);
                });
    }

    /** 내 트립북 목록 */
    public List<TripBook> getMyTripBooks(String username) {
        User user = findUserByUsername(username);
        return tripBookRepository.findAllByUserId(user.getId());
    }

    /** 특정 트립북 상세 (보안 강화) */
    public TripBook getTripBook(Long tripBookId, String username) {
        User user = findUserByUsername(username);
        TripBook tripBook = findTripBookById(tripBookId);
        validateTripBookOwner(tripBook, user); // 소유주 확인
        return tripBook;
    }

    /** 트립북에 장소 추가 (보안 강화) */
    public TripBook addPlace(Long tripBookId, Long placeId, String username) {
        User user = findUserByUsername(username);
        TripBook tb = findTripBookById(tripBookId);
        validateTripBookOwner(tb, user); // 소유주 확인

        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new IllegalArgumentException("Place not found: " + placeId));

        tb.getPlaces().add(place);
        return tb;
    }

    /** 트립북에서 장소 삭제 (보안 강화) */
    public TripBook removePlace(Long tripBookId, Long placeId, String username) {
        User user = findUserByUsername(username);
        TripBook tb = findTripBookById(tripBookId);
        validateTripBookOwner(tb, user); // 소유주 확인

        tb.getPlaces().removeIf(p -> p.getId().equals(placeId));
        return tb;
    }
    
    // --- 중복 로직을 줄이기 위한 private 헬퍼 메소드들 ---

    private User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
    }

    private TripBook findTripBookById(Long tripBookId) {
        return tripBookRepository.findById(tripBookId)
                .orElseThrow(() -> new IllegalArgumentException("TripBook not found: " + tripBookId));
    }

    private void validateTripBookOwner(TripBook tripBook, User user) {
        if (!tripBook.getUser().getId().equals(user.getId())) {
            throw new IllegalStateException("You do not have permission to access this trip book.");
        }
    }
}