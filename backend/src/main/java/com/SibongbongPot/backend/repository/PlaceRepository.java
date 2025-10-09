package com.SibongbongPot.backend.repository;

import com.SibongbongPot.backend.domain.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param; // Param import 추가
import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    
    // "city"라는 필드로 모든 Place를 찾는다(find by)는 규칙에 따라
    // JPA가 자동으로 SQL 쿼리를 만들어줍니다.
    List<Place> findByCity(String city);

    // 거리 계산을 위한 네이티브 쿼리 (새로 추가!)
    @Query(value = "SELECT * FROM places p WHERE " +
                   "(6371 * acos(cos(radians(:lat)) * cos(radians(p.lat)) * " +
                   "cos(radians(p.lng) - radians(:lng)) + sin(radians(:lat)) * " +
                   "sin(radians(p.lat)))) < :distance " +
                   "AND p.category = :category",
           nativeQuery = true)
    List<Place> findNearbyPlaces(
            @Param("lat") Double lat,
            @Param("lng") Double lng,
            @Param("distance") Double distance,
            @Param("category") String category
    );
}