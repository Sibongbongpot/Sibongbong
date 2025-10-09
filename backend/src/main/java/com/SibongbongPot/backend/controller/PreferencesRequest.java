package com.SibongbongPot.backend.controller;

import lombok.Getter;
import java.util.List;

@Getter
public class PreferencesRequest {
    private List<String> tags; // 예: ["activity", "food_tour", "history"]
}