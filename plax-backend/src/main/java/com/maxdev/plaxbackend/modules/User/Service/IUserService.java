package com.maxdev.plaxbackend.modules.User.Service;

import com.maxdev.plaxbackend.modules.User.DTO.UserDTO;
import com.maxdev.plaxbackend.modules.User.DTO.UserFavoriteDTO;
import com.maxdev.plaxbackend.modules.User.DTO.UserSaveDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface IUserService {

    UserDTO findById(UUID id);

    UserDTO findByEmail(String email);

    Page<UserDTO> findAll(Pageable pageable);

    void delete(UUID id);

    UserDTO updateByAdmin(UserSaveDTO userSaveDTO);

    UserDTO addFavorite(UserFavoriteDTO userFavoritesDTO);

    UserDTO removeFavorite(UserFavoriteDTO userFavoritesDTO);
}
