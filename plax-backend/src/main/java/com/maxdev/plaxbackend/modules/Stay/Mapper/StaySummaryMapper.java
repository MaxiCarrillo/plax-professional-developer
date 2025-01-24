package com.maxdev.plaxbackend.modules.Stay.Mapper;

import com.maxdev.plaxbackend.modules.Stay.DTO.StaySummaryDTO;
import com.maxdev.plaxbackend.modules.Stay.Stay;
import com.maxdev.plaxbackend.modules.Stay.StayImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface StaySummaryMapper {
    StaySummaryMapper INSTANCE = Mappers.getMapper(StaySummaryMapper.class);

    @Mapping(source = "appreciation", target = "appreciation")
    @Mapping(source = "price", target = "price")
    @Mapping(target = "totalReviews", ignore = true)
    @Mapping(source = "images", target = "images", qualifiedByName = "stayImagesToStrings")
    StaySummaryDTO entityToDto(Stay stay);

    @Named("stayImagesToStrings")
    default Set<String> stayImagesToStrings(Set<StayImage> stayImages) {
        return stayImages.stream()
                .map(StayImage::getUrl)
                .collect(Collectors.toSet());
    }
}
