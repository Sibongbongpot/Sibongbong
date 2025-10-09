package com.SibongbongPot.backend.controller;

import com.SibongbongPot.backend.domain.Place;
import com.SibongbongPot.backend.service.PlaceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
}