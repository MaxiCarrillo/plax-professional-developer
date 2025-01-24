package com.maxdev.plaxbackend.modules.Review.Controller;

import com.maxdev.plaxbackend.modules.Review.DTO.ReviewCreateDTO;
import com.maxdev.plaxbackend.modules.Review.DTO.ReviewSummaryDTO;
import com.maxdev.plaxbackend.modules.Review.Service.ReviewService;
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

import java.util.List;
import java.util.UUID;

@Log4j2
@RestController
@Tag(name = "Review", description = "Operaciones relacionadas con las reseñas.")
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<ApiPageResponse<List<ReviewSummaryDTO>>> getAllReviews(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        log.debug("Received request to get all reviews");
        Pageable pageable = PageRequest.of(page, size);
        Page<ReviewSummaryDTO> pageReviews = reviewService.findAll(pageable);
        log.info("Reviews found: {}", pageReviews);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiPageResponse<>(
                        pageReviews.getTotalPages(),
                        (int) pageReviews.getTotalElements(),
                        pageReviews.getContent(),
                        "Reviews retrieved successfully"
                ));
    }

    @GetMapping("/stay/{id}")
    public ResponseEntity<ApiPageResponse<List<ReviewSummaryDTO>>> getAllReviewsByStay(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @PathVariable("id") UUID id) {
        log.debug("Received request to get all reviews");
        Pageable pageable = PageRequest.of(page, size);
        Page<ReviewSummaryDTO> pageReviews = reviewService.findByStay(pageable, id);
        log.info("Reviews found: {}", pageReviews);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiPageResponse<>(
                        pageReviews.getTotalPages(),
                        (int) pageReviews.getTotalElements(),
                        pageReviews.getContent(),
                        "Reviews retrieved successfully"
                ));
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<String> createReview(@RequestBody ReviewCreateDTO reviewCreateDTO) {
        log.debug("Received request to create review");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        reviewService.save(reviewCreateDTO, userDetails.getUsername());
        log.info("Review created");
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("La reseña ha sido creada exitosamente");
    }

}
