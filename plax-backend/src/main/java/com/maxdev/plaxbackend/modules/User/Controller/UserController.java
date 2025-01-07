package com.maxdev.plaxbackend.modules.User.Controller;

import com.maxdev.plaxbackend.modules.User.DTO.UserDTO;
import com.maxdev.plaxbackend.modules.User.DTO.UserFavoriteDTO;
import com.maxdev.plaxbackend.modules.User.DTO.UserSaveDTO;
import com.maxdev.plaxbackend.modules.User.Service.UserService;
import com.maxdev.plaxbackend.modules.Util.ApiPageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Log4j2
@RestController
@Tag(name = "User", description = "Operaciones relacionadas con los usuarios.")
@RequestMapping("/api/users")
public class UserController {

    public final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiPageResponse<List<UserDTO>>> getAllUsers(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        log.debug("Received request to get all users");
        Pageable pageable = PageRequest.of(page, size);
        Page<UserDTO> pageUsers = userService.findAll(pageable);
        List<UserDTO> users = pageUsers.getContent();
        log.info("Returning {} users", users.size());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new ApiPageResponse<>(
                                pageUsers.getTotalPages(),
                                (int) pageUsers.getTotalElements(),
                                users,
                                "Users retrieved successfully"));
    }

    @PreAuthorize("hasAuthority('ADMIN') || hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserSaveDTO userSaveDTO) {
        log.debug("Received request to update user with id: {}", userSaveDTO.getId());
        System.out.println(userSaveDTO);
        UserDTO updatedUser = userService.updateByAdmin(userSaveDTO);
        log.info("User with id: {} updated successfully", userSaveDTO.getId());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(updatedUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") UUID id) {
        log.debug("Received request to get user with id: {}", id);
        UserDTO userSaveDTO = userService.findById(id);
        log.info("Returning user with id: {}", id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userSaveDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserDTO> deleteUser(@PathVariable("id") UUID id) {
        log.debug("Received request to delete user with id: {}", id);
        userService.delete(id);
        log.info("User with id: {} deleted successfully", id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @PostMapping("/add-favorite")
    public ResponseEntity<UserDTO> addFavorite(@RequestBody UserFavoriteDTO userFavoriteDTO) {
        log.debug("Received request to add favorite to user with id: {}", userFavoriteDTO.getId());
        UserDTO userDTO = userService.addFavorite(userFavoriteDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userDTO);
    }

    @PostMapping("/remove-favorite")
    public ResponseEntity<UserDTO> removeFavorite(@RequestBody UserFavoriteDTO userFavoriteDTO) {
        log.debug("Received request to remove favorite from user with id: {}", userFavoriteDTO.getId());
        UserDTO userDTO = userService.removeFavorite(userFavoriteDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userDTO);
    }

}
