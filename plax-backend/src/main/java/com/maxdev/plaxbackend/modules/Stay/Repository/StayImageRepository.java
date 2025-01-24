package com.maxdev.plaxbackend.modules.Stay.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.maxdev.plaxbackend.modules.Stay.StayImage;

import jakarta.transaction.Transactional;

@Repository
public interface StayImageRepository extends JpaRepository<StayImage, UUID> {

    @Modifying
    @Transactional
    @Query("DELETE FROM stay_images WHERE url IN :imageUrls")
    void deleteByUrls(@Param("imageUrls") Set<String> imageUrls);

    Optional<StayImage> findByUrl(String url);
}
