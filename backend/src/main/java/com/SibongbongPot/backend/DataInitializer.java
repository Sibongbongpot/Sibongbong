package com.SibongbongPot.backend;

import com.SibongbongPot.backend.domain.Place;
import com.SibongbongPot.backend.repository.PlaceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final PlaceRepository placeRepository;

    public DataInitializer(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        
        Place place1 = new Place();
        place1.setName("헤이리 예술마을");
        place1.setCity("paju-si");
        place1.setLat(37.7946);
        place1.setLng(126.6952);
        place1.setCategory("tourist_spot");
        
        Place place2 = new Place();
        place2.setName("임진각 평화누리 공원");
        place2.setCity("paju-si");
        place2.setLat(37.8913);
        place2.setLng(126.7440);
        place2.setCategory("tourist_spot");

        // --- 여기부터 추가 ---
        Place place3 = new Place();
        place3.setName("헤이리 근처 맛집"); // 테스트용 맛집 데이터
        place3.setCity("paju-si");
        place3.setLat(37.7950);
        place3.setLng(126.6960);
        place3.setCategory("restaurant");
        
        placeRepository.save(place1);
        placeRepository.save(place2);
        placeRepository.save(place3); // place3 저장 추가

        System.out.println(">>>>>> 자바 코드로 샘플 데이터가 성공적으로 입력되었습니다! <<<<<<");
    }
}