package com.maxdev.plaxbackend.modules.Reservation.Repository;

import com.maxdev.plaxbackend.modules.Reservation.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {


    List<Reservation> findReservationByUser_Email(String userEmail);

    @Query("SELECT r FROM reservations r WHERE r.user.email = :email AND " +
            "(:date IS NULL OR (r.checkOut >= :date))")
    List<Reservation> findReservationByUserEmailAndDate(@Param("email") String userEmail, @Param("date") LocalDate date);
}
