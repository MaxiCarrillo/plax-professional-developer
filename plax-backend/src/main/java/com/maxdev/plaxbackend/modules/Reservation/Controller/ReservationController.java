package com.maxdev.plaxbackend.modules.Reservation.Controller;

import com.maxdev.plaxbackend.modules.Reservation.DTO.ReservationCreateDTO;
import com.maxdev.plaxbackend.modules.Reservation.DTO.ReservationDTO;
import com.maxdev.plaxbackend.modules.Reservation.Repository.ReservationRepository;
import com.maxdev.plaxbackend.modules.Reservation.Reservation;
import com.maxdev.plaxbackend.modules.Reservation.Service.ReservationService;
import com.maxdev.plaxbackend.modules.Util.ApiPageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Log4j2
@RestController
@Tag(name = "Reservation", description = "Operaciones relacionadas con las reservas.")
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;
    private final ReservationRepository reservationRepository;

    public ReservationController(ReservationService reservationService, ReservationRepository reservationRepository) {
        this.reservationService = reservationService;
        this.reservationRepository = reservationRepository;
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<ReservationCreateDTO> createReservation(@RequestBody ReservationCreateDTO reservationCreateDTO) {
        log.debug("Received request to create reservation");
        ReservationCreateDTO savedReservation = reservationService.save(reservationCreateDTO);
        log.info("Reservation created: {}", savedReservation);
        return ResponseEntity.
                status(HttpStatus.CREATED)
                .body(savedReservation);
    }

    @GetMapping
    public ResponseEntity<ApiPageResponse<List<ReservationDTO>>> getAllReservations(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        log.debug("Received request to get all reservations");
        Pageable pageable = PageRequest.of(page, size);
        Page<ReservationDTO> pageReservations = reservationService.findAll(pageable);
        List<ReservationDTO> reservations = pageReservations.getContent();
        log.info("Returning {} reservations", reservations.size());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new ApiPageResponse<>(
                                pageReservations.getTotalPages(),
                                (int) pageReservations.getTotalElements(),
                                reservations,
                                "Reservations retrieved successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservation(@PathVariable("id") UUID id) {
        log.debug("Received request to get reservation with id: {}", id);
        ReservationDTO reservation = reservationService.findById(id);
        log.info("Returning reservation with id: {}", id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reservation);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{id}")

    public ResponseEntity<Void> deleteReservation(@PathVariable("id") UUID id) {
        log.debug("Received request to delete reservation with id: {}", id);
        reservationService.delete(id);
        log.info("Reservation with id: {} deleted successfully", id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user")
    public ResponseEntity<List<ReservationDTO>> getReservationsByToken(
            @RequestParam(value = "date", required = false) LocalDate date
    ) {
        log.debug("Received request to get reservations by token");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        List<ReservationDTO> reservations = reservationService.getReservationsByUser(userDetails.getUsername(), date);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reservations);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/confirm/{id}")
    public ResponseEntity<ReservationDTO> confirmReservation(@PathVariable("id") UUID id) {
        log.debug("Received request to confirm reservation with id: {}", id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        ReservationDTO reservation = reservationService.confirmReservation(id, userDetails.getUsername());
        log.info("Reservation with id: {} confirmed successfully", id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(reservation);
    }

}
