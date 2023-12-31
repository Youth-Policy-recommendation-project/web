package com.backend.member.domain;



import java.time.LocalDate;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import org.springframework.format.annotation.DateTimeFormat;

@Entity // Database Table과 맵핑하는 객체.
@Table(name="member") // Database 테이블 이름 user3 와 User라는 객체가 맵핑.
@NoArgsConstructor // 기본생성자가 필요하다.
@Setter
@Getter
public class Member {
    @Id // 이 필드가 Table의 PK.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // userId는 자동으로 생성되도록 한다. 1,2,3,4
    private Long id;

    @Column(length = 255)
    private String email;

    @Column(length = 50)
    private String name;

    @Column(length = 500)
    private String password;

    private String region;
    private int age;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    private String interestPolicy;

    @CreationTimestamp // 현재시간이 저장될 때 자동으로 생성.
    private LocalDateTime regdate;


    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private PolicyBoard policyBoard;


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", regdate=" + regdate +
                '}';
    }

//    public void addRole(Role role) {
//        roles.add(role);
//    }
}

// User -----> Role