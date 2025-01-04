package com.maxdev.plaxbackend.modules.User.Mapper;

import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import com.maxdev.plaxbackend.modules.Stay.DTO.StaySummaryDTO;
import com.maxdev.plaxbackend.modules.Stay.Mapper.StayMapper;
import com.maxdev.plaxbackend.modules.Stay.Mapper.StaySummaryMapper;
import com.maxdev.plaxbackend.modules.Stay.Stay;
import com.maxdev.plaxbackend.modules.User.DTO.UserDTO;
import com.maxdev.plaxbackend.modules.User.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(uses = {StaySummaryMapper.class})
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "favorites", target = "favorites", qualifiedByName = "mapStaysToStayDTOs")
    UserDTO entityToDto(User user);

    @Named("mapStaysToStayDTOs")
    default Set<StaySummaryDTO> mapStaysToStayDTOs(Set<Stay> stays) {
        return stays.stream()
                .map(StaySummaryMapper.INSTANCE::entityToDto)
                .collect(Collectors.toSet());
    }
}
