package com.maxdev.plaxbackend.modules.User.Service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.maxdev.plaxbackend.modules.Exception.ResourceAlreadyExistsException;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.User.User;
import com.maxdev.plaxbackend.modules.User.DTO.UserDTO;
import com.maxdev.plaxbackend.modules.User.DTO.UserSaveDTO;
import com.maxdev.plaxbackend.modules.User.Mapper.UserMapper;
import com.maxdev.plaxbackend.modules.User.Repository.UserRepository;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO findById(UUID id) {
        log.debug("Finding user by id: {}", id);
        return userRepository.findById(id)
                .map(UserMapper.INSTANCE::entityToDto)
                .orElseThrow(() -> {
                    log.error("User with id: {} not found", id);
                    return new ResourceNotFoundException("User with id: " + id + " not found");
                });
    }

    @Override
    public UserDTO findByEmail(String email) {
        log.debug("Finding user by email: {}", email);
        return userRepository.findByEmail(email)
                .map(UserMapper.INSTANCE::entityToDto)
                .orElseThrow(() -> {
                    log.error("User with email: {} not found", email);
                    return new ResourceNotFoundException("User with email: " + email + " not found");
                });
    }

    @Override
    public Page<UserDTO> findAll(Pageable pageable) {
        log.debug("Finding all users with pageable: {}", pageable);
        Page<UserDTO> pageUsers = userRepository.findAll(pageable).map(UserMapper.INSTANCE::entityToDto);
        log.info("Found {} users", pageUsers.getTotalElements());
        return pageUsers;
    }

    @Override
    public UserDTO delete(UUID id) {
        log.debug("Deleting user: {}", id);
        User userToDelete = userRepository.findById(id).orElseThrow(() -> {
            log.error("User with id: {} not found", id);
            return new ResourceNotFoundException("User with id: " + id + " not found");
        });
        userRepository.delete(userToDelete);
        log.info("User deleted: {}", userToDelete.getEmail());
        return UserMapper.INSTANCE.entityToDto(userToDelete);
    }

    @Override
    public UserDTO updateByAdmin(UserSaveDTO userSaveDTO) {
        log.debug("Updating user by admin: {}", userSaveDTO.getId());
        System.out.println("userSaveDTO.getId() = " + userSaveDTO.getId());

        User userToUpdate = userRepository.findById(userSaveDTO.getId()).orElseThrow(() -> {
            log.error("User with id: {} not found", userSaveDTO.getId());
            return new ResourceNotFoundException("User with id: " + userSaveDTO.getId() + " not found");
        });

        if (!userToUpdate.getEmail().equals(userSaveDTO.getEmail())
                && userRepository.existsByEmail(userSaveDTO.getEmail())) {
            log.error("User with email: {} already exists", userSaveDTO.getEmail());
            throw new ResourceAlreadyExistsException("User with email: " + userSaveDTO.getEmail() + " already exists");
        }

        userToUpdate.setFirstname(userSaveDTO.getFirstname());
        userToUpdate.setLastname(userSaveDTO.getLastname());
        userToUpdate.setEmail(userSaveDTO.getEmail());
        userToUpdate.setRole(userSaveDTO.getRole());

        if (userSaveDTO.getPassword() != null && !userSaveDTO.getPassword().isEmpty()) {
            userToUpdate.setPassword(passwordEncoder.encode(userSaveDTO.getPassword()));
        }

        userRepository.save(userToUpdate);
        log.info("User updated: {}", userToUpdate.getEmail());
        return UserMapper.INSTANCE.entityToDto(userToUpdate);
    }
}
