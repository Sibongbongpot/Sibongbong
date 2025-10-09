package com.SibongbongPot.backend.controller;

import com.SibongbongPot.backend.domain.Place;
import com.SibongbongPot.backend.service.PlaceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable; // PathVariable import 추가
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/places") // 이 컨트롤러의 모든 API는 /api/places로 시작해요
public class PlaceController {

    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    // GET /api/places?city=paju-si 와 같은 요청을 처리해요
    @GetMapping
    public List<Place> getPlacesByCity(@RequestParam String city) {
        // Service에게 city를 전달하며 로직 처리를 위임합니다.
        return placeService.findPlacesByCity(city);
    }

    // 단일 장소 상세 정보 조회
    // GET /api/places/1 와 같은 요청을 처리합니다.
    @GetMapping("/{placeId}")
    public Optional<Place> getPlaceById(@PathVariable Long placeId) {
        return placeService.findPlaceById(placeId);
    }

    // 주변 장소 검색 API
    // GET /api/places/nearby?lat=37.79&lng=126.69&category=restaurant
    @GetMapping("/nearby")
    public List<Place> getNearbyPlaces(
            @RequestParam Double lat,
            @RequestParam Double lng,
            @RequestParam String category) {
        return placeService.findNearbyPlaces(lat, lng, category);
    }
}