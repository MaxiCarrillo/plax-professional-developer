package com.maxdev.plaxbackend.modules.Stay.DTO;

import com.maxdev.plaxbackend.modules.Address.DTO.AddressDTO;
import com.maxdev.plaxbackend.modules.Stay.StayPolicy;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaySaveDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private UUID id;
    private String name;
    private String description;
    private Set<String> images;
    private Double price;
    private AddressDTO address;
    private UUID category_id;
    private Set<UUID> features;
    private Set<StayPolicy> policies;
}
