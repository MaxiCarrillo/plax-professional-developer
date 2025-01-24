package com.maxdev.plaxbackend.modules.User.DTO;

import java.util.Set;
import java.util.UUID;

import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import com.maxdev.plaxbackend.modules.Stay.DTO.StaySummaryDTO;
import com.maxdev.plaxbackend.modules.User.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private UUID id;
    private String firstname;
    private String lastname;
    private String email;
    private Role role;
    private Set<StaySummaryDTO> favorites;
}
