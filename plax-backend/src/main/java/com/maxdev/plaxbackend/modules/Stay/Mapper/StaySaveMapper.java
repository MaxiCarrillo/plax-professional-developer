package com.maxdev.plaxbackend.modules.Stay.Mapper;

import com.maxdev.plaxbackend.modules.Feature.Feature;
import com.maxdev.plaxbackend.modules.Stay.DTO.StaySaveDTO;
import com.maxdev.plaxbackend.modules.Stay.Stay;
import com.maxdev.plaxbackend.modules.Stay.StayImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper
public interface StaySaveMapper {
    StaySaveMapper INSTANCE = Mappers.getMapper(StaySaveMapper.class);

    @Mapping(source = "images", target = "images", qualifiedByName = "stayImagesToStrings")
    @Mapping(source = "features", target = "features", qualifiedByName = "featuresToUuids")
    @Mapping(source = "category.id", target = "category_id")
    @Mapping(source = "address", target = "address")
    StaySaveDTO entityToDto(Stay stay);

    @Mapping(source = "images", target = "images", qualifiedByName = "stringsToStayImages")
    @Mapping(source = "features", target = "features", qualifiedByName = "uuidsToFeatures")
    @Mapping(source = "category_id", target = "category.id")
    @Mapping(source = "address", target = "address")
    Stay dtoToEntity(StaySaveDTO staySaveDTO);

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

    @Named("featuresToUuids")
    default Set<UUID> featuresToUuids(Set<Feature> features) {
        return features.stream()
                .map(Feature::getId)
                .collect(Collectors.toSet());
    }

    @Named("uuidsToFeatures")
    default Set<Feature> uuidsToFeatures(Set<UUID> uuids) {
        return uuids.stream()
                .map(uuid -> {
                    Feature feature = new Feature();
                    feature.setId(uuid);
                    return feature;
                })
                .collect(Collectors.toSet());
    }
}
