package com.maxdev.plaxbackend.modules.Category.Controller;

import com.maxdev.plaxbackend.modules.Category.DTO.CategoryDTO;
import com.maxdev.plaxbackend.modules.Category.Service.CategoryService;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Util.ApiPageResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Log4j2
@RestController
@Tag(name = "Category", description = "Operaciones relacionadas con las categorías.")
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<ApiPageResponse<List<CategoryDTO>>> getAllCategories(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        log.debug("Received request to get all categories with page: {} and size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<CategoryDTO> pageCategories = categoryService.findAll(pageable);
        List<CategoryDTO> categories = pageCategories.getContent();
        log.info("Returning {} categories", categories.size());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new ApiPageResponse<>(
                                pageCategories.getTotalPages(),
                                (int) pageCategories.getTotalElements(),
                                categories,
                                "Categories retrieved successfully"));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CategoryDTO>> getAllCategoriesWithoutPagination() {
        log.debug("Received request to get all categories without pagination");
        List<CategoryDTO> categories = categoryService.findAllWithoutPagination();
        log.info("Returning {} categories", categories.size());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categories);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<CategoryDTO> createCategory(@RequestPart("category") CategoryDTO categoryDTO,
                                                      @RequestPart("image") MultipartFile image) throws IOException, IllegalArgumentException {
        log.debug("Received request to create category: {}", categoryDTO);
        CategoryDTO savedCategory = categoryService.save(categoryDTO, image);
        log.info("Category created: {}", savedCategory.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
    }

    @PutMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<CategoryDTO> updateCategory(@RequestPart("category") CategoryDTO categoryDTO,
                                                      @RequestPart(value = "image", required = false) MultipartFile image)
            throws ResourceNotFoundException, IOException {
        log.debug("Received request to update category: {}", categoryDTO);
        CategoryDTO updatedCategory = categoryService.update(categoryDTO, image);
        log.info("Category updated: {}", updatedCategory.getName());
        return ResponseEntity.status(HttpStatus.OK).body(updatedCategory);
    }

    @GetMapping("/images/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws MalformedURLException {
        log.debug("Received request to get image: {}", imageName);
        Resource resource = categoryService.getImage(imageName);
        log.info("Returning image: {}", imageName);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable UUID id)
            throws ResourceNotFoundException, IOException {
        log.debug("Received request to delete category with id: {}", id);
        categoryService.delete(id);
        log.info("Category deleted with id: {}", id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
