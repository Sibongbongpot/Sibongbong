package com.SibongbongPot.backend.controller;

import com.SibongbongPot.backend.domain.TripBook;
import com.SibongbongPot.backend.service.TripBookService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TripBookController {

    private final TripBookService tripBookService;

    public TripBookController(TripBookService tripBookService) {
        this.tripBookService = tripBookService;
    }

    /** 내 트립북 생성 또는 조회 */
    @PostMapping("/tripbooks")
    public TripBook createOrGetTripBook(Authentication authentication) {
        String username = authentication.getName();
        return tripBookService.createOrGetTripBook(username);
    }

    /** 내 트립북 목록 조회 */
    @GetMapping("/me/tripbooks")
    public List<TripBook> getMyTripBooks(Authentication authentication) {
        String username = authentication.getName();
        return tripBookService.getMyTripBooks(username);
    }

    /** 특정 트립북 상세 조회 (보안 강화) */
    @GetMapping("/tripbooks/{tripbookId}")
    public TripBook getTripBook(@PathVariable Long tripbookId, Authentication authentication) {
        String username = authentication.getName();
        return tripBookService.getTripBook(tripbookId, username);
    }

    /** 트립북에 장소 추가 (보안 강화) */
    @PostMapping("/tripbooks/{tripbookId}/places")
    public TripBook addPlace(@PathVariable Long tripbookId, @RequestBody AddPlaceRequest req, Authentication authentication) {
        String username = authentication.getName();
        return tripBookService.addPlace(tripbookId, req.getPlaceId(), username);
    }

    /** 트립북에서 장소 삭제 (보안 강화) */
    @DeleteMapping("/tripbooks/{tripbookId}/places/{placeId}")
    public TripBook removePlace(@PathVariable Long tripbookId, @PathVariable Long placeId, Authentication authentication) {
        String username = authentication.getName();
        return tripBookService.removePlace(tripbookId, placeId, username);
    }
}