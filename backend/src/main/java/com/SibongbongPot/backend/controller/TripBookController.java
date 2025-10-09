package com.SibongbongPot.backend.controller;

import com.SibongbongPot.backend.controller.AddPlaceRequest;
import com.SibongbongPot.backend.controller.CreateTripBookRequest;
import com.SibongbongPot.backend.domain.TripBook;
import com.SibongbongPot.backend.service.TripBookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TripBookController {

    private final TripBookService tripBookService;

    public TripBookController(TripBookService tripBookService) {
        this.tripBookService = tripBookService;
    }

    /** 트립북 생성 */
    @PostMapping("/tripbooks")
    public TripBook createTripBook(@RequestBody CreateTripBookRequest req) {
    return tripBookService.createOrGetTripBook(req.getUserId());
}


    /** 사용자 트립북 목록 */
    @GetMapping("/users/{userId}/tripbooks")
    public List<TripBook> getUserTripBooks(@PathVariable Long userId) {
        return tripBookService.getMyTripBooks(userId);
    }

    /** 트립북 상세 */
    @GetMapping("/tripbooks/{tripbookId}")
    public TripBook getTripBook(@PathVariable Long tripbookId) {
        return tripBookService.getTripBook(tripbookId);
    }

    /** 트립북에 장소 추가 */
    @PostMapping("/tripbooks/{tripbookId}/places")
    public TripBook addPlace(@PathVariable Long tripbookId, @RequestBody AddPlaceRequest req) {
        return tripBookService.addPlace(tripbookId, req.getPlaceId());
    }

    /** 트립북에서 장소 삭제 */
    @DeleteMapping("/tripbooks/{tripbookId}/places/{placeId}")
    public TripBook removePlace(@PathVariable Long tripbookId, @PathVariable Long placeId) {
        return tripBookService.removePlace(tripbookId, placeId);
    }
}