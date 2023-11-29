package com.backend.policy.service;

import com.backend.policy.entity.PolicyEntity;
import com.backend.policy.model.PolicyDTO;
import com.backend.policy.repository.PolicyRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PolicyService {

    private final PolicyRepository policyRepository;

    public List<PolicyDTO> getAllPolicies() {
        List<PolicyEntity> policyEntities = policyRepository.findAll();
        return policyEntities.stream()
            .map(PolicyEntity::toDTO)
            .collect(Collectors.toList());
    }


    public List<PolicyEntity> searchPolicyByConditions(String hostArea, String mainCategory,
        String segCategory, String age) {

        List<PolicyEntity> policyList = new ArrayList<>(); // Initialize to an empty list
        int intAge = Integer.parseInt(age);

            if ("n".equals(hostArea) && "n".equals(mainCategory) && intAge == -1) {
                // No filtering needed, return all policies
                policyList = policyRepository.findAll();
            } else if ("n".equals(mainCategory) && intAge == -1) {
                // Filter by hostArea
                policyList = policyRepository.findPoliciesByHostArea(hostArea);
            } else if ("n".equals(hostArea) && intAge == -1) {
                // Filter by mainCategory and segCategory
                if ("n".equals(segCategory)) {
                    policyList = policyRepository.findPoliciesByMainCategory(mainCategory);
                } else {
                    policyList = policyRepository.findPoliciesByMainCategoryAndSegCategory(
                        mainCategory, segCategory);
                }
            } else if ("n".equals(hostArea) && "n".equals(mainCategory)) {
                // Filter by age
                policyList = policyRepository.findPoliciesByStartAgeBetweenEndAge(intAge);
            } else if (intAge == -1) {
                // Filter by hostArea and mainCategory
                if ("n".equals(segCategory)) {
                    policyList = policyRepository.findPoliciesByHostAreaAndMainCategory(hostArea,
                        mainCategory);
                } else {
                    policyList = policyRepository.findPoliciesByHostAreaAndMainCategoryAndSegCategory(
                        hostArea, mainCategory, segCategory);
                }
            } else if ("n".equals(mainCategory)) {
                // Filter by hostArea and age
                policyList = policyRepository.findPoliciesByHostAreaAndAge(hostArea, intAge);
            } else if ("n".equals(hostArea)) {
                // Filter by age and mainCategory and segCategory
                if ("n".equals(segCategory)) {
                    policyList = policyRepository.findPoliciesByAgeAndMainCategory(mainCategory,
                        intAge);
                } else {
                    policyList = policyRepository.findPoliciesByAgeAndMainCategoryAndSegCategory(
                        mainCategory, segCategory, intAge);
                }
            } else {
                // Filter by hostArea, mainCategory, and age
                if ("n".equals(segCategory)) {
                    policyList = policyRepository.findPoliciesByMainCategoryAndHostAreaAndAge(
                        hostArea, mainCategory, intAge);
                } else {
                    policyList = policyRepository.findPoliciesByConditions(hostArea, mainCategory,
                        segCategory, intAge);
                }
            }


        // Perform null check before returning the list
        return new ArrayList<>(policyList);
    }





    public List<PolicyEntity> findPoliciesByConditionsOrderByBusinessApplyEnd(String hostArea, String mainCategory, String segCategory,
        String age) {


        List<PolicyEntity> policyList = new ArrayList<>(); // Initialize to an empty list
        int intAge = Integer.parseInt(age);

        // Null check for policyRepository before calling methods
        if (policyRepository != null) {
            if (hostArea.equals("n") && mainCategory.equals("n") &&  intAge == -1) {
                // No filtering needed, return all policies
                policyList = policyRepository.findAllByOrderByBusinessApplyEndAsc();
            } else if (mainCategory.equals("n") && intAge == -1) {
                // Filter by hostArea
                policyList = policyRepository.findPoliciesByHostAreaOrderByAsc(hostArea);
            } else if (hostArea.equals("n") && intAge == -1) {
                // Filter by mainCategory and segCategory
                if (segCategory.equals("n")) {
                    policyList = policyRepository.findPoliciesByMainCategoryOrderByAsc(
                        mainCategory);
                } else {
                    policyList = policyRepository.findPoliciesByMainCategoryAndSegCategoryOrderByAsc(
                        mainCategory, segCategory);
                }
            } else if (hostArea.equals("n") && mainCategory.equals("n")) {
                // Filter by age
                policyList = policyRepository.findPoliciesByStartAgeBetweenEndAgeOrderByAsc(
                    intAge);
            } else if (intAge == -1) {
                // Filter by hostArea and mainCategory
                if (segCategory.equals("n")) {
                    policyList = policyRepository.findPoliciesByHostAreaAndMainCategoryOrderByAsc(
                        hostArea, mainCategory);
                } else {
                    policyList = policyRepository.findPoliciesByHostAreaAndMainCategoryAndSegCategoryOrderByAsc(
                        hostArea, mainCategory, segCategory);
                }
            } else if (mainCategory.equals("n")) {
                // Filter by hostArea and age
                policyList = policyRepository.findPoliciesByHostAreaAndAgeOrderByAsc(hostArea,
                    intAge);
            } else if (hostArea.equals("n")) {
                // Filter by age and mainCategory and segCategory
                if (segCategory.equals("n")) {
                    policyList = policyRepository.findPoliciesByAgeAndMainCategoryOrderByAsc(
                        mainCategory, intAge);
                } else {
                    policyList = policyRepository.findPoliciesByAgeAndMainCategoryAndSegCategoryOrderByAsc(
                        mainCategory, segCategory, intAge);
                }
            } else if (!(hostArea.equals("n") && mainCategory.equals("n") && intAge == -1)) {
                // Filter by hostArea, mainCategory, and age
                if (segCategory.equals("n")) {
                    policyList = policyRepository.findPoliciesByMainCategoryAndHostAreaAndAgeOrderByAsc(
                        hostArea, mainCategory, intAge);
                } else {
                    policyList = policyRepository.findPoliciesByConditionsOrderByLatest(hostArea,
                        mainCategory, segCategory, intAge);
                }
            }
        }


            // Perform null check before returning the list
                return new ArrayList<>(policyList);
        }



    public List<PolicyEntity> findPoliciesByConditionsOrderByOperationStartDate(String hostArea, String mainCategory, String segCategory,
        int age) {


        List<PolicyEntity> policyList = new ArrayList<>(); // Initialize to an empty list
        // Null check for policyRepository before calling methods

        if (policyRepository != null) {
            if (hostArea.equals("n") && mainCategory.equals("n") && age == -1) {
                // No filtering needed, return all policies
                policyList = policyRepository.findAllByOrderByBusinessApplyStartDesc();
            } else if (mainCategory.equals("n") && age == -1) {
                // Filter by hostArea
                policyList = policyRepository.findPoliciesByHostAreaOrderByLatest(hostArea);
            } else if (hostArea.equals("n") && age == -1) {
                // Filter by mainCategory and segCategory
                if (segCategory.equals("n")) {
                    policyList = policyRepository.findPoliciesByMainCategoryOrderByLatest(
                        mainCategory);
                } else {
                    policyList = policyRepository.findPoliciesByMainCategoryAndSegCategoryOrderByLatest(
                        mainCategory, segCategory);
                }
            } else if (hostArea.equals("n") && mainCategory.equals("n")) {
                // Filter by age
                policyList = policyRepository.findPoliciesByStartAgeBetweenEndAgeOrderByLatest(
                    age);
            } else if (age == -1) {
                // Filter by hostArea and mainCategory
                if (segCategory.equals("n")) {
                    policyList = policyRepository.findPoliciesByHostAreaAndMainCategoryOrderByLatest(
                        hostArea, mainCategory);
                } else {
                    policyList = policyRepository.findPoliciesByHostAreaAndMainCategoryAndSegCategoryOrderByLatest(
                        hostArea, mainCategory, segCategory);
                }
            } else if (mainCategory.equals("n")) {
                // Filter by hostArea and age
                policyList = policyRepository.findPoliciesByHostAreaAndAgeOrderByLatest(hostArea,
                    age);
            } else if (hostArea.equals("n")) {
                // Filter by age and mainCategory and segCategory
                if (segCategory.equals("n")) {
                    policyList = policyRepository.findPoliciesByAgeAndMainCategoryOrderByLatest(
                        mainCategory, age);
                } else {
                    policyList = policyRepository.findPoliciesByAgeAndMainCategoryAndSegCategoryOrderByLatest(
                        mainCategory, segCategory, age);
                }
            } else if (!(hostArea.equals("n") && mainCategory.equals("n") && age == -1)) {
                // Filter by hostArea, mainCategory, and age
                if (segCategory.equals("n")) {
                    policyList = policyRepository.findPoliciesByMainCategoryAndHostAreaAndAgeOrderByLatest(
                        hostArea, mainCategory, age);
                } else {
                    policyList = policyRepository.findPoliciesByConditionsOrderByLatest(hostArea,
                        mainCategory, segCategory, age);
                }
            }
        }

        // Perform null check before returning the list
        return new ArrayList<>(policyList);
    }



}
