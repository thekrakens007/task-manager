package com.taskmanager.dto;

public record AuthResponse(

        String token,
        Long userId,
        String name,
        String email

) {
}