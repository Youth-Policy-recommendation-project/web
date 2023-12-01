package com.backend.member.domain;



import com.backend.policy.entity.PolicyEntity;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "policy_board")
public class PolicyBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String boardName;

    @OneToMany(mappedBy = "policyBoard", cascade = CascadeType.ALL)
    private List<PolicyEntity> policies;

    @OneToOne
    @JoinColumn(name = "id")
    private Member member;


}
