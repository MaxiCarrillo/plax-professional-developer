package com.maxdev.plaxbackend.modules.Stay.Service;

import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface IStayService {
    StayDTO save(StayDTO stayDTO);

    Optional<StayDTO> findById(UUID id);

    Optional<StayDTO> findByName(String name);

    Page<StayDTO> findAll(Pageable pageable);

    public Set<StayDTO> getRandomStays(int size);

    StayDTO update(StayDTO stayDTO) throws ResourceNotFoundException;

    StayDTO delete(UUID id) throws ResourceNotFoundException, IOException;
}
