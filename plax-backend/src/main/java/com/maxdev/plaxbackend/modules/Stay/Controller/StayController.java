package com.maxdev.plaxbackend.modules.Stay.Controller;

import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import com.maxdev.plaxbackend.modules.Stay.Service.Impl.StayService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
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

@Log4j2
@RestController
@RequestMapping("/api/stays")
public class StayController {

    StayService stayService;

    @Autowired
    public StayController(StayService stayService) {
        this.stayService = stayService;
    }

    @GetMapping
    public ResponseEntity<List<StayDTO>> getAllStays(@RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "size", defaultValue = "10") int size) {
        log.debug("Received request to get all stays with page: {} and size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<StayDTO> stays = stayService.findAll(pageable);
        List<StayDTO> stayDTOS = stays.getContent();
        stayDTOS.forEach(stay -> stay.setImages(stay.getImages().stream()
                .map(image -> stayService.getBaseUrl() + "images/" + image)
                .collect(Collectors.toSet())));
        log.info("Returning {} stays", stayDTOS.size());
        return ResponseEntity.ok(stayDTOS);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<StayDTO> createStay(@RequestPart("stay") StayDTO stayDTO,
                                              @RequestPart("images") MultipartFile[] images) {
        log.debug("Received request to create stay: {}", stayDTO);
        try {
            Set<String> imageNames = stayService.saveImages(images);
            stayDTO.setImages(imageNames);
            StayDTO savedStay = stayService.save(stayDTO);
            return ResponseEntity.ok(savedStay);
        } catch (IllegalArgumentException | IOException e) {
            log.error("Error creating stay: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @GetMapping("/images/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        Path imagePath = Paths.get("uploads/stays").resolve(imageName);
        try {
            Resource image = new UrlResource(imagePath.toUri());
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(image);
        } catch (MalformedURLException e) {
            log.error("Error getting image: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/random")
    public ResponseEntity<Set<StayDTO>> getRandomStays(@RequestParam(value = "size", defaultValue = "10") int size) {
        log.debug("Received request to get random stays with size: {}", size);
        Set<StayDTO> randomStays = stayService.getRandomStays(size);
        randomStays.forEach(stay -> stay.setImages(stay.getImages().stream()
                .map(image -> stayService.getBaseUrl() + "images/" + image)
                .collect(Collectors.toSet())));
        log.info("Returning {} random stays", randomStays.size());
        return ResponseEntity.ok(randomStays);
    }
}