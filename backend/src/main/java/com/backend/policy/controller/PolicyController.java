package com.backend.policy.controller;


import com.backend.member.domain.Member;
import com.backend.member.repository.MemberRepository;
import com.backend.policy.entity.PolicyEntity;
import com.backend.policy.model.PolicyDTO;
import com.backend.policy.model.PolicyRequestDTO;
import com.backend.policy.repository.PolicyRepository;
import com.backend.policy.service.PolicyService;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/policy")
public class PolicyController {

    @Autowired
    private PolicyService policyService;
    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private MemberRepository memberRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public Map<String, List<PolicyDTO>> getAllPolicies() {
        List<PolicyDTO> policies = policyService.getAllPolicies();

        // 데이터를 담을 Map 생성
        Map<String, List<PolicyDTO>> response = new HashMap<>();
        response.put("policy", policies);

        return response;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public Map<String, List<PolicyEntity>> getPolicy() {
        Map<String, List<PolicyEntity>> response = new HashMap<>();
        response.put("policy", policyRepository.findAll());
        return response;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/search")
    public ResponseEntity<List<PolicyEntity>> searchPolicies(
        @RequestParam(required = false) String hostArea,
        @RequestParam(required = false) String mainCategory,
        @RequestParam(required = false) String segCategory,
        @RequestParam(required = false) String age
    ) {

        List<PolicyEntity> policies = policyService.searchPolicyByConditions(hostArea, mainCategory, segCategory, age);

//        List<PolicyEntity> policy = policyRepository.findPoliciesByConditions(
//            hostArea, mainCategory, segCategory, age);

        return new ResponseEntity(policies, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/search/latest")
    public ResponseEntity<List<PolicyEntity>> searchPoliciesLatest(
        @RequestParam(required = false) String hostArea,
        @RequestParam(required = false) String mainCategory,
        @RequestParam(required = false) String segCategory,
        @RequestParam(required = false) String age
    ) {

        int intAge = Integer.parseInt(age);
        List<PolicyEntity> policy = policyService.findPoliciesByConditionsOrderByOperationStartDate(
            hostArea, mainCategory, segCategory, intAge);

        return new ResponseEntity<>(policy, HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/search/deadline")
    public ResponseEntity<List<PolicyEntity>> searchPoliciesDeadline(
        @RequestParam(required = false) String hostArea,
        @RequestParam(required = false) String mainCategory,
        @RequestParam(required = false) String segCategory,
        @RequestParam(required = false) String age
    ) {

        List<PolicyEntity> policy = policyService.findPoliciesByConditionsOrderByBusinessApplyEnd(
            hostArea, mainCategory, segCategory, age);

        return new ResponseEntity<>(policy, HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public Optional<PolicyEntity> getPolicyById(@PathVariable int id) {
        return policyRepository.findById(id);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/search/member/{id}")
    public ResponseEntity<List<PolicyEntity>> searchPoliciesByMember(
        @PathVariable Long id
    ) {

        Member member = memberRepository.findById(id).orElseThrow();
        String hostArea = member.getRegion();
        String mainCategory = member.getInterestPolicy();
        int age = member.getAge();

        List<PolicyEntity> policies = policyService.searchPolicyByMemberConditions(hostArea, mainCategory, age);

        return new ResponseEntity(policies, HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/search/member/{id}/latest")
    public ResponseEntity<List<PolicyEntity>> searchMemberPoliciesLatest(
        @PathVariable Long id
    ) {

        Member member = memberRepository.findById(id).orElseThrow();
        String hostArea = member.getRegion();
        String mainCategory = member.getInterestPolicy();
        int age = member.getAge();

        List<PolicyEntity> policy = policyService.searchPolicyByMemberConditionsDesc(
            hostArea, mainCategory,age);

        return new ResponseEntity<>(policy, HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/search/member/{id}/deadline")
    public ResponseEntity<List<PolicyEntity>> searchMemberPoliciesDeadline(
        @PathVariable Long id
    ) {

        Member member = memberRepository.findById(id).orElseThrow();
        String hostArea = member.getRegion();
        String mainCategory = member.getInterestPolicy();
        int age = member.getAge();

        List<PolicyEntity> policy = policyService.searchPolicyByMemberConditionsAsc(
            hostArea, mainCategory, age);

        return new ResponseEntity<>(policy, HttpStatus.OK);
    }


}