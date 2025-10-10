package com.SibongbongPot.backend.controller;

import lombok.Getter;

@Getter
public class UpdatePasswordRequest {
    private String currentPassword;
    private String newPassword;
}