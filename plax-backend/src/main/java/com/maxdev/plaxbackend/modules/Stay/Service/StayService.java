package com.maxdev.plaxbackend.modules.Stay.Service;

import static java.time.LocalDateTime.now;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.maxdev.plaxbackend.modules.Exception.ResourceAlreadyExistsException;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Stay.Stay;
import com.maxdev.plaxbackend.modules.Stay.StayImage;
import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import com.maxdev.plaxbackend.modules.Stay.DTO.StaySaveDTO;
import com.maxdev.plaxbackend.modules.Stay.Mapper.StayMapper;
import com.maxdev.plaxbackend.modules.Stay.Mapper.StaySaveMapper;
import com.maxdev.plaxbackend.modules.Stay.Repository.StayImageRepository;
import com.maxdev.plaxbackend.modules.Stay.Repository.StayRepository;
import com.maxdev.plaxbackend.modules.Util.BaseUrl;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class StayService implements IStayService, BaseUrl {

    /*
     * private final: La variable debe ser inicializada una vez y no puede ser
     * cambiada después.
     * private: La variable puede ser cambiada después de ser inicializada.
     */
    private final StayRepository stayRepository;
    private final StayImageRepository stayImageRepository;

    public StayService(StayRepository stayRepository, StayImageRepository stayImageRepository) {
        this.stayRepository = stayRepository;
        this.stayImageRepository = stayImageRepository;
    }

    @Override
    @Transactional
    public StaySaveDTO save(StaySaveDTO stayDTO, MultipartFile[] images) throws IOException {
        stayRepository.findByName(stayDTO.getName()).ifPresent(stay -> {
            log.error("Stay with name: {} already exists", stayDTO.getName());
            throw new ResourceAlreadyExistsException("Stay with name: " + stayDTO.getName() + " already exists");
        });
        Set<String> imageNames = saveImages(images);
        stayDTO.setImages(imageNames);
        Stay stayToSave = StaySaveMapper.INSTANCE.dtoToEntity(stayDTO);
        stayToSave.setAppreciation(0.0);
        stayRepository.save(stayToSave);
        log.info("Stay saved: {}", stayToSave.getName());
        return StaySaveMapper.INSTANCE.entityToDto(stayToSave);
    }

    @Override
    @Transactional
    public StaySaveDTO update(StaySaveDTO stayDTO, MultipartFile[] images, Set<String> imagesToDelete)
            throws IOException {
        log.debug("Updating stay: {}", stayDTO.getId());
        boolean hasImageToDelete = imagesToDelete != null && !imagesToDelete.isEmpty();
        Stay stayToUpdate = stayRepository.findById(stayDTO.getId()).orElseThrow(() -> {
            log.error("Stay with id: {} not found", stayDTO.getId());
            return new ResourceNotFoundException("Stay with id: " + stayDTO.getId() + " not found");
        });

        if (!stayToUpdate.getName().equals(stayDTO.getName())) {
            stayRepository.findByName(stayDTO.getName()).ifPresent(stay -> {
                log.error("Stay with name: {} already exists", stayDTO.getName());
                throw new ResourceAlreadyExistsException("Stay with name: " + stayDTO.getName() + " already exists");
            });
        }

        stayDTO.setImages(stayToUpdate.getImages().stream().map(StayImage::getUrl).collect(Collectors.toSet()));
        if (images != null) {
            Set<String> imageNames = saveImages(images);
            stayDTO.getImages().addAll(imageNames);
        }

        if (hasImageToDelete) {
            stayDTO.getImages().removeAll(imagesToDelete);
        }

        // Reutiliza las imagenes que ya existen en la base de datos
        stayToUpdate = StaySaveMapper.INSTANCE.dtoToEntity(stayDTO);
        for (StayImage stayImage : stayToUpdate.getImages()) {
            if (stayImageRepository.findByUrl(stayImage.getUrl()).isPresent())
                stayImage.setId(stayImageRepository.findByUrl(stayImage.getUrl()).get().getId());
        }

        stayToUpdate = stayRepository.save(stayToUpdate);

        if (hasImageToDelete) {
            stayImageRepository.deleteByUrls(imagesToDelete);
        }

        log.info("Stay updated: {}", stayToUpdate.getName());
        return StaySaveMapper.INSTANCE.entityToDto(stayToUpdate);
    }

    @Override
    @Transactional
    public StayDTO findById(UUID id) throws ResourceNotFoundException {
        Stay stay = stayRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Stay with id: {} not found", id);
                    return new ResourceNotFoundException("Stay with id: " + id + " not found");
                });
        StayDTO stayFound = StayMapper.INSTANCE.entityToDto(stay);
        stayFound.setImages(stayFound.getImages().stream()
                .map(image -> getBaseUrl() + "/api/stays/images/" + image)
                .collect(Collectors.toSet()));
        stayFound.setFeatures(stayFound.getFeatures().stream()
                .peek(feature -> feature.setIcon(getBaseUrl() + "/api/features/svg/" + feature.getIcon()))
                .collect(Collectors.toSet()));
        return stayFound;
    }

    @Override
    @Transactional
    public StayDTO findByName(String name) {
        log.debug("Finding stay by name: {}", name);
        Stay stay = stayRepository.findByName(name).orElseThrow(() -> {
            log.error("Stay with name: {} not found", name);
            return new ResourceNotFoundException("Stay with name: " + name + " not found");
        });
        StayDTO stayFound = StayMapper.INSTANCE.entityToDto(stay);
        stayFound.setImages(stayFound.getImages().stream()
                .map(image -> getBaseUrl() + "/api/stays/images/" + image)
                .collect(Collectors.toSet()));
        stayFound.setFeatures(stayFound.getFeatures().stream()
                .peek(feature -> feature.setIcon(getBaseUrl() + "/api/features/svg/" + feature.getIcon()))
                .collect(Collectors.toSet()));
        return stayFound;
    }

    @Override
    @Transactional
    public Page<StayDTO> findAll(Pageable pageable) {
        log.debug("Finding all stays with pageable: {}", pageable);
        Page<StayDTO> pageStays = stayRepository.findAll(pageable).map(StayMapper.INSTANCE::entityToDto);
        pageStays.forEach(stayDTO -> {
            stayDTO.setImages(stayDTO.getImages().stream()
                    .map(image -> getBaseUrl() + "/api/stays/images/" + image)
                    .collect(Collectors.toSet()));
            stayDTO.setFeatures(stayDTO.getFeatures().stream()
                    .peek(feature -> feature.setIcon(getBaseUrl() + "/api/features/svg/" + feature.getIcon()))
                    .collect(Collectors.toSet()));
        });
        return pageStays;
    }

    public Set<StayDTO> findByCategoryIds(Set<UUID> categoryIds) {
        log.debug("Finding stays by category ids: {}", categoryIds);
        Set<StayDTO> stays;
        if (categoryIds == null || categoryIds.isEmpty()) {
            stays = stayRepository.findAll().stream()
                    .map(StayMapper.INSTANCE::entityToDto)
                    .collect(Collectors.toSet());
        } else {
            stays = stayRepository.findByCategory_IdIn(categoryIds).stream()
                    .map(StayMapper.INSTANCE::entityToDto)
                    .collect(Collectors.toSet());
        }
        stays.forEach(stay -> {
            stay.setImages(stay.getImages().stream()
                    .map(image -> getBaseUrl() + "/api/stays/images/" + image)
                    .collect(Collectors.toSet()));
            stay.setFeatures(stay.getFeatures().stream()
                    .peek(feature -> feature.setIcon(getBaseUrl() + "/api/features/svg/" + feature.getIcon()))
                    .collect(Collectors.toSet()));
        });
        return stays;
    }

    @Override
    @Transactional
    public Set<StayDTO> getRandomStays(int size) {
        log.debug("Finding random stays with size: {}", size);
        Set<StayDTO> randomStays = new HashSet<>();
        List<Stay> stays = stayRepository.findAll();
        if (stays.size() < size)
            size = stays.size();
        Random random = new Random();
        while (randomStays.size() < size)
            randomStays.add(StayMapper.INSTANCE.entityToDto(stays.get(random.nextInt(stays.size()))));

        randomStays.forEach(stay -> {
            stay.setImages(stay.getImages().stream()
                    .map(image -> getBaseUrl() + "/api/stays/images/" + image)
                    .collect(Collectors.toSet()));
            stay.setFeatures(stay.getFeatures().stream()
                    .peek(feature -> feature.setIcon(getBaseUrl() + "/api/features/svg/" + feature.getIcon()))
                    .collect(Collectors.toSet()));
        });
        log.info("Returning {} random stays", randomStays.size());
        return randomStays;
    }

    @Override
    @Transactional
    public StayDTO delete(UUID id) throws ResourceNotFoundException, IOException {
        log.debug("Deleting stay with id: {}", id);
        Stay stayToDelete = stayRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Stay with id: {} not found", id);
                    return new ResourceNotFoundException("Stay with id: " + id + " not found");
                });

        stayRepository.delete(stayToDelete);
        if (!stayRepository.existsById(id)) {
            deleteFileImages(stayToDelete.getImages());
        }
        log.info("Stay deleted: {}", stayToDelete.getName());
        return StayMapper.INSTANCE.entityToDto(stayToDelete);
    }

    public Resource getImage(String imageName) throws MalformedURLException {
        log.debug("Getting image with name: {}", imageName);
        Path imagePath = Paths.get("uploads/stays").resolve(imageName);
        Resource resource = new UrlResource(imagePath.toUri());
        if (!resource.exists()) {
            log.error("Image not found: {}", imageName);
            throw new ResourceNotFoundException("Image not found: " + imageName);
        }
        return resource;
    }

    private Set<String> saveImages(MultipartFile[] images) throws IOException {
        Set<String> imageNames = new HashSet<>();
        String uploadDir = "uploads/stays";
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        for (MultipartFile image : images) {
            String timestamp = now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            String fileName = timestamp + "_" + image.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            imageNames.add(fileName);
        }
        return imageNames;
    }

    private void deleteFileImages(Set<StayImage> imageNames) throws IOException {
        for (StayImage imageName : imageNames) {
            Path filePath = Paths.get("uploads/stays").resolve(imageName.getUrl()).normalize();
            Files.deleteIfExists(filePath);
        }
    }
}
