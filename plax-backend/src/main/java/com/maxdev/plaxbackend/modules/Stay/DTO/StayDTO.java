package com.maxdev.plaxbackend.modules.Stay.DTO;

import lombok.*;

import java.io.Serial;
import java.io.Serializable;
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
    private Double price;
    private UUID category_id;
    private String address;
}
