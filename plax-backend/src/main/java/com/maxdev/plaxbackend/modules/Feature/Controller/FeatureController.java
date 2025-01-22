package com.maxdev.plaxbackend.modules.Feature.Controller;

import com.maxdev.plaxbackend.modules.Category.DTO.CategoryDTO;
import com.maxdev.plaxbackend.modules.Feature.DTO.FeatureDTO;
import com.maxdev.plaxbackend.modules.Feature.Service.FeatureService;
import com.maxdev.plaxbackend.modules.Util.ApiPageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.UUID;

@Log4j2
@RestController
@Tag(name = "Feature", description = "Operaciones relacionadas con las características.")
@RequestMapping("/api/features")
public class FeatureController {

    private final FeatureService featureService;

    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<FeatureDTO> createFeature(@RequestPart("feature") FeatureDTO featureDTO,
                                                    @RequestPart("icon") MultipartFile icon) throws IOException {
        log.debug("Received request to create feature: {}", featureDTO.getName());
        FeatureDTO savedFeature = featureService.save(featureDTO, icon);
        log.debug("Feature created: {}", savedFeature.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFeature);
    }

    @PutMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<FeatureDTO> updateFeature(@RequestPart("feature") FeatureDTO featureDTO,
                                                    @RequestPart(value = "icon", required = false) MultipartFile icon) throws IOException {
        log.debug("Received request to update feature: {}", featureDTO.getId());
        FeatureDTO updatedFeature = featureService.update(featureDTO, icon);
        log.debug("Feature updated: {}", updatedFeature.getName());
        return ResponseEntity.status(HttpStatus.OK).body(updatedFeature);
    }

    @GetMapping
    public ResponseEntity<ApiPageResponse<List<FeatureDTO>>> getAllFeatures(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        log.debug("Received request to get all features");
        Pageable pageable = PageRequest.of(page, size);
        Page<FeatureDTO> pageFeatures = featureService.findAll(pageable);
        List<FeatureDTO> features = pageFeatures.getContent();
        log.debug("Returning {} features", features.size());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiPageResponse<>(
                        pageFeatures.getTotalPages(),
                        (int) pageFeatures.getTotalElements(),
                        features,
                        "Features retrieved successfully"));
    }

    @GetMapping("/all")
    public ResponseEntity<List<FeatureDTO>> getAllFeaturesWithoutPagination() {
        log.debug("Received request to get all features without pagination");
        List<FeatureDTO> features = featureService.findAllWithoutPagination();
        log.info("Returning {} features", features.size());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(features);
    }

    @GetMapping("/{name}")
    public ResponseEntity<FeatureDTO> getFeatureByName(@PathVariable String name) {
        log.debug("Received request to get feature by name: {}", name);
        FeatureDTO featureFound = featureService.findByName(name);
        log.debug("Feature retrieved: {}", featureFound.getName());
        return ResponseEntity.status(HttpStatus.OK).body(featureFound);
    }

    @GetMapping("/svg/{iconName}")
    public ResponseEntity<Resource> getFeatureIcon(@PathVariable String iconName) throws MalformedURLException {
        log.debug("Received request to get feature icon by name: {}", iconName);
        Resource resource = featureService.getIcon(iconName);
        log.debug("Feature icon retrieved: {}", iconName);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("image/svg+xml"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeature(@PathVariable UUID id) throws IOException {
        log.debug("Received request to delete feature by id: {}", id);
        featureService.delete(id);
        log.debug("Feature deleted: {}", id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}