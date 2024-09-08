package com.maxdev.plaxbackend.modules.Category.Controller;

import com.maxdev.plaxbackend.modules.Category.DTO.CategoryDTO;
import com.maxdev.plaxbackend.modules.Category.Service.Impl.CategoryService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Log4j2
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories(@RequestParam(value = "page", defaultValue = "0") int page,
                                                              @RequestParam(value = "size", defaultValue = "10") int size) {
        log.debug("Received request to get all categories with page: {} and size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<CategoryDTO> pageCategories = categoryService.findAll(pageable);
        List<CategoryDTO> categories = pageCategories.getContent();
        log.info("Returning {} categories", categories.size());
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) {
        log.debug("Received request to create category: {}", categoryDTO);
        try {
            CategoryDTO savedCategory = categoryService.save(categoryDTO);
            return ResponseEntity.ok(savedCategory);
        } catch (IllegalArgumentException e) {
            log.error("Error creating category: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

}
