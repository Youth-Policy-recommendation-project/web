package com.backend.policy.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.sql.Date;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class PolicyRequestDTO {
    private String mainCategory; // 메인 카테고리
    private String segCategory; // 세분류 카테고리
    private String hostArea; // 주관지역
    private String age; // 시작 나이

}
