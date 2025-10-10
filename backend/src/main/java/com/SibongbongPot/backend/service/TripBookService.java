package com.SibongbongPot.backend.service;

import com.SibongbongPot.backend.domain.Place;
import com.SibongbongPot.backend.domain.TripBook;
import com.SibongbongPot.backend.domain.User;
import com.SibongbongPot.backend.repository.PlaceRepository;
import com.SibongbongPot.backend.repository.TripBookRepository;
import com.SibongbongPot.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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

    /**
     * 사용자의 유일한 트립북을 찾거나, 없으면 생성해서 반환
     */
    public TripBook findOrCreateTripBook(String username) {
        User user = findUserByUsername(username);
        return tripBookRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    TripBook newTripBook = new TripBook();
                    newTripBook.setUser(user);
                    return tripBookRepository.save(newTripBook);
                });
    }

    /**
     * 내 트립북에 장소 추가
     */
    public TripBook addPlace(String username, Long placeId) {
        TripBook myTripBook = findOrCreateTripBook(username); // 내 트립북을 먼저 찾거나 생성
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new IllegalArgumentException("Place not found: " + placeId));

        myTripBook.getPlaces().add(place);
        return myTripBook;
    }

    /**
     * 내 트립북에서 장소 삭제
     */
    public TripBook removePlace(Long placeId, String username) {
        TripBook myTripBook = findOrCreateTripBook(username); // 내 트립북을 먼저 찾거나 생성
        myTripBook.getPlaces().removeIf(p -> p.getId().equals(placeId));
        return myTripBook;
    }

    // --- Private Helper Method ---
    private User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
    }
}