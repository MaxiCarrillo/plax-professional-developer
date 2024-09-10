package com.maxdev.plaxbackend.modules.Stay.Service.Impl;

import com.maxdev.plaxbackend.modules.Category.DTO.CategoryDTO;
import com.maxdev.plaxbackend.modules.Category.Service.Impl.CategoryService;
import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import com.maxdev.plaxbackend.modules.Stay.Stay;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class StayServiceTest {

    @Autowired
    StayService stayService;

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
        categoryDTO = categoryService.save(categoryDTO);
        StayDTO stayDTO = StayDTO.builder()
                .name("Departamento")
                .description("Departamento con vista a la playa.")
                .images(Set.of("departamento1.jpg", "departamento2.jpg"))
                .price(100.0)
                .category_id(categoryDTO.getId())
                .address("Calle 123")
                .build();
        StayDTO savedStay = stayService.save(stayDTO);
        assertNotNull(savedStay);
        assertEquals("Departamento", savedStay.getName());
        assertEquals(categoryDTO.getId(), savedStay.getCategory_id());
        assertEquals(2, savedStay.getImages().size());
    }

    @Test
    @Order(2)
    void findById() {
        UUID id = UUID.randomUUID();
        assertTrue(stayService.findById(id).isEmpty());
    }

    @Test
    @Order(3)
    void findByName() {
        assertTrue(stayService.findByName("Departamento").isPresent());
    }

    @Test
    @Order(4)
    void findAll() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<StayDTO> pages = stayService.findAll(pageable);
        List<StayDTO> stays = pages.getContent();
        assertEquals(1, pages.getTotalElements());
        assertFalse(stays.isEmpty());
    }

    @Test
    @Order(5)
    void update() {
        Optional<StayDTO> stayDTO = stayService.findByName("Departamento");
        stayDTO.ifPresent(stay -> {
            StayDTO updatedStay = StayDTO.builder()
                    .id(stay.getId())
                    .name("Departamento con vista al mar")
                    .price(200.0)
                    .images(Set.of("departamento3.jpg"))
                    .category_id(stay.getCategory_id())
                    .address("Calle 123")
                    .build();

            updatedStay = stayService.update(updatedStay);
            assertEquals("Departamento con vista al mar", updatedStay.getName());
            assertEquals(200.0, updatedStay.getPrice());
            assertEquals(1, updatedStay.getImages().size());
        });
    }

    @Test
    @Order(6)
    void delete() {
        Optional<StayDTO> stayDTO = stayService.findByName("Departamento");
        stayDTO.ifPresent(stay -> {
            assertEquals("Departamento", stayService.delete(stay.getId()).getName());
        });
    }
}