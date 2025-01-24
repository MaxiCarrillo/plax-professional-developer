package com.maxdev.plaxbackend.modules.Reservation.Service;

import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Reservation.DTO.ReservationCreateDTO;
import com.maxdev.plaxbackend.modules.Reservation.DTO.ReservationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface IReservationService {

    ReservationCreateDTO save(ReservationCreateDTO reservationCreateDTO);

    ReservationDTO findById(UUID id);

    Page<ReservationDTO> findAll(Pageable pageable);

    ReservationDTO delete(UUID id) throws ResourceNotFoundException;

    List<ReservationDTO> getReservationsByUser(String email, LocalDate date);

    ReservationDTO confirmReservation(UUID id, String email) throws ResourceNotFoundException;
}
