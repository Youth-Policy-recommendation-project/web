package com.backend.member.dto;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class RefreshTokenDto {
    @NotEmpty
    String refreshToken;
}
