package com.backend.policy.repository;

import com.backend.policy.entity.PolicyEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PolicyRepository extends JpaRepository<PolicyEntity, Integer> {

    // 기본 메서드
    List<PolicyEntity> findAll();



    // Case 2: mainCategory.isEmpty() && age.isEmpty()
    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea ")
    List<PolicyEntity> findPoliciesByHostArea(
        @Param("hostArea") String hostArea
    );


    @Query("SELECT p FROM policy p " +
        "WHERE p.mainCategory = :mainCategory ")
    // Case 3: (hostArea.isEmpty() && age.isEmpty())
    List<PolicyEntity> findPoliciesByMainCategory(
        @Param("mainCategory") String mainCategory
    );



    @Query("SELECT p FROM policy p " +
        "WHERE p.mainCategory = :mainCategory " +
        "AND p.segCategory = :segCategory ")
        // Case 3: (hostArea.isEmpty() && age.isEmpty())
    List<PolicyEntity> findPoliciesByMainCategoryAndSegCategory(
        @Param("mainCategory") String mainCategory,
        @Param("segCategory") String segCategory
    );

    @Query("SELECT p FROM policy p " +
        "WHERE :age BETWEEN p.startAge AND p.endAge")

    // Case 4: hostArea와 mainCategory가 비어 있는 경우
    List<PolicyEntity> findPoliciesByStartAgeBetweenEndAge(
        @Param("age") int age
    );

    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND p.mainCategory = :mainCategory " +
        "AND p.segCategory = :segCategory ")

    // Case 5: age가 비어 있는 경우
    List<PolicyEntity> findPoliciesByHostAreaAndMainCategoryAndSegCategory(
        @Param("hostArea") String hostArea,
        @Param("mainCategory") String mainCategory,
        @Param("segCategory") String segCategory
    );

    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND p.mainCategory = :mainCategory " )

        // Case 5: age가 비어 있는 경우
    List<PolicyEntity> findPoliciesByHostAreaAndMainCategory(
        @Param("hostArea") String hostArea,
        @Param("mainCategory") String mainCategory
    );
    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND :age BETWEEN p.startAge AND p.endAge")

    // Case 6: mainCategory가 비어 있는 경우
    List<PolicyEntity> findPoliciesByHostAreaAndAge(
        @Param("hostArea") String hostArea,
        @Param("age") int age
    );


    @Query("SELECT p FROM policy p " +
        "WHERE p.mainCategory = :mainCategory " +
        "AND p.segCategory = :segCategory " +
        "AND :age BETWEEN p.startAge AND p.endAge")
    // Case 7: hostArea가 비어 있는 경우
    List<PolicyEntity> findPoliciesByAgeAndMainCategoryAndSegCategory(
        @Param("mainCategory") String mainCategory,
        @Param("segCategory") String segCategory,
        @Param("age") int age
    );


    @Query("SELECT p FROM policy p " +
        "WHERE p.mainCategory = :mainCategory " +
        "AND :age BETWEEN p.startAge AND p.endAge")
        // Case 7: hostArea가 비어 있는 경우
    List<PolicyEntity> findPoliciesByAgeAndMainCategory(
        @Param("mainCategory") String mainCategory,
        @Param("age") int age
    );

    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND p.mainCategory = :mainCategory " +

        "AND :age BETWEEN p.startAge AND p.endAge")
    List<PolicyEntity> findPoliciesByMainCategoryAndHostAreaAndAge(
        @Param("hostArea") String hostArea,
        @Param("mainCategory") String mainCategory,
        @Param("age") int age
    );


    // 나머지 경우: 모든 필드가 비어 있지 않은 경우
    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND p.mainCategory = :mainCategory " +
        "AND p.segCategory = :segCategory " +
        "AND :age BETWEEN p.startAge AND p.endAge")
    List<PolicyEntity> findPoliciesByConditions(
        @Param("hostArea") String hostArea,
        @Param("mainCategory") String mainCategory,
        @Param("segCategory") String segCategory,
        @Param("age") int age
    );


    //    #### business_apply_start 내림차순 ####

    List<PolicyEntity> findAllByOrderByBusinessApplyStartDesc();

    // Case 2: mainCategory.isEmpty() && age.isEmpty()
    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "ORDER BY p.businessApplyStart DESC")
    List<PolicyEntity> findPoliciesByHostAreaOrderByLatest(
        @Param("hostArea") String hostArea
    );


    @Query("SELECT p FROM policy p " +
        "WHERE p.mainCategory = :mainCategory "+
        "ORDER BY p.businessApplyStart DESC")
        // Case 3: (hostArea.isEmpty() && age.isEmpty())
    List<PolicyEntity> findPoliciesByMainCategoryOrderByLatest(
        @Param("mainCategory") String mainCategory
    );



    @Query("SELECT p FROM policy p " +
        "WHERE p.mainCategory = :mainCategory " +
        "AND p.segCategory = :segCategory "+
        "ORDER BY p.businessApplyStart DESC")
        // Case 3: (hostArea.isEmpty() && age.isEmpty())
    List<PolicyEntity> findPoliciesByMainCategoryAndSegCategoryOrderByLatest(
        @Param("mainCategory") String mainCategory,
        @Param("segCategory") String segCategory
    );

    @Query("SELECT p FROM policy p " +
        "WHERE :age BETWEEN p.startAge AND p.endAge " +
        "ORDER BY p.businessApplyStart DESC")

        // Case 4: hostArea와 mainCategory가 비어 있는 경우
    List<PolicyEntity> findPoliciesByStartAgeBetweenEndAgeOrderByLatest(
        @Param("age") int age
    );

    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND p.mainCategory = :mainCategory " +
        "AND p.segCategory = :segCategory "+
        "ORDER BY p.businessApplyStart DESC")

        // Case 5: age가 비어 있는 경우
    List<PolicyEntity> findPoliciesByHostAreaAndMainCategoryAndSegCategoryOrderByLatest(
        @Param("hostArea") String hostArea,
        @Param("mainCategory") String mainCategory,
        @Param("segCategory") String segCategory
    );

    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND p.mainCategory = :mainCategory "+
        "ORDER BY p.businessApplyStart DESC")

        // Case 5: age가 비어 있는 경우
    List<PolicyEntity> findPoliciesByHostAreaAndMainCategoryOrderByLatest(
        @Param("hostArea") String hostArea,
        @Param("mainCategory") String mainCategory
    );
    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND :age BETWEEN p.startAge AND p.endAge " +
        "ORDER BY p.businessApplyStart DESC")
        // Case 6: mainCategory가 비어 있는 경우
    List<PolicyEntity> findPoliciesByHostAreaAndAgeOrderByLatest(
        @Param("hostArea") String hostArea,
        @Param("age") int age
    );


    @Query("SELECT p FROM policy p " +
        "WHERE p.mainCategory = :mainCategory " +
        "AND p.segCategory = :segCategory " +
        "AND :age BETWEEN p.startAge AND p.endAge " +
        "ORDER BY p.businessApplyStart DESC")
        // Case 7: hostArea가 비어 있는 경우
    List<PolicyEntity> findPoliciesByAgeAndMainCategoryAndSegCategoryOrderByLatest(
        @Param("mainCategory") String mainCategory,
        @Param("segCategory") String segCategory,
        @Param("age") int age
    );


    @Query("SELECT p FROM policy p " +
        "WHERE p.mainCategory = :mainCategory " +
        "AND :age BETWEEN p.startAge AND p.endAge " +
        "ORDER BY p.businessApplyStart DESC")
        // Case 7: hostArea가 비어 있는 경우
    List<PolicyEntity> findPoliciesByAgeAndMainCategoryOrderByLatest(
        @Param("mainCategory") String mainCategory,
        @Param("age") int age
    );

    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND p.mainCategory = :mainCategory " +

        "AND :age BETWEEN p.startAge AND p.endAge " +
        "ORDER BY p.businessApplyStart DESC")
    List<PolicyEntity> findPoliciesByMainCategoryAndHostAreaAndAgeOrderByLatest(
        @Param("hostArea") String hostArea,
        @Param("mainCategory") String mainCategory,
        @Param("age") int age
    );


    // 나머지 경우: 모든 필드가 비어 있지 않은 경우
    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND p.mainCategory = :mainCategory " +
        "AND p.segCategory = :segCategory " +
        "AND :age BETWEEN p.startAge AND p.endAge " +
        "ORDER BY p.businessApplyStart DESC")
    List<PolicyEntity> findPoliciesByConditionsOrderByLatest(
        @Param("hostArea") String hostArea,
        @Param("mainCategory") String mainCategory,
        @Param("segCategory") String segCategory,
        @Param("age") int age
    );






    // #### business_apply_end 오름차순 ####

    List<PolicyEntity> findAllByOrderByBusinessApplyEndAsc();

    // Case 2: mainCategory.isEmpty() && age.isEmpty()
    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "ORDER BY p.businessApplyEnd asc ")
    List<PolicyEntity> findPoliciesByHostAreaOrderByAsc(
        @Param("hostArea") String hostArea
    );


    @Query("SELECT p FROM policy p " +
        "WHERE p.mainCategory = :mainCategory "+
        "ORDER BY p.businessApplyEnd asc")
        // Case 3: (hostArea.isEmpty() && age.isEmpty())
    List<PolicyEntity> findPoliciesByMainCategoryOrderByAsc(
        @Param("mainCategory") String mainCategory
    );



    @Query("SELECT p FROM policy p " +
        "WHERE p.mainCategory = :mainCategory " +
        "AND p.segCategory = :segCategory "+
        "ORDER BY p.businessApplyEnd asc")
        // Case 3: (hostArea.isEmpty() && age.isEmpty())
    List<PolicyEntity> findPoliciesByMainCategoryAndSegCategoryOrderByAsc(
        @Param("mainCategory") String mainCategory,
        @Param("segCategory") String segCategory
    );

    @Query("SELECT p FROM policy p " +
        "WHERE :age BETWEEN p.startAge AND p.endAge " +
        "ORDER BY p.businessApplyEnd asc")

        // Case 4: hostArea와 mainCategory가 비어 있는 경우
    List<PolicyEntity> findPoliciesByStartAgeBetweenEndAgeOrderByAsc(
        @Param("age") int age
    );

    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND p.mainCategory = :mainCategory " +
        "AND p.segCategory = :segCategory "+
        "ORDER BY p.businessApplyEnd asc")

        // Case 5: age가 비어 있는 경우
    List<PolicyEntity> findPoliciesByHostAreaAndMainCategoryAndSegCategoryOrderByAsc(
        @Param("hostArea") String hostArea,
        @Param("mainCategory") String mainCategory,
        @Param("segCategory") String segCategory
    );

    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND p.mainCategory = :mainCategory "+
        "ORDER BY p.businessApplyEnd asc")

        // Case 5: age가 비어 있는 경우
    List<PolicyEntity> findPoliciesByHostAreaAndMainCategoryOrderByAsc(
        @Param("hostArea") String hostArea,
        @Param("mainCategory") String mainCategory
    );
    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND :age BETWEEN p.startAge AND p.endAge " +
        "ORDER BY p.businessApplyEnd asc")
        // Case 6: mainCategory가 비어 있는 경우
    List<PolicyEntity> findPoliciesByHostAreaAndAgeOrderByAsc(
        @Param("hostArea") String hostArea,
        @Param("age") int age
    );


    @Query("SELECT p FROM policy p " +
        "WHERE p.mainCategory = :mainCategory " +
        "AND p.segCategory = :segCategory " +
        "AND :age BETWEEN p.startAge AND p.endAge " +
        "ORDER BY p.businessApplyEnd asc")
        // Case 7: hostArea가 비어 있는 경우
    List<PolicyEntity> findPoliciesByAgeAndMainCategoryAndSegCategoryOrderByAsc(
        @Param("mainCategory") String mainCategory,
        @Param("segCategory") String segCategory,
        @Param("age") int age
    );


    @Query("SELECT p FROM policy p " +
        "WHERE p.mainCategory = :mainCategory " +
        "AND :age BETWEEN p.startAge AND p.endAge " +
        "ORDER BY p.businessApplyEnd asc")
        // Case 7: hostArea가 비어 있는 경우
    List<PolicyEntity> findPoliciesByAgeAndMainCategoryOrderByAsc(
        @Param("mainCategory") String mainCategory,
        @Param("age") int age
    );

    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND p.mainCategory = :mainCategory " +

        "AND :age BETWEEN p.startAge AND p.endAge " +
        "ORDER BY p.businessApplyEnd asc")
    List<PolicyEntity> findPoliciesByMainCategoryAndHostAreaAndAgeOrderByAsc(
        @Param("hostArea") String hostArea,
        @Param("mainCategory") String mainCategory,
        @Param("age") int age
    );


    // 나머지 경우: 모든 필드가 비어 있지 않은 경우
    @Query("SELECT p FROM policy p " +
        "WHERE p.hostArea = :hostArea " +
        "AND p.mainCategory = :mainCategory " +
        "AND p.segCategory = :segCategory " +
        "AND :age BETWEEN p.startAge AND p.endAge " +
        "ORDER BY p.businessApplyEnd asc")
    List<PolicyEntity> findPoliciesByConditionsOrderByAsc(
        @Param("hostArea") String hostArea,
        @Param("mainCategory") String mainCategory,
        @Param("segCategory") String segCategory,
        @Param("age") int age
    );


}