package com.backend.member.service;



import com.backend.member.domain.Member;
import com.backend.member.repository.MemberRepository;
import com.backend.member.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;

    @Transactional(readOnly = true)
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));
    }

    @Transactional
    public Member addMember(Member member) {
//        Optional<Role> userRole = roleRepository.findByName("ROLE_USER");
//        member.addRole(userRole.get());
        Member saveMember = memberRepository.save(member);
        return saveMember;
    }

    @Transactional(readOnly = true)
    public Optional<Member> getMember(Long memberId) {
        return memberRepository.findById(memberId);
    }

    @Transactional(readOnly = true)
    public Optional<Member> findMemberById(Long id) {
        return memberRepository.findById(id);
    }

    @Transactional
    public Member updateMember(Long memberId, Member updatedMember) {
        Member existingMember = memberRepository.findById(memberId)
            .orElseThrow(() -> new RuntimeException("해당 회원을 찾을 수 없습니다."));

        // 업데이트할 필드들을 확인하여 업데이트
        if (updatedMember.getEmail() != null) {
            existingMember.setEmail(updatedMember.getEmail());
        }

        if (updatedMember.getName() != null) {
            existingMember.setName(updatedMember.getName());
        }

        if (updatedMember.getRegion() != null) {
            existingMember.setRegion(updatedMember.getRegion());
        }

        if (updatedMember.getInterestPolicy() != null) {
            existingMember.setInterestPolicy(updatedMember.getInterestPolicy());
        }


        if (updatedMember.getAge() != 0) {
            existingMember.setAge(updatedMember.getAge());
        }

        if (updatedMember.getDateOfBirth() != null) {
            existingMember.setDateOfBirth(updatedMember.getDateOfBirth());
        }

        memberRepository.save(existingMember);
        return existingMember;
    }
}
