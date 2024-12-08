package com.maxdev.plaxbackend.modules.Category.Service;

import static java.time.LocalDateTime.now;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.maxdev.plaxbackend.modules.Category.Category;
import com.maxdev.plaxbackend.modules.Category.DTO.CategoryDTO;
import com.maxdev.plaxbackend.modules.Category.Mapper.CategoryMapper;
import com.maxdev.plaxbackend.modules.Category.Repository.CategoryRepository;
import com.maxdev.plaxbackend.modules.Exception.ResourceAlreadyExistsException;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Util.BaseUrl;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class CategoryService implements ICategoryService, BaseUrl {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    @Transactional
    public CategoryDTO save(CategoryDTO categoryDTO, MultipartFile image) throws IllegalArgumentException, IOException {
        if (categoryRepository.findByName(categoryDTO.getName()).isPresent()) {
            log.error("Category with name: {} already exists", categoryDTO.getName());
            throw new IllegalArgumentException("Category with name: " + categoryDTO.getName() + " already exists");
        }
        String fileName = saveImage(image);
        categoryDTO.setImage(fileName);
        Category categoryToSave = CategoryMapper.INSTANCE.dtoToEntity(categoryDTO);
        categoryRepository.save(categoryToSave);
        log.info("Category saved: {}", categoryToSave.getName());
        return CategoryMapper.INSTANCE.entityToDto(categoryToSave);
    }

    @Override
    @Transactional
    public CategoryDTO update(CategoryDTO categoryDTO, MultipartFile image) throws IOException {
        log.debug("Updating category: {}", categoryDTO.getId());

        Category categoryToUpdate = categoryRepository.findById(categoryDTO.getId()).orElseThrow(() -> {
            log.error("Category with id: {} not found", categoryDTO.getId());
            return new ResourceNotFoundException("Category with id: " + categoryDTO.getId() + " not found");
        });

        if (!categoryToUpdate.getName().equals(categoryDTO.getName())) {
            categoryRepository.findByName(categoryDTO.getName()).ifPresent(category -> {
                log.error("Category with name: {} already exists", categoryDTO.getName());
                throw new ResourceAlreadyExistsException(
                        "Category with name: " + categoryDTO.getName() + " already exists");
            });
        }

        if (image != null) {
            categoryDTO.setImage(saveImage(image));
            deleteImage(categoryToUpdate.getImage());
        } else
            categoryDTO.setImage(categoryToUpdate.getImage());

        categoryToUpdate = CategoryMapper.INSTANCE.dtoToEntity(categoryDTO);
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
        Page<CategoryDTO> pageCategories = categoryRepository.findAll(pageable)
                .map(CategoryMapper.INSTANCE::entityToDto);
        pageCategories.forEach(categoryDTO -> {
            categoryDTO.setImage(getBaseUrl() + "/api/categories/images/" + categoryDTO.getImage());
        });
        return pageCategories;
    }

    @Override
    public List<CategoryDTO> findAllWithoutPagination() {
        log.debug("Finding all categories without pagination");
        List<CategoryDTO> categoryDTOS = categoryRepository.findAll().stream()
                .map(CategoryMapper.INSTANCE::entityToDto)
                .toList();
        categoryDTOS.forEach(categoryDTO -> {
            categoryDTO.setImage(getBaseUrl() + "/api/categories/images/" + categoryDTO.getImage());
        });
        return categoryDTOS;
    }

    @Override
    @Transactional
    public CategoryDTO delete(UUID id)
            throws ResourceNotFoundException, IOException {
        log.debug("Deleting category with id: {}", id);
        Category categoryToDelete = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        categoryRepository.delete(categoryToDelete);
        if (!categoryRepository.existsById(id)) {
            deleteImage(categoryToDelete.getImage());
        }
        log.info("Category deleted with id: {}", id);
        return CategoryMapper.INSTANCE.entityToDto(categoryToDelete);
    }

    public Resource getImage(String imageName) throws MalformedURLException {
        Path filePath = Paths.get("uploads/categories").resolve(imageName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (!resource.exists()) {
            log.error("Image not found: {}", imageName);
            throw new ResourceNotFoundException("Image not found: " + imageName);
        }
        return resource;
    }

    private String saveImage(MultipartFile image) throws IOException {
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
}
