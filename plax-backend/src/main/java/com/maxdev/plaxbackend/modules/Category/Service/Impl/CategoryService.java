package com.maxdev.plaxbackend.modules.Category.Service.Impl;

import com.maxdev.plaxbackend.modules.Category.Category;
import com.maxdev.plaxbackend.modules.Category.DTO.CategoryDTO;
import com.maxdev.plaxbackend.modules.Category.Mapper.CategoryMapper;
import com.maxdev.plaxbackend.modules.Category.Repository.CategoryRepository;
import com.maxdev.plaxbackend.modules.Category.Service.ICategoryService;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import lombok.extern.log4j.Log4j2;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.UUID;

import static java.time.LocalDateTime.*;

@Log4j2
@Service
public class CategoryService implements ICategoryService {

    private final CategoryRepository categoryRepository;

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
    public CategoryDTO update(CategoryDTO categoryDTO) throws ResourceNotFoundException {
        log.debug("Updating category: {}", categoryDTO.getId());
        categoryRepository.findById(categoryDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryDTO.getId()));

        Category categoryToUpdate = CategoryMapper.INSTANCE.dtoToEntity(categoryDTO);
        categoryRepository.save(categoryToUpdate);
        log.info("Category updated: {}", categoryToUpdate.getName());
        return CategoryMapper.INSTANCE.entityToDto(categoryToUpdate);
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
    public CategoryDTO delete(UUID id)
            throws ResourceNotFoundException, IOException {
        log.debug("Deleting category with id: {}", id);
        Category categoryToDelete = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        try {
            categoryRepository.delete(categoryToDelete);
            if (categoryRepository.findByName(categoryToDelete.getName()).isEmpty()) {
                deleteImage(categoryToDelete.getImage());
            }
        } catch (DataIntegrityViolationException e) {
            log.error("Integrity constraint violation: {}", e.getMessage());
            throw new IOException(
                    "Cannot delete category with id: " + id + " due to referential integrity constraints.", e);
        }
        return CategoryMapper.INSTANCE.entityToDto(categoryToDelete);
    }

    public String saveImage(MultipartFile image) throws IOException {
        String uploadDir = "uploads/categories";
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String timestamp = now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String fileName = timestamp + "_" + image.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    private void deleteImage(String imageName) throws IOException {
        Path imagePath = Paths.get("uploads/categories").resolve(imageName);
        Files.deleteIfExists(imagePath);
    }

    public String getBaseUrl() {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/categories/").toUriString();
    }
}
