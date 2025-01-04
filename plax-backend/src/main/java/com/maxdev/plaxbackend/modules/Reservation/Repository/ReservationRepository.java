package com.maxdev.plaxbackend.modules.Reservation.Repository;

import com.maxdev.plaxbackend.modules.Reservation.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {

    List<Reservation> findReservationByUser_Email(String userEmail);
}
