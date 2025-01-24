package com.maxdev.plaxbackend.modules.Review.Mapper;

import com.maxdev.plaxbackend.modules.Review.DTO.ReviewSummaryDTO;
import com.maxdev.plaxbackend.modules.Review.Review;
import com.maxdev.plaxbackend.modules.User.Mapper.UserSummaryMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {UserSummaryMapper.class})
public interface ReviewSummaryMapper {
    ReviewSummaryMapper INSTANCE = Mappers.getMapper(ReviewSummaryMapper.class);

    @Mapping(source = "user", target = "user")
    @Mapping(source = "comment", target = "comment")
    ReviewSummaryDTO entityToDto(Review review);

    @Mapping(source = "user", target = "user")
    Review dtoToEntity(ReviewSummaryDTO reviewDTO);
}
