package com.maxdev.plaxbackend.modules.Stay.Service;

import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import com.maxdev.plaxbackend.modules.Stay.DTO.StaySaveDTO;
import com.maxdev.plaxbackend.modules.Stay.DTO.StaySummaryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

public interface IStayService {
    StaySaveDTO save(StaySaveDTO stayDTO, MultipartFile[] images) throws IOException;

    StayDTO findById(UUID id);

    StayDTO findByName(String name);

    Page<StayDTO> findAll(Pageable pageable);

    Set<StaySummaryDTO> getRandomStays(int size);

    void update(StaySaveDTO stayDTO, MultipartFile[] images, Set<String> imagesToDelete) throws IOException;

    void delete(UUID id) throws ResourceNotFoundException, IOException;

    Set<StaySummaryDTO> findByCategoryIdsAndCountryOrCity(Set<UUID> categoryIds, String searchTerm, LocalDate checkIn, LocalDate checkOut);
}
