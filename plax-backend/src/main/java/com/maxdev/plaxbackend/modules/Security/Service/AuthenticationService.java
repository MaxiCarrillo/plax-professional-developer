package com.maxdev.plaxbackend.modules.Security.Service;

import com.maxdev.plaxbackend.modules.Email.Service.EmailService;
import com.maxdev.plaxbackend.modules.Exception.ResourceAlreadyExistsException;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Security.DTO.AuthenticationRequest;
import com.maxdev.plaxbackend.modules.Security.DTO.AuthenticationResponse;
import com.maxdev.plaxbackend.modules.Security.DTO.RegisterRequest;
import com.maxdev.plaxbackend.modules.User.DTO.UserDTO;
import com.maxdev.plaxbackend.modules.User.Mapper.UserMapper;
import com.maxdev.plaxbackend.modules.User.Repository.UserRepository;
import com.maxdev.plaxbackend.modules.User.Role;
import com.maxdev.plaxbackend.modules.User.User;
import com.maxdev.plaxbackend.modules.Util.BaseUrl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class AuthenticationService implements BaseUrl {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ResourceAlreadyExistsException("Email already exists");
        }

        userRepository.save(user);
        try {
            emailService.sendConfirmationEmail(user.getFirstname(), user.getLastname(), user.getEmail());
        } catch (Exception e) {
            log.error("Error sending email: {}", e.getMessage());
        }

        var jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwt)
                .build();
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()));
        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Invalid email or password");
        }

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        var jwt = jwtService.generateToken(user);

        UserDTO userDTO = UserMapper.INSTANCE.entityToDto(user);

        userDTO.getFavorites().forEach(favoriteStay -> favoriteStay.setImages(favoriteStay.getImages().stream()
                .map(image -> getBaseUrl() + "/api/stays/images/" + image)
                .collect(Collectors.toSet())));

        return AuthenticationResponse.builder()
                .token(jwt)
                .user(userDTO)
                .build();
    }
}
