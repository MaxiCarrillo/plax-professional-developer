package com.maxdev.plaxbackend.modules.Stay.Controller;

import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import com.maxdev.plaxbackend.modules.Stay.Service.Impl.StayService;
import com.maxdev.plaxbackend.modules.Util.ApiPageResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
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
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Log4j2
@RestController
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
        Page<StayDTO> stays = stayService.findAll(pageable);
        List<StayDTO> stayDTOS = stays.getContent();
        stayDTOS.forEach(stay -> stay.setImages(stay.getImages().stream()
                .map(image -> stayService.getBaseUrl() + "images/" + image)
                .collect(Collectors.toSet())));
        log.info("Returning {} stays", stayDTOS.size());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new ApiPageResponse<>(
                                stays.getTotalPages(),
                                stayDTOS,
                                "Stays retrieved successfully"));
    }

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<StayDTO> createStay(@RequestPart("stay") StayDTO stayDTO,
            @RequestPart("images") MultipartFile[] images) throws IOException, IllegalArgumentException {
        log.debug("Received request to create stay: {}", stayDTO);
        Set<String> imageNames = stayService.saveImages(images);
        stayDTO.setImages(imageNames);
        StayDTO savedStay = stayService.save(stayDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStay);
    }

    @GetMapping("/images/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws MalformedURLException {
        Path imagePath = Paths.get("uploads/stays").resolve(imageName);
        Resource image = new UrlResource(imagePath.toUri());
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }

    @GetMapping("/random")
    public ResponseEntity<Set<StayDTO>> getRandomStays(@RequestParam(value = "size", defaultValue = "10") int size) {
        log.debug("Received request to get random stays with size: {}", size);
        Set<StayDTO> randomStays = stayService.getRandomStays(size);
        randomStays.forEach(stay -> stay.setImages(stay.getImages().stream()
                .map(image -> stayService.getBaseUrl() + "images/" + image)
                .collect(Collectors.toSet())));
        log.info("Returning {} random stays", randomStays.size());
        return ResponseEntity.status(HttpStatus.OK).body(randomStays);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStay(@PathVariable UUID id) {
        log.debug("Received request to delete stay with id: {}", id);
        stayService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StayDTO> getStay(@PathVariable UUID id) throws ResourceNotFoundException {
        Optional<StayDTO> stayFound = stayService.findById(id);
        if (stayFound.isPresent()) {
            StayDTO stayReturn = stayFound.get();
            stayReturn.setImages(stayReturn.getImages().stream()
                    .map(image -> stayService.getBaseUrl() + "images/" + image)
                    .collect(Collectors.toSet()));
            return ResponseEntity.status(HttpStatus.OK).body(stayReturn);
        } else {
            throw new ResourceNotFoundException("Stay not found");
        }
    }

}
