package com.SibongbongPot.backend.controller;

import com.SibongbongPot.backend.domain.TripBook;
import com.SibongbongPot.backend.service.TripBookService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/me/tripbook") // 기본 경로를 /api/me/tripbook으로 변경
public class TripBookController {

    private final TripBookService tripBookService;

    public TripBookController(TripBookService tripBookService) {
        this.tripBookService = tripBookService;
    }

    /**
     * 내 트립북 조회 (생성 기능 포함)
     */
    @GetMapping
    public TripBook getMyTripBook(Authentication authentication) {
        String username = authentication.getName();
        return tripBookService.findOrCreateTripBook(username);
    }

    /**
     * 내 트립북에 장소 추가
     */
    @PostMapping("/places")
    public TripBook addPlaceToMyTripBook(@RequestBody AddPlaceRequest req, Authentication authentication) {
        String username = authentication.getName();
        return tripBookService.addPlace(username, req.getPlaceId());
    }

    /**
     * 내 트립북에서 장소 삭제
     */
    @DeleteMapping("/places/{placeId}")
    public TripBook removePlaceFromMyTripBook(@PathVariable Long placeId, Authentication authentication) {
        String username = authentication.getName();
        return tripBookService.removePlace(placeId, username);
    }
}