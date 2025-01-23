package com.maxdev.plaxbackend.modules.Feature.Service;

import com.maxdev.plaxbackend.modules.Category.DTO.CategoryDTO;
import com.maxdev.plaxbackend.modules.Feature.DTO.FeatureDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface IFeatureService {

    FeatureDTO save(FeatureDTO featureDTO, MultipartFile icon) throws IOException;

    FeatureDTO findById(Long id);

    FeatureDTO findByName(String name);

    Page<FeatureDTO> findAll(Pageable pageable);

    List<FeatureDTO> findAllWithoutPagination();

    FeatureDTO update(FeatureDTO featureDTO, MultipartFile icon) throws IOException;

    void delete(UUID id) throws IOException;
}
