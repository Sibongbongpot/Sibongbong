package com.SibongbongPot.backend.controller;

import lombok.Getter;

@Getter
public class CreateTripBookRequest {
    // 유저 정보만 전달 (인증 전이라 임시로 Body로 받음)
    private Long userId;
}