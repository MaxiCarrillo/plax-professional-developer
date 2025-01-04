package com.maxdev.plaxbackend.modules.User.Mapper;

import com.maxdev.plaxbackend.modules.User.DTO.UserSummaryDTO;
import com.maxdev.plaxbackend.modules.User.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserSummaryMapper {
    UserSummaryMapper INSTANCE = Mappers.getMapper(UserSummaryMapper.class);

    UserSummaryDTO entityToDto(User user);
}
