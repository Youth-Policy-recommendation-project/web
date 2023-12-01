package com.backend.member.controller;




import com.backend.member.domain.Member;
import com.backend.member.domain.RefreshToken;
//import com.backend.member.domain.Role;
import com.backend.member.dto.MemberInfoRequestDto;
import com.backend.member.dto.MemberInfoResponseDto;
import com.backend.member.dto.MemberLoginDto;
import com.backend.member.dto.MemberLoginResponseDto;
import com.backend.member.dto.MemberSignupDto;
import com.backend.member.dto.MemberSignupResponseDto;
import com.backend.member.dto.RefreshTokenDto;
import com.backend.member.security.jwt.util.JwtTokenizer;
import com.backend.member.service.MemberService;
import com.backend.member.service.RefreshTokenService;
import com.backend.policy.entity.PolicyEntity;
import io.jsonwebtoken.Claims;
import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
//@RequiredArgsConstructor
@Validated
@RequestMapping("/api/members")
public class MemberController {

    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;

    public MemberController(JwtTokenizer jwtTokenizer, MemberService memberService, RefreshTokenService refreshTokenService, PasswordEncoder passwordEncoder) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
        this.refreshTokenService = refreshTokenService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody @Valid MemberSignupDto memberSignupDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        Member member = new Member();
        member.setName(memberSignupDto.getName());
        member.setEmail(memberSignupDto.getEmail());
        member.setPassword(passwordEncoder.encode(memberSignupDto.getPassword()));
        member.setDateOfBirth(memberSignupDto.getDateOfBirth());
        member.setAge(memberSignupDto.getAge(memberSignupDto.getDateOfBirth()));
        member.setRegion(memberSignupDto.getRegion());
        member.setRegion(memberSignupDto.getInterestPolicy());


        Optional<Member> savedMemberOptional = Optional.ofNullable(memberService.addMember(member));

        if (savedMemberOptional.isPresent()) {
            Member savedMember = savedMemberOptional.get();

            MemberSignupResponseDto memberSignupResponse = new MemberSignupResponseDto();
            memberSignupResponse.setId(savedMember.getId());
            memberSignupResponse.setName(savedMember.getName());
            memberSignupResponse.setRegdate(savedMember.getRegdate());
            memberSignupResponse.setEmail(savedMember.getEmail());
            memberSignupResponse.setDateOfBirth(savedMember.getDateOfBirth());
            memberSignupResponse.setAge(savedMember.getAge());
            memberSignupResponse.setRegion(savedMember.getRegion());
            memberSignupResponse.setRegion(savedMember.getInterestPolicy());

            return new ResponseEntity(memberSignupResponse, HttpStatus.CREATED);
        } else {
            return new ResponseEntity("Failed to save member", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 생년월일로 나이 계산 메서드
    private int calculateAge(LocalDate birthDate) {
        LocalDate currentDate = LocalDate.now();
        return Period.between(birthDate, currentDate).getYears();
    }
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid MemberLoginDto loginDto) {

        // email이 없을 경우 Exception이 발생한다. Global Exception에 대한 처리가 필요하다.
        Member member = memberService.findByEmail(loginDto.getEmail());
        if(!passwordEncoder.matches(loginDto.getPassword(), member.getPassword())){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
//        List<String> roles = member.getRoles().stream().map(Role::getName).collect(Collectors.toList());

        // JWT토큰을 생성하였다. jwt라이브러리를 이용하여 생성.
//        String accessToken = jwtTokenizer.createAccessToken(member.getMemberId(), member.getEmail(), roles);
//        String refreshToken = jwtTokenizer.createRefreshToken(member.getMemberId(), member.getEmail(), roles);
        String accessToken = jwtTokenizer.createAccessToken(member.getId(), member.getEmail());

//        RefreshToken refreshTokenEntity = new RefreshToken();
//        refreshTokenEntity.setValue(refreshToken);
//        refreshTokenEntity.setMemberId(member.getMemberId());
//        refreshTokenService.addRefreshToken(refreshTokenEntity);

        MemberLoginResponseDto loginResponse = MemberLoginResponseDto.builder()
                .accessToken(accessToken)
                .id(member.getId())
                .nickname(member.getName())
                .build();
        return new ResponseEntity(loginResponse, HttpStatus.OK);
    }

    @DeleteMapping("/logout")
    public ResponseEntity logout(@RequestBody RefreshTokenDto refreshTokenDto) {
        refreshTokenService.deleteRefreshToken(refreshTokenDto.getRefreshToken());
        return new ResponseEntity(HttpStatus.OK);
    }

    /*
    1. 전달받은 유저의 아이디로 유저가 존재하는지 확인한다.
    2. RefreshToken이 유효한지 체크한다.
    3. AccessToken을 발급하여 기존 RefreshToken과 함께 응답한다.
     */
    @PostMapping("/refreshToken")
    public ResponseEntity requestRefresh(@RequestBody RefreshTokenDto refreshTokenDto) {
        RefreshToken refreshToken = refreshTokenService.findRefreshToken(refreshTokenDto.getRefreshToken()).orElseThrow(() -> new BadCredentialsException("Invalid refresh token"));
        Claims claims = jwtTokenizer.parseRefreshToken(refreshToken.getValue());

        Long userId = Long.valueOf((Integer)claims.get("userId"));

        Member member = memberService.getMember(userId).orElseThrow(() -> new IllegalArgumentException("Member not found"));


//        List roles = (List) claims.get("roles");
        String email = claims.getSubject();

        String accessToken = jwtTokenizer.createAccessToken(userId, email);

        MemberLoginResponseDto loginResponse = MemberLoginResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshTokenDto.getRefreshToken())
                .id(member.getId())
                .nickname(member.getName())
                .build();
        return new ResponseEntity(loginResponse, HttpStatus.OK);
    }

    @GetMapping("/myInfo/{id}")
    public ResponseEntity getPolicyById(@PathVariable Long id) {

        Member member = memberService.findMemberById(id).orElseThrow();
        MemberInfoResponseDto memberInfoResponse =
            MemberInfoResponseDto.builder()
                .email(member.getEmail())
                .name(member.getName())
                .dateOfBirth(member.getDateOfBirth())
                .region(member.getRegion())
                .interestPolicy(member.getInterestPolicy())
                .build();
        return new ResponseEntity(memberInfoResponse, HttpStatus.OK);
    }

    @PutMapping("/myInfo/{memberId}")
    public ResponseEntity<String> updateMember(@PathVariable Long memberId, @RequestBody MemberInfoRequestDto memberInfoRequestDto) {
        try {
            Member updatedMember = new Member();
            updatedMember.setEmail(memberInfoRequestDto.getEmail());
            updatedMember.setName(memberInfoRequestDto.getName());
            updatedMember.setRegion(memberInfoRequestDto.getRegion());
            updatedMember.setDateOfBirth(memberInfoRequestDto.getDateOfBirth());
            updatedMember.setInterestPolicy(memberInfoRequestDto.getInterestPolicy());
            Member updateMember = memberService.updateMember(memberId, updatedMember);

            MemberInfoResponseDto memberInfoResponse = MemberInfoResponseDto.builder()
                .email(updateMember.getEmail())
                .name(updateMember.getName())
                .dateOfBirth(updateMember.getDateOfBirth())
                .region(updateMember.getRegion())
                .interestPolicy(updatedMember.getInterestPolicy())
                .build();

            return new ResponseEntity(memberInfoResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


//    @GetMapping("/")
//    public ResponseEntity<String> memberBoard(@PathVariable Long memberId) {
//
//    }

}
