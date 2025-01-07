package com.maxdev.plaxbackend.modules.Review.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
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
    private LocalDate createdAt;
    private UUID id_user;
    private UUID id_stay;
}
