package com.SibongbongPot.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter; // 1. Setter를 import 합니다.

@Getter
@Setter // 2. @Setter 어노테이션을 추가합니다.
@NoArgsConstructor
@Entity
@Table(name = "places")
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String city;
    private Double lat;
    private Double lng;
    private String category;
}