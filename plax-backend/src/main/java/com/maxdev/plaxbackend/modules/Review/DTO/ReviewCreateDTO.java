package com.maxdev.plaxbackend.modules.Review.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewCreateDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Integer qualification;
    private String comment;
    private UUID id_stay;
    private UUID id_reservation;
}
