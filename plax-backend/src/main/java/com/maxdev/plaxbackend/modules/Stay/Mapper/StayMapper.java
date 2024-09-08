package com.maxdev.plaxbackend.modules.Stay.Mapper;

import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import com.maxdev.plaxbackend.modules.Stay.Stay;
import com.maxdev.plaxbackend.modules.Stay.StayImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface StayMapper {
    StayMapper INSTANCE = Mappers.getMapper(StayMapper.class);

    @Mapping(source = "images", target = "images", qualifiedByName = "stayImagesToStrings")
    @Mapping(source = "category.id", target = "category_id")
    StayDTO entityToDto(Stay stay);

    @Mapping(source = "images", target = "images", qualifiedByName = "stringsToStayImages")
    @Mapping(source = "category_id", target = "category.id")
    Stay dtoToEntity(StayDTO stayDTO);

    @Named("stayImagesToStrings")
    default Set<String> stayImagesToStrings(Set<StayImage> stayImages) {
        return stayImages.stream()
                .map(StayImage::getUrl)
                .collect(Collectors.toSet());
    }

    @Named("stringsToStayImages")
    default Set<StayImage> stringsToStayImages(Set<String> strings) {
        return strings.stream()
                .map(url -> {
                    StayImage stayImage = new StayImage();
                    stayImage.setUrl(url);
                    return stayImage;
                })
                .collect(Collectors.toSet());
    }
}
