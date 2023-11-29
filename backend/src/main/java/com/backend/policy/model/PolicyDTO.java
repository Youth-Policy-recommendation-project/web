package com.backend.policy.model;

import com.backend.policy.entity.PolicyEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PolicyDTO {

    private int id;
    private String institutionsLocalClass; // 기관 및 지자체 구분
    private String policyName; // 정책명
    private String policyInfo; // 정책소개
    private String policyContent; // 지원 내용
    private String policyScale; // 지원규모

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date operationStartDate; // 사업운영 시작 날짜
    @JsonFormat(pattern = "yyyy-MM-dd")

    private Date operationEndDate; // 사업운영 마감 날짜
    @JsonFormat(pattern = "yyyy-MM-dd")

    private Date businessApplyStart; // 신청시작 날짜
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date businessApplyEnd; // 신청마감 날짜

    private String majorRequirements; // 전공 요건 내용

    private String employmentStatusDetails; // 취업상태내용
    private String specializedFieldContents; // 특화분야내용

    private String educationRequirements; // 학력요건내용
    private String residenceIncomeConditions; // 거주지 및 소득조건 내용

    private String additionalClues; // 추가 단서사항 내용

    private String participationRestrictions; // 참여제한대상 내용
    private String applicationProcedureDetails; // 신청절차 내용

    private String documentsSubmitted; // 제출서류 내용

    private String juryPresentationContents; // 심사발표 내용
    private String applyUrl; // 신청사이트 주소
    private String etcUrls; // 기타 주소
    private String mainCategory; // 메인 카테고리
    private String segCategory; // 세분류 카테고리

    private String hostingDepartmentName;  // 주관부처명
    private String hostingDepartment; // 주관부처 담당자
    private String hostingDepartmentContact; // 주관부처 담당자 연락처
    private String operatingOrganization; // 운영기관명
    private String operatingAgency; // 운영기관 담당자 연락처
    private String etc; // 기타사항
    private String hostArea; // 주관지역
    private int startAge; // 시작 나이
    private int endAge; // 끝 나이

    // 수동으로 매핑하는 메서드 추가
    public static PolicyDTO fromEntity(PolicyEntity policyEntity) {
        PolicyDTO policyDTO = new PolicyDTO();

        policyDTO.setId(policyEntity.getId());
        policyDTO.setInstitutionsLocalClass(policyEntity.getInstitutionsLocalClass());
        policyDTO.setPolicyName(policyEntity.getPolicyName());
        policyDTO.setPolicyInfo(policyEntity.getPolicyInfo());
        policyDTO.setPolicyContent(policyEntity.getPolicyContent());
        policyDTO.setPolicyScale(policyEntity.getPolicyScale());

        policyDTO.setOperationStartDate(policyEntity.getOperationStartDate());
        policyDTO.setOperationEndDate(policyEntity.getOperationEndDate());
        policyDTO.setBusinessApplyStart(policyEntity.getBusinessApplyStart());
        policyDTO.setBusinessApplyEnd(policyEntity.getBusinessApplyEnd());

        policyDTO.setMajorRequirements(policyEntity.getMajorRequirements());
        policyDTO.setEmploymentStatusDetails(policyEntity.getEmploymentStatusDetails());
        policyDTO.setSpecializedFieldContents(policyEntity.getSpecializedFieldContents());

        policyDTO.setEducationRequirements(policyEntity.getEducationRequirements());
        policyDTO.setResidenceIncomeConditions(policyEntity.getResidenceIncomeConditions());

        policyDTO.setAdditionalClues(policyEntity.getAdditionalClues());
        policyDTO.setParticipationRestrictions(policyEntity.getParticipationRestrictions());
        policyDTO.setApplicationProcedureDetails(policyEntity.getApplicationProcedureDetails());

        policyDTO.setDocumentsSubmitted(policyEntity.getDocumentsSubmitted());
        policyDTO.setJuryPresentationContents(policyEntity.getJuryPresentationContents());
        policyDTO.setApplyUrl(policyEntity.getApplyUrl());
        policyDTO.setEtcUrls(policyEntity.getEtcUrls());
        policyDTO.setMainCategory(policyEntity.getMainCategory());
        policyDTO.setSegCategory(policyEntity.getSegCategory());

        policyDTO.setHostingDepartmentName(policyEntity.getHostingDepartmentName());
        policyDTO.setHostingDepartment(policyEntity.getHostingDepartment());
        policyDTO.setHostingDepartmentContact(policyEntity.getHostingDepartmentContact());
        policyDTO.setOperatingOrganization(policyEntity.getOperatingOrganization());
        policyDTO.setOperatingAgency(policyEntity.getOperatingAgency());
        policyDTO.setEtc(policyEntity.getEtc());
        policyDTO.setHostArea(policyEntity.getHostArea());
        policyDTO.setStartAge(policyEntity.getStartAge());
        policyDTO.setEndAge(policyEntity.getEndAge());

        return policyDTO;
    }


    public static PolicyEntity fromDTO(PolicyDTO policyDTO) {
        PolicyEntity policyEntity = new PolicyEntity();
        policyDTO.setId(policyEntity.getId());
        policyDTO.setInstitutionsLocalClass(policyEntity.getInstitutionsLocalClass());
        policyDTO.setPolicyName(policyEntity.getPolicyName());
        policyDTO.setPolicyInfo(policyEntity.getPolicyInfo());
        policyDTO.setPolicyContent(policyEntity.getPolicyContent());
        policyDTO.setPolicyScale(policyEntity.getPolicyScale());

        policyDTO.setOperationStartDate(policyEntity.getOperationStartDate());
        policyDTO.setOperationEndDate(policyEntity.getOperationEndDate());
        policyDTO.setBusinessApplyStart(policyEntity.getBusinessApplyStart());
        policyDTO.setBusinessApplyEnd(policyEntity.getBusinessApplyEnd());

        policyDTO.setMajorRequirements(policyEntity.getMajorRequirements());
        policyDTO.setEmploymentStatusDetails(policyEntity.getEmploymentStatusDetails());
        policyDTO.setSpecializedFieldContents(policyEntity.getSpecializedFieldContents());

        policyDTO.setEducationRequirements(policyEntity.getEducationRequirements());
        policyDTO.setResidenceIncomeConditions(policyEntity.getResidenceIncomeConditions());

        policyDTO.setAdditionalClues(policyEntity.getAdditionalClues());
        policyDTO.setParticipationRestrictions(policyEntity.getParticipationRestrictions());
        policyDTO.setApplicationProcedureDetails(policyEntity.getApplicationProcedureDetails());

        policyDTO.setDocumentsSubmitted(policyEntity.getDocumentsSubmitted());
        policyDTO.setJuryPresentationContents(policyEntity.getJuryPresentationContents());
        policyDTO.setApplyUrl(policyEntity.getApplyUrl());
        policyDTO.setEtcUrls(policyEntity.getEtcUrls());
        policyDTO.setMainCategory(policyEntity.getMainCategory());
        policyDTO.setSegCategory(policyEntity.getSegCategory());

        policyDTO.setHostingDepartmentName(policyEntity.getHostingDepartmentName());
        policyDTO.setHostingDepartment(policyEntity.getHostingDepartment());
        policyDTO.setHostingDepartmentContact(policyEntity.getHostingDepartmentContact());
        policyDTO.setOperatingOrganization(policyEntity.getOperatingOrganization());
        policyDTO.setOperatingAgency(policyEntity.getOperatingAgency());
        policyDTO.setEtc(policyEntity.getEtc());
        policyDTO.setHostArea(policyEntity.getHostArea());
        policyDTO.setStartAge(policyEntity.getStartAge());
        policyDTO.setEndAge(policyEntity.getEndAge());

        return policyEntity;
    }
}