package com.maxdev.plaxbackend.modules.User.Mapper;

import com.maxdev.plaxbackend.modules.User.DTO.UserDTO;
import com.maxdev.plaxbackend.modules.User.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO entityToDto(User user);

    User dtoToEntity(UserDTO userDTO);
}
