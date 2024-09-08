package com.maxdev.plaxbackend.modules.Category.Mapper;

import com.maxdev.plaxbackend.modules.Category.Category;
import com.maxdev.plaxbackend.modules.Category.DTO.CategoryDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CategoryMapper{
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    CategoryDTO entityToDto(Category category);

    Category dtoToEntity(CategoryDTO categoryDTO);
}
