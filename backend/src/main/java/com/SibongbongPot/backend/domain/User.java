package com.SibongbongPot.backend.domain; // 이 파일이 속한 패키지(폴더) 위치

// jakarta.persistence는 JPA(자바-DB연결 기술) 표준 라이브러리
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter 
@Setter
@NoArgsConstructor // Lombok: 파라미터가 없는 기본 생성자를 자동으로 만들어줍니다.
// @Entity: 이 클래스는 데이터베이스의 테이블과 직접 연결되는 클래스
@Entity
@Table(name = "users")
public class User {

    // @Id: 이 필드가 테이블의 '기본 키(Primary Key)'
    // 기본 키는 각 데이터를 구분하는 고유한 값 (예: 학번, 주민등록번호)
    @Id
    // @GeneratedValue: 기본 키의 값 데이터베이스가 자동으로 생성
    // GenerationType.IDENTITY 데이터가 추가될 때마다 숫자가 1씩 자동으로 증가
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 사용자의 고유 ID (자동 생성)

    private String username; // 사용자 아이디
    private String password; // 사용자 비밀번호

    // 개발자가 직접 사용할 생성자 (id는 자동 생성이므로 제외)
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}