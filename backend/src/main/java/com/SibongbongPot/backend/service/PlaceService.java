package com.SibongbongPot.backend.service;

import com.SibongbongPot.backend.domain.Place;
import com.SibongbongPot.backend.repository.PlaceRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service // 이 클래스가 서비스 계층임을 알려줘요
public class PlaceService {

    private final PlaceRepository placeRepository;

    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    // 도시 이름으로 관광지를 찾는 서비스 메소드
    public List<Place> findPlacesByCity(String city) {
        // Repository에게 city를 전달하며 데이터를 요청합니다.
        return placeRepository.findByCity(city);
    }
}