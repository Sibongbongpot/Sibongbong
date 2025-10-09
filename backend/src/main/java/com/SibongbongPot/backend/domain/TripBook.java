package com.SibongbongPot.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "trip_books")
public class TripBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 한 유저는 하나의 트립북(1:1)
    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    // 트립북 안에 여러 장소, 한 장소가 여러 트립북에 담길 수 있음 (N:N)
    @ManyToMany
    @JoinTable(
            name = "tripbook_places",
            joinColumns = @JoinColumn(name = "tripbook_id"),
            inverseJoinColumns = @JoinColumn(name = "place_id")
    )
    private Set<Place> places = new LinkedHashSet<>();
}
