package com.SibongbongPot.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.SibongbongPot.backend.domain.Place;
import com.SibongbongPot.backend.repository.PlaceRepository;
import java.util.Optional;

@Service // 이 클래스가 서비스 계층임을 알려줘요
public class PlaceService {

    private final PlaceRepository placeRepository;
    private static final Double SEARCH_DISTANCE_KM = 1.0; // 1km 반경으로 검색

    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    // 도시 이름으로 관광지를 찾는 서비스 메소드
    public List<Place> findPlacesByCity(String city) {
        // Repository에게 city를 전달하며 데이터를 요청합니다.
        return placeRepository.findByCity(city);
    }

    // ID로 특정 장소 하나를 찾는 메소드
    public Optional<Place> findPlaceById(Long id) {
        // Repository에 이미 있는 findById 메소드를 호출합니다.
        return placeRepository.findById(id);
    }

    // 주변 장소를 찾는 서비스 메소드
    public List<Place> findNearbyPlaces(Double lat, Double lng, String category) {
        return placeRepository.findNearbyPlaces(lat, lng, SEARCH_DISTANCE_KM, category);
    }

    // 키워드로 장소를 검색하는 서비스 메소드
    public List<Place> searchPlacesByKeyword(String keyword) {
        return placeRepository.findByNameContaining(keyword);
    }
}