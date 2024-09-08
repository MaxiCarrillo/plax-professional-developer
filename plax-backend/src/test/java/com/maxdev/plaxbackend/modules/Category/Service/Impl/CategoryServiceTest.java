package com.maxdev.plaxbackend.modules.Category.Service.Impl;

import com.maxdev.plaxbackend.modules.Category.DTO.CategoryDTO;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class CategoryServiceTest {

    @Autowired
    CategoryService categoryService;

    @Test
    @Order(1)
    void save() {
        CategoryDTO categoryDTO = CategoryDTO.builder()
                .name("Departamentos")
                .description("Los mejores departamentos.")
                .image("departamento1.jpg")
                .build();
        CategoryDTO savedCategory = categoryService.save(categoryDTO);
        assertNotNull(savedCategory);
        assertEquals("Departamentos", savedCategory.getName());
    }

    @Test
    @Order(2)
    void findById() {
        UUID id = UUID.randomUUID();
        assertTrue(categoryService.findById(id).isEmpty());
    }

    @Test
    @Order(3)
    void findByName() {
        assertTrue(categoryService.findByName("Departamentos").isPresent());
    }

    @Test
    @Order(4)
    void findAll() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<CategoryDTO> pages = categoryService.findAll(pageable);
        List<CategoryDTO> categories = pages.getContent();
        assertEquals(1, pages.getTotalElements());
        assertFalse(categories.isEmpty());
    }

    @Test
    @Order(5)
    void update() {
        Optional<CategoryDTO> categoryDTO = categoryService.findByName("Departamentos");
        categoryDTO.ifPresent(category -> {
            CategoryDTO updatedCategory = CategoryDTO.builder()
                            .id(category.getId())
                            .name(category.getName())
                            .description(category.getDescription())
                            .image("departamento2.jpg")
                            .build();
            assertEquals("departamento2.jpg", categoryService.update(updatedCategory).getImage());
        });
    }

    @Test
    @Order(6)
    void delete() {
        Optional<CategoryDTO> categoryDTO = categoryService.findByName("Departamentos");
        categoryDTO.ifPresent(category -> {
            assertEquals("Departamentos", categoryService.delete(category.getId()).getName());
//            assertTrue(categoryService.findAll().isEmpty());
        });
    }
}