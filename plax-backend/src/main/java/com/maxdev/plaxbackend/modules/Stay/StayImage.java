package com.maxdev.plaxbackend.modules.Stay;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "stay_images")
public class StayImage {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;
    @NotNull(message = "Url cannot be null")
    private String url;
}
