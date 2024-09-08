package com.maxdev.plaxbackend.modules.Category.Service.Impl;

import com.maxdev.plaxbackend.modules.Category.Category;
import com.maxdev.plaxbackend.modules.Category.DTO.CategoryDTO;
import com.maxdev.plaxbackend.modules.Category.Mapper.CategoryMapper;
import com.maxdev.plaxbackend.modules.Category.Repository.CategoryRepository;
import com.maxdev.plaxbackend.modules.Category.Service.ICategoryService;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Log4j2
@Service
public class CategoryService implements ICategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    @Transactional
    public CategoryDTO save(CategoryDTO categoryDTO) throws IllegalArgumentException {
        if (categoryRepository.findByName(categoryDTO.getName()).isPresent()) {
            log.error("Category with name: {} already exists", categoryDTO.getName());
            throw new IllegalArgumentException("Category with name: " + categoryDTO.getName() + " already exists");
        }
        Category categoryToSave = CategoryMapper.INSTANCE.dtoToEntity(categoryDTO);
        categoryRepository.save(categoryToSave);
        log.info("Category saved: {}", categoryToSave.getName());
        return CategoryMapper.INSTANCE.entityToDto(categoryToSave);
    }

    @Override
    @Transactional
    public Optional<CategoryDTO> findById(UUID id) {
        log.debug("Finding category by id: {}", id);
        return categoryRepository.findById(id)
                .map(CategoryMapper.INSTANCE::entityToDto);
    }

    @Override
    @Transactional
    public Optional<CategoryDTO> findByName(String name) {
        log.debug("Finding category by name: {}", name);
        return categoryRepository.findByName(name)
                .map(CategoryMapper.INSTANCE::entityToDto);
    }

    @Override
    @Transactional
    public Page<CategoryDTO> findAll(Pageable pageable) {
        log.debug("Finding all categories with pageable: {}", pageable);
        return categoryRepository.findAll(pageable)
                .map(CategoryMapper.INSTANCE::entityToDto);
    }

    @Override
    @Transactional
    public CategoryDTO update(CategoryDTO categoryDTO) throws ResourceNotFoundException {
        log.debug("Updating category: {}", categoryDTO.getId());
        categoryRepository.findById(categoryDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryDTO.getId()));

        Category categoryToUpdate = CategoryMapper.INSTANCE.dtoToEntity(categoryDTO);
        return CategoryMapper.INSTANCE.entityToDto(categoryRepository.save(categoryToUpdate));
    }

    @Override
    @Transactional
    public CategoryDTO delete(UUID id) throws ResourceNotFoundException {
        log.debug("Deleting category with id: {}", id);
        Category categoryToDelete = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        categoryRepository.delete(categoryToDelete);
        return CategoryMapper.INSTANCE.entityToDto(categoryToDelete);
    }
}
