package com.maxdev.plaxbackend.modules.Security.DTO;

import com.maxdev.plaxbackend.modules.User.DTO.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private UserDTO user;
}
