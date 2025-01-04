package com.maxdev.plaxbackend.modules.Stay.DTO;

import com.maxdev.plaxbackend.modules.Address.DTO.AddressDTO;
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
public class StaySummaryDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private UUID id;
    private String name;
    private Double price;
    private Set<String> images;
    private AddressDTO address;
    private Double appreciation;
}