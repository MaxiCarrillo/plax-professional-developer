package com.maxdev.plaxbackend.modules.Stay.Repository;

import com.maxdev.plaxbackend.modules.Stay.Stay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface StayRepository extends JpaRepository<Stay, UUID> {

    Optional<Stay> findByName(String name);

    Set<Stay> findByCategory_IdIn(Set<UUID> categoryIds);

    @Query("""
                SELECT s FROM stays s 
                WHERE (:categoryIds IS NULL OR s.category.id IN :categoryIds)
                AND (:searchTerm IS NULL OR LOWER(s.address.country) LIKE LOWER(CONCAT('%', :searchTerm, '%')) 
                                          OR LOWER(s.address.city) LIKE LOWER(CONCAT('%', :searchTerm, '%')))
                AND (:checkIn IS NULL OR :checkOut IS NULL OR NOT EXISTS (
                    SELECT r FROM reservations r
                    WHERE r.stay.id = s.id
                    AND r.checkIn <= :checkOut
                    AND r.checkOut >= :checkIn
                ))
            """)
    Set<Stay> findByCategoryAndCountryOrCityContainingIgnoreCase(
            @Param("categoryIds") Set<UUID> categoryIds,
            @Param("searchTerm") String searchTerm,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
    );

    @Query("""
                    SELECT s FROM stays s
                    JOIN s.features f
                    WHERE f.id IN :featureIds
            """)
    Set<Stay> findByFeatureIds(@Param("featureIds") Set<UUID> featureIds);
}
