package com.maxdev.plaxbackend.modules.Review.Service;

import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Reservation.Repository.ReservationRepository;
import com.maxdev.plaxbackend.modules.Reservation.Reservation;
import com.maxdev.plaxbackend.modules.Review.DTO.ReviewCreateDTO;
import com.maxdev.plaxbackend.modules.Review.DTO.ReviewSummaryDTO;
import com.maxdev.plaxbackend.modules.Review.Mapper.ReviewCreateMapper;
import com.maxdev.plaxbackend.modules.Review.Mapper.ReviewSummaryMapper;
import com.maxdev.plaxbackend.modules.Review.Repository.ReviewRepository;
import com.maxdev.plaxbackend.modules.Review.Review;
import com.maxdev.plaxbackend.modules.Stay.Repository.StayRepository;
import com.maxdev.plaxbackend.modules.Stay.Stay;
import com.maxdev.plaxbackend.modules.User.Repository.UserRepository;
import com.maxdev.plaxbackend.modules.User.User;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Log4j2
@Service
public class ReviewService implements IReviewService {

    private final ReviewRepository reviewRepository;
    private final StayRepository stayRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;

    public ReviewService(ReviewRepository reviewRepository, StayRepository stayRepository, UserRepository userRepository, ReservationRepository reservationRepository) {
        this.reviewRepository = reviewRepository;
        this.stayRepository = stayRepository;
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public Page<ReviewSummaryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Reviews");
        Page<ReviewSummaryDTO> reviews = reviewRepository.findAll(pageable).map(ReviewSummaryMapper.INSTANCE::entityToDto);
        log.info("Reviews found: {}", reviews);
        return reviews;
    }

    @Override
    public Page<ReviewSummaryDTO> findByStay(Pageable pageable, UUID id) {
        log.debug("Request to get all Reviews by stay id: {}", id);
        Page<ReviewSummaryDTO> reviews = reviewRepository.findByStayId(id, pageable).map(ReviewSummaryMapper.INSTANCE::entityToDto);
        log.info("Reviews found: {}", reviews);
        return reviews;
    }

    @Override
    public ReviewSummaryDTO save(ReviewCreateDTO reviewCreateDTO, String email) {
        log.debug("Request to save Review : {}", reviewCreateDTO);

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            log.error("User with email: {} not found", email);
            return new ResourceNotFoundException("User with email: " + email + " not found");
        });

        Stay stay = stayRepository.findById(reviewCreateDTO.getId_stay()).orElseThrow(() -> {
            log.error("Stay with id: {} not found", reviewCreateDTO.getId_stay());
            return new ResourceNotFoundException("Stay with id: " + reviewCreateDTO.getId_stay() + " not found");
        });

        Reservation reservation = reservationRepository.findById(reviewCreateDTO.getId_reservation()).orElseThrow(() -> {
            log.error("Reservation with id: {} not found", reviewCreateDTO.getId_reservation());
            return new ResourceNotFoundException("Reservation with id: " + reviewCreateDTO.getId_reservation() + " not found");
        });

        Review review = ReviewCreateMapper.INSTANCE.dtoToEntity(reviewCreateDTO);
        review.setUser(user);
        review.setCreatedAt(LocalDateTime.now());
        reviewRepository.save(review);
        log.info("Review saved: {}", review);

        reservation.setReview(review);
        reservation.setReviewed(true);
        reservationRepository.save(reservation);
        log.info("Reservation updated: {}", reservation);

        Double average = reviewRepository.findByStayId(reviewCreateDTO.getId_stay())
                .stream()
                .mapToDouble(Review::getQualification)
                .average()
                .orElse(0.0);

        log.info("Average qualification: {}", average);
        stay.setAppreciation(average);
        stayRepository.save(stay);

        log.info("Stay updated: {}", stay);
        return ReviewSummaryMapper.INSTANCE.entityToDto(review);
    }
}
