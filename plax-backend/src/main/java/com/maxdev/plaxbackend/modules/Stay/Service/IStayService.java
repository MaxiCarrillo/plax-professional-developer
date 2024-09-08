package com.maxdev.plaxbackend.modules.Stay.Service;

import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IStayService {
    StayDTO save(StayDTO stayDTO);

    Optional<StayDTO> findById(UUID id);

    Optional<StayDTO> findByName(String name);

    List<StayDTO> findAll();

    StayDTO update(StayDTO stayDTO) throws ResourceNotFoundException;

    StayDTO delete(UUID id) throws ResourceNotFoundException;
}
