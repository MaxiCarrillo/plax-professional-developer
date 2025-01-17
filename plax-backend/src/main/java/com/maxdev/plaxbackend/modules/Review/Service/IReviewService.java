package com.maxdev.plaxbackend.modules.Review.Service;

import com.maxdev.plaxbackend.modules.Review.DTO.ReviewCreateDTO;
import com.maxdev.plaxbackend.modules.Review.DTO.ReviewSummaryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface IReviewService {

    Page<ReviewSummaryDTO> findAll(Pageable pageable);

    Page<ReviewSummaryDTO> findByStay(Pageable pageable, UUID id);

    ReviewSummaryDTO save(ReviewCreateDTO reviewCreateDTO, String email);


}