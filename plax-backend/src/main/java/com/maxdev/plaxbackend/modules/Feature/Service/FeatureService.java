package com.maxdev.plaxbackend.modules.Feature.Service;

import com.maxdev.plaxbackend.modules.Exception.ResourceAlreadyExistsException;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Feature.DTO.FeatureDTO;
import com.maxdev.plaxbackend.modules.Feature.Feature;
import com.maxdev.plaxbackend.modules.Feature.Mapper.FeatureMapper;
import com.maxdev.plaxbackend.modules.Feature.Repository.FeatureRepository;
import com.maxdev.plaxbackend.modules.Stay.Repository.StayRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import static java.time.LocalDateTime.now;

@Log4j2
@Service
public class FeatureService implements IFeatureService {

    private final FeatureRepository featureRepository;
    private final StayRepository stayRepository;

    public FeatureService(FeatureRepository featureRepository, StayRepository stayRepository) {
        this.featureRepository = featureRepository;
        this.stayRepository = stayRepository;
    }

    @Override
    public FeatureDTO save(FeatureDTO featureDTO, MultipartFile icon) throws IOException {
        featureRepository.findByName(featureDTO.getName()).ifPresent(feature -> {
            log.error("Feature with name: {} already exists", featureDTO.getName());
            throw new ResourceAlreadyExistsException("Feature with name: " + featureDTO.getName() + " already exists");
        });
        String fileName = saveIcon(icon);
        featureDTO.setIcon(fileName);
        Feature featureToSave = FeatureMapper.INSTANCE.dtoToEntity(featureDTO);
        featureRepository.save(featureToSave);
        log.info("Feature saved: {}", featureToSave.getName());
        return FeatureMapper.INSTANCE.entityToDto(featureToSave);
    }

    @Override
    public FeatureDTO update(FeatureDTO featureDTO, MultipartFile icon) throws IOException {
        log.debug("Updating feature: {}", featureDTO.getId());

        Feature featureToUpdate = featureRepository.findById(featureDTO.getId()).orElseThrow(() -> {
            log.error("Feature with id: {} not found", featureDTO.getId());
            return new ResourceNotFoundException("Feature with id: " + featureDTO.getId() + " not found");
        });

        if (!featureToUpdate.getName().equals(featureDTO.getName())) {
            featureRepository.findByName(featureDTO.getName()).ifPresent(feature -> {
                log.error("Feature with name: {} already exists", featureDTO.getName());
                throw new ResourceAlreadyExistsException("Feature with name: " + featureDTO.getName() + " already exists");
            });
        }

        if (icon != null) {
            featureDTO.setIcon(saveIcon(icon));
            deleteIcon(featureToUpdate.getIcon());
        } else featureDTO.setIcon(featureToUpdate.getIcon());

        featureToUpdate = FeatureMapper.INSTANCE.dtoToEntity(featureDTO);
        featureRepository.save(featureToUpdate);
        log.info("Feature updated: {}", featureToUpdate.getName());
        return FeatureMapper.INSTANCE.entityToDto(featureToUpdate);
    }

    @Override
    public FeatureDTO findById(Long id) {
        return null;
    }

    @Override
    public FeatureDTO findByName(String name) {
        Feature feature = featureRepository.findByName(name).orElseThrow(() -> {
            log.error("Feature with name: {} not found", name);
            return new ResourceNotFoundException("Feature with name: " + name + " not found");
        });
        FeatureDTO featureFound = FeatureMapper.INSTANCE.entityToDto(feature);
        featureFound.setIcon(getBaseUrl() + "svg/" + featureFound.getIcon());
        return featureFound;
    }

    @Override
    public Page<FeatureDTO> findAll(Pageable pageable) {
        log.debug("Retrieving all features");
        Page<FeatureDTO> pageFeatures = featureRepository.findAll(pageable).map(FeatureMapper.INSTANCE::entityToDto);
        pageFeatures.forEach(featureDTO -> {
            String svgUrl = getBaseUrl() + "svg/" + featureDTO.getIcon();
            featureDTO.setIcon(svgUrl);
        });
        return pageFeatures;
    }

    @Override
    public List<FeatureDTO> findAllWithoutPagination() {
        log.debug("Retrieving all features without pagination");
        List<FeatureDTO> features = featureRepository.findAll().stream()
                .map(FeatureMapper.INSTANCE::entityToDto)
                .toList();
        features.forEach(featureDTO -> {
            String svgUrl = getBaseUrl() + "svg/" + featureDTO.getIcon();
            featureDTO.setIcon(svgUrl);
        });
        return features;
    }

    @Override
    public void delete(UUID id) throws ResourceNotFoundException, IOException {
        log.debug("Deleting feature by id: {}", id);
        Feature featureToDelete = featureRepository.findById(id).orElseThrow(() -> {
            log.error("Feature with id: {} not found", id);
            return new ResourceNotFoundException("Feature with id: " + id + " not found");
        });

        stayRepository.findByFeatureIds(Set.of(id)).forEach(stay -> {
            stay.getFeatures().remove(featureToDelete);
            stayRepository.save(stay);
        });

        featureRepository.delete(featureToDelete);
        if (!featureRepository.existsById(id)) {
            deleteIcon(featureToDelete.getIcon());
        }
        log.info("Feature deleted: {}", featureToDelete.getName());
    }

    public Resource getIcon(String iconName) throws MalformedURLException {
        Path filePath = Paths.get("uploads/features").resolve(iconName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (!resource.exists()) {
            log.error("Feature icon not found: {}", iconName);
            throw new ResourceNotFoundException("Feature icon not found: " + iconName);
        }
        return resource;
    }

    private String saveIcon(MultipartFile icon) throws IOException {
        String uploadDir = "uploads/features";
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String timestamp = now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String fileName = timestamp + "_" + icon.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(icon.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    private void deleteIcon(String iconName) throws IOException {
        Path iconPath = Paths.get("uploads/features").resolve(iconName);
        Files.deleteIfExists(iconPath);
    }

    private String getBaseUrl() {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/features/").toUriString();
    }
}
