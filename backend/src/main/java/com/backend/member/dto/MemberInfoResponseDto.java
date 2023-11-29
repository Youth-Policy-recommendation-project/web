package com.backend.member.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberInfoResponseDto {
    private String email;

    private String name;
    private LocalDate dateOfBirth;
    private String region;
    private String interestPolicy;
}
