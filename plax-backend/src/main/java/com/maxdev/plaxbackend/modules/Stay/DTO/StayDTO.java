package com.maxdev.plaxbackend.modules.Stay.DTO;

import com.maxdev.plaxbackend.modules.Address.DTO.AddressDTO;
import com.maxdev.plaxbackend.modules.Feature.DTO.FeatureDTO;
import com.maxdev.plaxbackend.modules.Review.DTO.ReviewSummaryDTO;
import com.maxdev.plaxbackend.modules.Stay.StayPolicy;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StayDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private UUID id;
    private String name;
    private String description;
    private Set<String> images;
    private Set<FeatureDTO> features;
    private Double price;
    private UUID category_id;
    private AddressDTO address;
    private Double appreciation;
    private Set<StayPolicy> policies;
    private Set<LocalDate> unavailableDates;
    private Set<ReviewSummaryDTO> reviews;
    private Integer totalReviews;
}
