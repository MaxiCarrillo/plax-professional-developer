package com.maxdev.plaxbackend.modules.Stay.Controller;

import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import com.maxdev.plaxbackend.modules.Stay.DTO.StaySaveDTO;
import com.maxdev.plaxbackend.modules.Stay.DTO.StaySummaryDTO;
import com.maxdev.plaxbackend.modules.Stay.Service.StayService;
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
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Log4j2
@RestController
@Tag(name = "Stay", description = "Operaciones relacionadas con los alojamientos.")
@RequestMapping("/api/stays")
public class StayController {

    StayService stayService;

    public StayController(StayService stayService) {
        this.stayService = stayService;
    }

    @GetMapping
    public ResponseEntity<ApiPageResponse<List<StayDTO>>> getAllStays(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        log.debug("Received request to get all stays with page: {} and size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<StayDTO> pageStays = stayService.findAll(pageable);
        List<StayDTO> stayDTOS = pageStays.getContent();
        log.debug("Returning {} stays", stayDTOS.size());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new ApiPageResponse<>(
                                pageStays.getTotalPages(),
                                (int) pageStays.getTotalElements(),
                                stayDTOS,
                                "Stays retrieved successfully"));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiPageResponse<Set<StaySummaryDTO>>> getStaysByCategoryAndCountryOrCity(
            @RequestParam(value = "categoryIds", required = false) Set<UUID> categoryIds,
            @RequestParam(value = "searchTerm", required = false) String searchTerm,
            @RequestParam(value = "checkIn", required = false) LocalDate checkIn,
            @RequestParam(value = "checkOut", required = false) LocalDate checkOut
    ) {
        log.debug("Received request to get stays by category ids: {}", categoryIds);
        Set<StaySummaryDTO> stays = stayService.findByCategoryIdsAndCountryOrCity(categoryIds, searchTerm, checkIn, checkOut);
        log.debug("Returning {} stays", stays.size());
        return ResponseEntity.status(HttpStatus.OK)
                .body(
                        new ApiPageResponse<>(
                                1,
                                stays.size(),
                                stays,
                                "Stays retrieved successfully"));
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<StaySaveDTO> createStay(@RequestPart("stay") StaySaveDTO stayDTO,
                                                  @RequestPart("images") MultipartFile[] images) throws IOException, IllegalArgumentException {
        log.debug("Received request to create stay: {}", stayDTO);
        log.debug(stayDTO);
        StaySaveDTO savedStay = stayService.save(stayDTO, images);
        log.debug("Stay created: {}", savedStay.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStay);
    }

    @PutMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<String> updateStay(@RequestPart("stay") StaySaveDTO stayDTO,
                                             @RequestPart(value = "images", required = false) MultipartFile[] images,
                                             @RequestPart(value = "imagesToDelete", required = false) Set<String> imagesToDelete)
            throws ResourceNotFoundException, IOException {
        log.debug("Received request to update stay: {}", stayDTO.getId());
        stayService.update(stayDTO, images, imagesToDelete);
        return ResponseEntity.status(HttpStatus.OK).body("La estancia ha sido actualizada correctamente");
    }

    @GetMapping("/images/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws MalformedURLException {
        log.debug("Received request to get image with name: {}", imageName);
        Resource resource = stayService.getImage(imageName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @GetMapping("/random")
    public ResponseEntity<Set<StaySummaryDTO>> getRandomStays(@RequestParam(value = "size", defaultValue = "10") int size) {
        log.debug("Received request to get random stays with size: {}", size);
        Set<StaySummaryDTO> randomStays = stayService.getRandomStays(size);
        log.debug("Returning {} random stays", randomStays.size());
        return ResponseEntity.status(HttpStatus.OK).body(randomStays);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStay(@PathVariable UUID id) throws ResourceNotFoundException, IOException {
        log.debug("Received request to delete stay with id: {}", id);
        stayService.delete(id);
        log.debug("Stay deleted with id: {}", id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StayDTO> getStay(@PathVariable UUID id) throws ResourceNotFoundException {
        log.debug("Received request to get stay by id: {}", id);
        StayDTO stayFound = stayService.findById(id);
        log.debug("Stay retrieved: {}", stayFound);
        return ResponseEntity.status(HttpStatus.OK).body(stayFound);
    }
}
