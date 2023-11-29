package com.backend.member.dto;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberInfoRequestDto {
    private String email;

    private String name;
    private LocalDate dateOfBirth;
    private String region;

    private String interestPolicy;

}
