package com.backend.policy.entity;

import com.backend.member.domain.Member;


import com.backend.policy.model.PolicyDTO;
import java.sql.Date;
import java.util.ArrayList;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.CollectionTable;
import javax.persistence.JoinColumn;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "policy")
@NoArgsConstructor
@AllArgsConstructor
public class PolicyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String institutionsLocalClass; // 기관 및 지자체 구분

    private String policyName; // 정책명


    private String policyInfo; // 정책소개


    private String policyContent; // 지원 내용


    private String policyScale; // 지원규모

    private Date operationStartDate; // 사업운영 시작 날짜
    private Date operationEndDate; // 사업운영 마감 날짜

    private Date businessApplyStart; // 신청시작 날짜
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


//    @ManyToMany(mappedBy = "policies")
//    private List<Member> users = new ArrayList<>();
//// Inside PolicyEntity class

    public PolicyDTO toDTO() {
        PolicyDTO policyDTO = new PolicyDTO();
        policyDTO.setId(this.id);
        policyDTO.setInstitutionsLocalClass(this.institutionsLocalClass);
        policyDTO.setPolicyName(this.policyName);
        policyDTO.setPolicyInfo(this.policyInfo);
        policyDTO.setPolicyContent(this.policyContent);
        policyDTO.setPolicyScale(this.policyScale);
        policyDTO.setOperationStartDate(this.operationStartDate);
        policyDTO.setOperationEndDate(this.operationEndDate);
        policyDTO.setBusinessApplyStart(this.businessApplyStart);
        policyDTO.setBusinessApplyEnd(this.businessApplyEnd);
        policyDTO.setMajorRequirements(this.majorRequirements);
        policyDTO.setEmploymentStatusDetails(this.employmentStatusDetails);
        policyDTO.setSpecializedFieldContents(this.specializedFieldContents);
        policyDTO.setEducationRequirements(this.educationRequirements);
        policyDTO.setResidenceIncomeConditions(this.residenceIncomeConditions);
        policyDTO.setAdditionalClues(this.additionalClues);
        policyDTO.setParticipationRestrictions(this.participationRestrictions);
        policyDTO.setApplicationProcedureDetails(this.applicationProcedureDetails);
        policyDTO.setDocumentsSubmitted(this.documentsSubmitted);
        policyDTO.setJuryPresentationContents(this.juryPresentationContents);
        policyDTO.setApplyUrl(this.applyUrl);
        policyDTO.setEtcUrls(this.etcUrls);
        policyDTO.setHostingDepartmentName(this.hostingDepartmentName);
        policyDTO.setHostingDepartment(this.hostingDepartment);
        policyDTO.setHostingDepartmentContact(this.hostingDepartmentContact);
        policyDTO.setOperatingOrganization(this.operatingOrganization);
        policyDTO.setOperatingAgency(this.operatingAgency);
        policyDTO.setEtc(this.etc);
        policyDTO.setHostArea(this.hostArea);
        policyDTO.setStartAge(this.startAge);
        policyDTO.setEndAge(this.endAge);

        return policyDTO;
    }

// Inside PolicyDTO class

    public static PolicyEntity fromDTO(PolicyDTO policyDTO) {
        PolicyEntity policyEntity = new PolicyEntity();
        policyEntity.setId(policyDTO.getId());
        policyEntity.setInstitutionsLocalClass(policyDTO.getInstitutionsLocalClass());
        policyEntity.setPolicyName(policyDTO.getPolicyName());
        policyEntity.setPolicyInfo(policyDTO.getPolicyInfo());
        policyEntity.setPolicyContent(policyDTO.getPolicyContent());
        policyEntity.setPolicyScale(policyDTO.getPolicyScale());
        policyEntity.setOperationStartDate(policyDTO.getOperationStartDate());
        policyEntity.setOperationEndDate(policyDTO.getOperationEndDate());
        policyEntity.setBusinessApplyStart(policyDTO.getBusinessApplyStart());
        policyEntity.setBusinessApplyEnd(policyDTO.getBusinessApplyEnd());
        policyEntity.setMajorRequirements(policyDTO.getMajorRequirements());
        policyEntity.setEmploymentStatusDetails(policyDTO.getEmploymentStatusDetails());
        policyEntity.setSpecializedFieldContents(policyDTO.getSpecializedFieldContents());
        policyEntity.setEducationRequirements(policyDTO.getEducationRequirements());
        policyEntity.setResidenceIncomeConditions(policyDTO.getResidenceIncomeConditions());
        policyEntity.setAdditionalClues(policyDTO.getAdditionalClues());
        policyEntity.setParticipationRestrictions(policyDTO.getParticipationRestrictions());
        policyEntity.setApplicationProcedureDetails(policyDTO.getApplicationProcedureDetails());
        policyEntity.setDocumentsSubmitted(policyDTO.getDocumentsSubmitted());
        policyEntity.setJuryPresentationContents(policyDTO.getJuryPresentationContents());
        policyEntity.setApplyUrl(policyDTO.getApplyUrl());
        policyEntity.setEtcUrls(policyDTO.getEtcUrls());
        policyEntity.setHostingDepartmentName(policyDTO.getHostingDepartmentName());
        policyEntity.setHostingDepartment(policyDTO.getHostingDepartment());
        policyEntity.setHostingDepartmentContact(policyDTO.getHostingDepartmentContact());
        policyEntity.setOperatingOrganization(policyDTO.getOperatingOrganization());
        policyEntity.setOperatingAgency(policyDTO.getOperatingAgency());
        policyEntity.setEtc(policyDTO.getEtc());
        policyEntity.setHostArea(policyDTO.getHostArea());
        policyEntity.setStartAge(policyDTO.getStartAge());
        policyEntity.setEndAge(policyDTO.getEndAge());

        return policyEntity;
    }

}