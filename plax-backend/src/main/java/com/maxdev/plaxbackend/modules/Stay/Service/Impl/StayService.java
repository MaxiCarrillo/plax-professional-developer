package com.maxdev.plaxbackend.modules.Stay.Service.Impl;

import com.maxdev.plaxbackend.modules.Exception.ResourceAlreadyExistsException;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import com.maxdev.plaxbackend.modules.Stay.Mapper.StayMapper;
import com.maxdev.plaxbackend.modules.Stay.Repository.StayImageRepository;
import com.maxdev.plaxbackend.modules.Stay.Repository.StayRepository;
import com.maxdev.plaxbackend.modules.Stay.Service.IStayService;
import com.maxdev.plaxbackend.modules.Stay.Stay;
import com.maxdev.plaxbackend.modules.Stay.StayImage;

import lombok.extern.log4j.Log4j2;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static java.time.LocalDateTime.now;

@Log4j2
@Service
public class StayService implements IStayService {

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
    public StayDTO save(StayDTO stayDTO) {
        stayRepository.findByName(stayDTO.getName())
                .ifPresent(stay -> {
                    log.error("Stay with name: {} already exists", stayDTO.getName());
                    throw new ResourceAlreadyExistsException(
                            "Stay with name: " + stayDTO.getName() + " already exists");
                });
        Stay stayToSave = StayMapper.INSTANCE.dtoToEntity(stayDTO);
        stayRepository.save(stayToSave);
        log.info("Stay saved: {}", stayToSave.getName());
        return StayMapper.INSTANCE.entityToDto(stayToSave);
    }

    @Override
    @Transactional
    public StayDTO update(StayDTO stayDTO) throws ResourceNotFoundException {
        stayRepository.findById(stayDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Stay not found with id: " + stayDTO.getId()));

        Stay stayToUpdate = StayMapper.INSTANCE.dtoToEntity(stayDTO);

        for (StayImage stayImage : stayToUpdate.getImages()) {
            if (stayImageRepository.findByUrl(stayImage.getUrl()).isPresent())
                stayImage.setId(stayImageRepository.findByUrl(stayImage.getUrl()).get().getId());
        }

        stayRepository.save(stayToUpdate);
        log.info("Stay updated: {}", stayToUpdate.getName());
        return StayMapper.INSTANCE.entityToDto(stayToUpdate);
    }

    @Override
    @Transactional
    public Optional<StayDTO> findById(UUID id) throws ResourceNotFoundException {
        return stayRepository.findById(id)
                .map(StayMapper.INSTANCE::entityToDto);
    }

    @Override
    @Transactional
    public Optional<StayDTO> findByName(String name) {
        return stayRepository.findByName(name)
                .map(StayMapper.INSTANCE::entityToDto);
    }

    @Override
    @Transactional
    public Page<StayDTO> findAll(Pageable pageable) {
        log.debug("Finding all stays with pageable: {}", pageable);
        return stayRepository.findAll(pageable)
                .map(StayMapper.INSTANCE::entityToDto);
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
        return randomStays;
    }

    @Override
    @Transactional
    public StayDTO delete(UUID id) throws ResourceNotFoundException, IOException {
        Stay stayToDelete = stayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stay not found with id: " + id));

        stayRepository.delete(stayToDelete);
        deleteFileImages(stayToDelete.getImages());
        return StayMapper.INSTANCE.entityToDto(stayToDelete);
    }

    public Set<String> saveImages(MultipartFile[] images) throws IOException {
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

    public void deleteFileImages(Set<StayImage> imageNames) throws IOException {
        for (StayImage imageName : imageNames) {
            Path filePath = Paths.get("uploads/stays").resolve(imageName.getUrl()).normalize();
            Files.deleteIfExists(filePath);
        }
    }

    public void deleteImages(Set<String> imageNames) throws IOException {

        stayImageRepository.deleteByUrls(imageNames);
    }

    public String getBaseUrl() {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/stays/").toUriString();
    }
}
