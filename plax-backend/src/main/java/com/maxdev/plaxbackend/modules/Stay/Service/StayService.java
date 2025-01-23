package com.maxdev.plaxbackend.modules.Stay.Service;

import com.maxdev.plaxbackend.modules.Exception.ResourceAlreadyExistsException;
import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Feature.Feature;
import com.maxdev.plaxbackend.modules.Feature.Repository.FeatureRepository;
import com.maxdev.plaxbackend.modules.Reservation.Repository.ReservationRepository;
import com.maxdev.plaxbackend.modules.Reservation.Reservation;
import com.maxdev.plaxbackend.modules.Review.DTO.ReviewSummaryDTO;
import com.maxdev.plaxbackend.modules.Review.Mapper.ReviewSummaryMapper;
import com.maxdev.plaxbackend.modules.Review.Repository.ReviewRepository;
import com.maxdev.plaxbackend.modules.Review.Review;
import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import com.maxdev.plaxbackend.modules.Stay.DTO.StaySaveDTO;
import com.maxdev.plaxbackend.modules.Stay.DTO.StaySummaryDTO;
import com.maxdev.plaxbackend.modules.Stay.Mapper.StayMapper;
import com.maxdev.plaxbackend.modules.Stay.Mapper.StaySaveMapper;
import com.maxdev.plaxbackend.modules.Stay.Mapper.StaySummaryMapper;
import com.maxdev.plaxbackend.modules.Stay.Repository.StayImageRepository;
import com.maxdev.plaxbackend.modules.Stay.Repository.StayRepository;
import com.maxdev.plaxbackend.modules.Stay.Stay;
import com.maxdev.plaxbackend.modules.Stay.StayImage;
import com.maxdev.plaxbackend.modules.User.Repository.UserRepository;
import com.maxdev.plaxbackend.modules.Util.BaseUrl;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static java.time.LocalDateTime.now;

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
    private final ReservationRepository reservationRepository;
    private final ReviewRepository reviewRepository;
    private final FeatureRepository featureRepository;
    private final UserRepository userRepository;

    public StayService(StayRepository stayRepository, StayImageRepository stayImageRepository, ReservationRepository reservationRepository, ReviewRepository reviewRepository, FeatureRepository featureRepository, UserRepository userRepository) {
        this.stayRepository = stayRepository;
        this.stayImageRepository = stayImageRepository;
        this.reservationRepository = reservationRepository;
        this.reviewRepository = reviewRepository;
        this.featureRepository = featureRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public StaySaveDTO save(StaySaveDTO stayDTO, MultipartFile[] images) throws IOException {
        log.info(stayDTO);
        stayRepository.findByName(stayDTO.getName()).ifPresent(stay -> {
            log.error("Stay with name: {} already exists", stayDTO.getName());
            throw new ResourceAlreadyExistsException("Stay with name: " + stayDTO.getName() + " already exists");
        });

        log.info("Saving stay: {}", stayDTO.getName());
        Set<String> imageNames = saveImages(images);
        stayDTO.setImages(imageNames);
        Stay stayToSave = StaySaveMapper.INSTANCE.dtoToEntity(stayDTO);
        log.info("Stay to save: {}", stayToSave);
        stayToSave.setAppreciation(0.0);
        stayRepository.save(stayToSave);
        log.info("Stay saved: {}", stayToSave.getName());
        return StaySaveMapper.INSTANCE.entityToDto(stayToSave);
    }

    // TODO: Arreglar
    @Override
    @Transactional
    public void update(StaySaveDTO stayDTO, MultipartFile[] images, Set<String> imagesToDelete)
            throws IOException {
        log.debug("Updating stay: {}", stayDTO.getId());
        boolean hasImageToDelete = imagesToDelete != null && !imagesToDelete.isEmpty();
        Stay stayToUpdate = stayRepository.findById(stayDTO.getId()).orElseThrow(() -> {
            log.error("Stay with id: {} not found", stayDTO.getId());
            return new ResourceNotFoundException("Stay with id: " + stayDTO.getId() + " not found");
        });

        if (!stayToUpdate.getName().equals(stayDTO.getName())) {
            Optional<Stay> stayWithSameName = stayRepository.findByName(stayDTO.getName());
            if (stayWithSameName.isPresent() && !stayWithSameName.get().getId().equals(stayDTO.getId())) {
                log.error("Stay with name: {} already exists", stayDTO.getName());
                throw new ResourceAlreadyExistsException("Stay with name: " + stayDTO.getName() + " already exists");
            }
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
//        for (StayImage stayImage : stayToUpdate.getImages()) {
//            if (stayImageRepository.findByUrl(stayImage.getUrl()).isPresent())
//                stayImage.setId(stayImageRepository.findByUrl(stayImage.getUrl()).get().getId());
//        }

        // Actualizar Features: reutilizar las existentes y agregar nuevas
        if (stayDTO.getFeatures() != null) {
            Set<Feature> updatedFeatures = stayDTO.getFeatures().stream()
                    .map(featureDTO -> featureRepository.findById(featureDTO)
                            .orElseThrow(() -> new ResourceNotFoundException("Feature with id: " + featureDTO + " not found")))
                    .collect(Collectors.toSet());
            stayToUpdate.setFeatures(updatedFeatures);
        }
        stayToUpdate = stayRepository.save(stayToUpdate);

        if (hasImageToDelete) {
            stayImageRepository.deleteByUrls(imagesToDelete);
        }

        log.debug("Stay updated: {}", stayToUpdate.getName());
    }

    @Override
    @Transactional
    public StayDTO findById(UUID id) throws ResourceNotFoundException {
        log.debug("Finding stay by id: {}", id);
        Stay stay = stayRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Stay with id: {} not found", id);
                    return new ResourceNotFoundException("Stay with id: " + id + " not found");
                });
        Set<LocalDate> unavailableDates = getUnavailableDates(id);
        Set<Review> reviews = reviewRepository.findByStayId(id);
        StayDTO stayFound = StayMapper.INSTANCE.entityToDto(stay);
        Set<ReviewSummaryDTO> reviewsDTO = reviews.stream().map(ReviewSummaryMapper.INSTANCE::entityToDto).collect(Collectors.toSet());
        stayFound.setReviews(reviewsDTO);
        stayFound.setUnavailableDates(unavailableDates);
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
            stayDTO.setTotalReviews(reviewRepository.findByStayId(stayDTO.getId()).size());
            stayDTO.setImages(stayDTO.getImages().stream()
                    .map(image -> getBaseUrl() + "/api/stays/images/" + image)
                    .collect(Collectors.toSet()));
        });
        return pageStays;
    }

    @Override
    public Set<StaySummaryDTO> findByCategoryIdsAndCountryOrCity(Set<UUID> categoryIds, String searchTerm, LocalDate checkIn, LocalDate checkOut) {
        log.debug("Finding stays by category ids: {} and search term: {}", categoryIds, searchTerm);
        Set<StaySummaryDTO> stays;

        if ((categoryIds == null || categoryIds.isEmpty()) && (searchTerm == null || searchTerm.isEmpty()) && checkIn == null && checkOut == null) {
            stays = stayRepository.findAll().stream()
                    .map(StaySummaryMapper.INSTANCE::entityToDto)
                    .collect(Collectors.toSet());
        } else {
            stays = stayRepository.findByCategoryAndCountryOrCityContainingIgnoreCase(categoryIds, searchTerm, checkIn, checkOut).stream()
                    .map(StaySummaryMapper.INSTANCE::entityToDto)
                    .collect(Collectors.toSet());
        }

        log.debug("Returning {} stays", stays.size());
        stays.forEach(stay -> {
            stay.setTotalReviews(reviewRepository.findByStayId(stay.getId()).size());
            stay.setImages(stay.getImages().stream()
                    .map(image -> getBaseUrl() + "/api/stays/images/" + image)
                    .collect(Collectors.toSet())
            );
        });
        return stays;
    }

    @Override
    @Transactional
    public Set<StaySummaryDTO> getRandomStays(int size) {
        log.debug("Finding random stays with size: {}", size);
        Set<StaySummaryDTO> randomStays = new HashSet<>();
        List<Stay> stays = stayRepository.findAll();

        if (stays.size() < size)
            size = stays.size();
        Random random = new Random();
        while (randomStays.size() < size)
            randomStays.add(StaySummaryMapper.INSTANCE.entityToDto(stays.get(random.nextInt(stays.size()))));

        randomStays.forEach(stay -> {
            stay.setTotalReviews(reviewRepository.findByStayId(stay.getId()).size());
            stay.setImages(stay.getImages().stream()
                    .map(image -> getBaseUrl() + "/api/stays/images/" + image)
                    .collect(Collectors.toSet()));
        });
        log.info("Returning {} random stays", randomStays.size());
        return randomStays;
    }

    @Override
    @Transactional
    public void delete(UUID id) throws ResourceNotFoundException, IOException {
        log.debug("Deleting stay with id: {}", id);
        Stay stayToDelete = stayRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Stay with id: {} not found", id);
                    return new ResourceNotFoundException("La estancia con id: " + id + " no se ha encontrado");
                });
        userRepository.findByFavoritesIds(Collections.singleton(id)).forEach(user ->
                user.getFavorites().remove(stayToDelete)
        );
        stayRepository.delete(stayToDelete);
        if (!stayRepository.existsById(id)) {
            deleteFileImages(stayToDelete.getImages());
        }
        log.info("Stay deleted: {}", stayToDelete.getName());
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

    public Set<LocalDate> getUnavailableDates(UUID id) {
        log.debug("Getting unavailable dates for stay with id: {}", id);
        List<Reservation> reservations = reservationRepository.findByStayId(id);

        return reservations.stream()
                .flatMap(reservation -> reservation.getCheckIn().datesUntil(reservation.getCheckOut().plusDays(1)))
                .collect(Collectors.toSet());
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
