package com.maxdev.plaxbackend.modules.Stay.Service.Impl;

import com.maxdev.plaxbackend.modules.Exception.ResourceNotFoundException;
import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import com.maxdev.plaxbackend.modules.Stay.Mapper.StayMapper;
import com.maxdev.plaxbackend.modules.Stay.Repository.StayRepository;
import com.maxdev.plaxbackend.modules.Stay.Service.IStayService;
import com.maxdev.plaxbackend.modules.Stay.Stay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StayService implements IStayService {

    /*
     * private final: La variable debe ser inicializada una vez y no puede ser cambiada después.
     * private: La variable puede ser cambiada después de ser inicializada.
     * */
    private final StayRepository stayRepository;

    @Autowired
    public StayService(StayRepository stayRepository) {
        this.stayRepository = stayRepository;
    }

    @Override
    @Transactional
    public StayDTO save(StayDTO stayDTO) {
        Stay stayToSave = StayMapper.INSTANCE.dtoToEntity(stayDTO);
        stayRepository.save(stayToSave);
        return StayMapper.INSTANCE.entityToDto(stayToSave);
    }

    @Override
    @Transactional
    public Optional<StayDTO> findById(UUID id) {
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
    public List<StayDTO> findAll() {
        return stayRepository.findAll()
                .stream()
                .map(StayMapper.INSTANCE::entityToDto)
                .toList();
    }

    @Override
    @Transactional
    public StayDTO update(StayDTO stayDTO) throws ResourceNotFoundException {
        stayRepository.findById(stayDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Stay not found with id: " + stayDTO.getId()));

        Stay stayToUpdate = StayMapper.INSTANCE.dtoToEntity(stayDTO);
        return StayMapper.INSTANCE.entityToDto(stayRepository.save(stayToUpdate));
    }


    @Override
    @Transactional
    public StayDTO delete(UUID id) throws ResourceNotFoundException {
        Stay stayToDelete = stayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stay not found with id: " + id));

        stayRepository.delete(stayToDelete);
        return StayMapper.INSTANCE.entityToDto(stayToDelete);
    }
}
