package com.maxdev.plaxbackend.modules.Category.Service;

import com.maxdev.plaxbackend.modules.Category.DTO.CategoryDTO;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ICategoryService {
    CategoryDTO save(CategoryDTO categoryDTO) throws IllegalArgumentException;

    CategoryDTO update(CategoryDTO categoryDTO) throws ResourceNotFoundException;

    Optional<CategoryDTO> findById(UUID id);

    Optional<CategoryDTO> findByName(String name);

    public Page<CategoryDTO> findAll(Pageable pageable);

    CategoryDTO delete(UUID id) throws ResourceNotFoundException;
}
