package com.maxdev.plaxbackend.modules.Reservation.Service;

import com.maxdev.plaxbackend.modules.Email.Service.EmailService;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Reservation.DTO.ReservationCreateDTO;
import com.maxdev.plaxbackend.modules.Reservation.DTO.ReservationDTO;
import com.maxdev.plaxbackend.modules.Reservation.Mapper.ReservationCreateMapper;
import com.maxdev.plaxbackend.modules.Reservation.Mapper.ReservationMapper;
import com.maxdev.plaxbackend.modules.Reservation.Repository.ReservationRepository;
import com.maxdev.plaxbackend.modules.Reservation.Reservation;
import com.maxdev.plaxbackend.modules.Stay.Repository.StayRepository;
import com.maxdev.plaxbackend.modules.Util.BaseUrl;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Log4j2
@Service
public class ReservationService implements IReservationService, BaseUrl {

    private final ReservationRepository reservationRepository;
    private final StayRepository stayRepository;
    private final EmailService emailService;

    public ReservationService(ReservationRepository reservationRepository, StayRepository stayRepository, EmailService emailService) {
        this.reservationRepository = reservationRepository;
        this.stayRepository = stayRepository;
        this.emailService = emailService;
    }

    @Override
    public ReservationCreateDTO save(ReservationCreateDTO reservationCreateDTO) {
        List<Reservation> overlappingReservations = reservationRepository.findOverlappingReservations(
                reservationCreateDTO.getCheckIn(),
                reservationCreateDTO.getCheckOut(),
                reservationCreateDTO.getId_stay()
        );
        if (!overlappingReservations.isEmpty()) {
            log.error("Reservation overlaps with existing reservations");
            throw new IllegalArgumentException("La estancia ya está reservada en las fechas seleccionadas.");
        }
        Reservation reservation = ReservationCreateMapper.INSTANCE.dtoToEntity(reservationCreateDTO);
        Double price = stayRepository.findById(reservation.getStay().getId()).orElseThrow(
                () -> {
                    log.error("Stay with id: {} not found", reservation.getStay().getId());
                    return new ResourceNotFoundException("Stay with id: " + reservation.getStay().getId() + " not found");
                }).getPrice(
        );
        int days = reservation.getCheckOut().compareTo(reservation.getCheckIn());
        if (days == 0) days = 1;
        reservation.setTotal(price * days);
        reservation.setConfirmed(false);
        reservation.setReviewed(false);
        reservationRepository.save(reservation);
        log.info("Reservation saved: {}", reservation.getId());
        return ReservationCreateMapper.INSTANCE.entityToDto(reservation);
    }

    @Override
    public Page<ReservationDTO> findAll(Pageable pageable) {
        log.debug("Getting all reservations");
        return reservationRepository.findAll(pageable).map(ReservationMapper.INSTANCE::entityToDto);
    }

    @Override
    public ReservationDTO findById(UUID id) {
        log.debug("Getting reservation with id: {}", id);
        Reservation reservation = reservationRepository.findById(id).orElseThrow(() -> {
            log.error("Reservation with id: {} not found", id);
            return new ResourceNotFoundException("Reservation with id: " + id + " not found");
        });
        return ReservationMapper.INSTANCE.entityToDto(reservation);
    }

    @Override
    public ReservationDTO delete(UUID id) throws ResourceNotFoundException {
        log.debug("Deleting reservation with id: {}", id);
        Reservation reservationToDelete = reservationRepository.findById(id).orElseThrow(() -> {
            log.error("Reservation with id: {} not found", id);
            return new ResourceNotFoundException("Reservation with id: " + id + " not found");
        });
        reservationRepository.delete(reservationToDelete);
        log.info("Reservation deleted: {}", id);
        return ReservationMapper.INSTANCE.entityToDto(reservationToDelete);
    }

    @Override
    public List<ReservationDTO> getReservationsByUser(String email, LocalDate date) {
        log.debug("Getting reservations by user with email: {}", email);
        List<Reservation> reservations;
        if (date != null) {
            reservations = reservationRepository.findReservationByUserEmailAndDate(email, date);
        } else {
            reservations = reservationRepository.findReservationByUser_Email(email);
        }
        List<ReservationDTO> reservationDTOS = reservations.stream().map(ReservationMapper.INSTANCE::entityToDto).toList();
        reservationDTOS.forEach(reservationDTO -> {
            reservationDTO.getStay().setImages(reservationDTO.getStay().getImages().stream()
                    .map((image) -> getBaseUrl() + "/api/stays/images/" + image)
                    .collect(Collectors.toSet())
            );
        });
        return reservationDTOS;
    }

    @Override
    public ReservationDTO confirmReservation(UUID id, String email) throws ResourceNotFoundException {
        log.debug("Confirming reservation with id: {}", id);
        Reservation reservation = reservationRepository.findById(id).orElseThrow(() -> {
            log.error("Reservation with id: {} not found", id);
            return new ResourceNotFoundException("La reserva con el id: " + id + " no se ha encontrado.");
        });
        if (!reservation.getUser().getEmail().equals(email)) {
            log.error("User with email: {} is not the owner of the reservation with id: {}", email, id);
            throw new ResourceNotFoundException("El usuario con el email: " + email + " no es propietario de la reserva con el id: " + id);
        }
        if (reservation.getConfirmed()) {
            log.error("Reservation with id: {} is already confirmed", id);
            throw new IllegalArgumentException("La reserva ya está confirmada.");
        }
        reservation.setConfirmed(true);
        reservationRepository.save(reservation);
        log.info("Reservation confirmed: {}", id);
        try {
            emailService.sendConfirmReservation(reservation.getUser().getFirstname(), reservation.getUser().getLastname(), reservation.getUser().getEmail());
        } catch (Exception e) {
            log.error("Error enviando el mail: {}", e.getMessage());
        }
        return ReservationMapper.INSTANCE.entityToDto(reservation);
    }

}
