package com.maxdev.plaxbackend.modules.User.Service;

import com.maxdev.plaxbackend.modules.Exception.ResourceAlreadyExistsException;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Stay.Repository.StayRepository;
import com.maxdev.plaxbackend.modules.Stay.Stay;
import com.maxdev.plaxbackend.modules.User.DTO.UserDTO;
import com.maxdev.plaxbackend.modules.User.DTO.UserFavoriteDTO;
import com.maxdev.plaxbackend.modules.User.DTO.UserSaveDTO;
import com.maxdev.plaxbackend.modules.User.Mapper.UserMapper;
import com.maxdev.plaxbackend.modules.User.Repository.UserRepository;
import com.maxdev.plaxbackend.modules.User.User;
import com.maxdev.plaxbackend.modules.Util.BaseUrl;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.stream.Collectors;

@Log4j2
@Service
public class UserService implements IUserService, BaseUrl {

    private final UserRepository userRepository;
    private final StayRepository stayRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, StayRepository stayRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.stayRepository = stayRepository;
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

    @Override
    public UserDTO addFavorite(UserFavoriteDTO userFavoritesDTO) {
        log.info("Adding favorite to user with id: {}", userFavoritesDTO.getId());
        User user = userRepository.findById(userFavoritesDTO.getId()).orElseThrow(() -> {
            log.error("User with id: {} not found", userFavoritesDTO.getId());
            return new ResourceNotFoundException("User with id: " + userFavoritesDTO.getId() + " not found");
        });
        Stay stay = stayRepository.findById(userFavoritesDTO.getFavorite()).orElseThrow(() -> {
            log.error("Stay with id: {} not found", userFavoritesDTO.getFavorite());
            return new ResourceNotFoundException("Stay with id: " + userFavoritesDTO.getFavorite() + " not found");
        });
        user.getFavorites().add(stay);
        userRepository.save(user);
        log.info("Favorite added to user with id: {}", userFavoritesDTO.getId());
        UserDTO userDTO = UserMapper.INSTANCE.entityToDto(user);
        userDTO.getFavorites().forEach(favoriteStay -> favoriteStay.setImages(favoriteStay.getImages().stream()
                .map(image -> getBaseUrl() + "/api/stays/images/" + image)
                .collect(Collectors.toSet())));
        return userDTO;
    }

    @Override
    public UserDTO removeFavorite(UserFavoriteDTO userFavoritesDTO) {
        log.info("Removing favorite from user with id: {}", userFavoritesDTO.getId());
        User user = userRepository.findById(userFavoritesDTO.getId()).orElseThrow(() -> {
            log.error("User with id: {} not found", userFavoritesDTO.getId());
            return new ResourceNotFoundException("User with id: " + userFavoritesDTO.getId() + " not found");
        });
        Stay stay = stayRepository.findById(userFavoritesDTO.getFavorite()).orElseThrow(() -> {
            log.error("Stay with id: {} not found", userFavoritesDTO.getFavorite());
            return new ResourceNotFoundException("Stay with id: " + userFavoritesDTO.getFavorite() + " not found");
        });
        user.getFavorites().remove(stay);
        userRepository.save(user);
        log.info("Favorite removed from user with id: {}", userFavoritesDTO.getId());
        UserDTO userDTO = UserMapper.INSTANCE.entityToDto(user);
        userDTO.getFavorites().forEach(favoriteStay -> favoriteStay.setImages(favoriteStay.getImages().stream()
                .map(image -> getBaseUrl() + "/api/stays/images/" + image)
                .collect(Collectors.toSet())));
        return userDTO;
    }
}
