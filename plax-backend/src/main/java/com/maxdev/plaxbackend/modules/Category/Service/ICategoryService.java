package com.maxdev.plaxbackend.modules.Category.Service;

import com.maxdev.plaxbackend.modules.Category.DTO.CategoryDTO;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ICategoryService {
    CategoryDTO save(CategoryDTO categoryDTO, MultipartFile image) throws IllegalArgumentException, IOException;

    CategoryDTO update(CategoryDTO categoryDTO, MultipartFile image) throws IOException;

    Optional<CategoryDTO> findById(UUID id);

    Optional<CategoryDTO> findByName(String name);

    public Page<CategoryDTO> findAll(Pageable pageable);

    public List<CategoryDTO> findAllWithoutPagination();

    void delete(UUID id) throws ResourceNotFoundException, IOException;
}
