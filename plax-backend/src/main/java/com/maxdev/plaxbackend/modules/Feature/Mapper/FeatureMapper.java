package com.maxdev.plaxbackend.modules.Feature.Mapper;

import com.maxdev.plaxbackend.modules.Feature.DTO.FeatureDTO;
import com.maxdev.plaxbackend.modules.Feature.Feature;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FeatureMapper {
    FeatureMapper INSTANCE = Mappers.getMapper(FeatureMapper.class);

    FeatureDTO entityToDto(Feature feature);

    Feature dtoToEntity(FeatureDTO featureDTO);
}
