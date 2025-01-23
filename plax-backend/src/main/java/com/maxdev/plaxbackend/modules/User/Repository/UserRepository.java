package com.maxdev.plaxbackend.modules.User.Repository;

import com.maxdev.plaxbackend.modules.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndPassword(String email, String password);

    Boolean existsByEmail(String email);

    @Query("""
                SELECT u FROM users u
                JOIN u.favorites f
                WHERE f.id IN :favoritesIds
            """)
    Set<User> findByFavoritesIds(Set<UUID> favoritesIds);
}
