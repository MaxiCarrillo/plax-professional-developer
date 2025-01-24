package com.maxdev.plaxbackend.modules.Stay;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
@Entity(name = "stay_policies")
public class StayPolicy {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    @NotNull(message = "Name cannot be null")
    private String policy;

    @NotNull(message = "Description cannot be null")
    private String description;
}
