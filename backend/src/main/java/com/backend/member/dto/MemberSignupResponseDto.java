package com.backend.member.dto;

import java.time.LocalDate;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberSignupResponseDto {
    private Long memberId;
    private String email;
    private String name;
    private LocalDateTime regdate;

    private int age;
    private LocalDate dateOfBirth;

    private String region;
    private String interestPolicy;
}
