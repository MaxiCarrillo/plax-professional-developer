package com.maxdev.plaxbackend.modules.User.Mapper;

import com.maxdev.plaxbackend.modules.User.DTO.UserSaveDTO;
import com.maxdev.plaxbackend.modules.User.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserSaveMapper {
    UserSaveMapper INSTANCE = Mappers.getMapper(UserSaveMapper.class);

    UserSaveDTO entityToDto(User user);

    User dtoToEntity(UserSaveDTO userSaveDTO);
}
