package com.SibongbongPot.backend.repository;

import com.SibongbongPot.backend.domain.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {

    // "city"라는 필드로 모든 Place를 찾는다(find by)는 규칙에 따라
    // JPA가 자동으로 SQL 쿼리를 만들어줍니다.
    List<Place> findByCity(String city);
}