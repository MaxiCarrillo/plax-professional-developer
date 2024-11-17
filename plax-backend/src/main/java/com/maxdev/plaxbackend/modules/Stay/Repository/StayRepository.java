package com.maxdev.plaxbackend.modules.Stay.Repository;

import com.maxdev.plaxbackend.modules.Stay.Stay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface StayRepository extends JpaRepository<Stay, UUID> {
    Optional<Stay> findByName(String name);

    Set<Stay> findByCategory_IdIn(Set<UUID> categoryIds);
}
