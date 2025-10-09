package com.SibongbongPot.backend; // 본인의 메인 패키지 경로

import com.SibongbongPot.backend.domain.Place;
import com.SibongbongPot.backend.repository.PlaceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component // 이 클래스도 스프링이 관리하는 부품으로 등록합니다.
public class DataInitializer implements CommandLineRunner {

    private final PlaceRepository placeRepository;

    public DataInitializer(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 서버가 시작될 때 이 코드가 자동으로 실행됩니다.
        // Place 엔티티에 데이터를 넣기 위한 생성자나 Setter가 필요합니다.
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

        placeRepository.save(place1);
        placeRepository.save(place2);

        System.out.println(">>>>>> 자바 코드로 샘플 데이터가 성공적으로 입력되었습니다! <<<<<<");
    }
}