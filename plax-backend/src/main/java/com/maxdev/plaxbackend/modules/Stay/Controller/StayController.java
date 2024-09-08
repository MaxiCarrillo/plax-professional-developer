package com.maxdev.plaxbackend.modules.Stay.Controller;

import com.maxdev.plaxbackend.modules.Stay.DTO.StayDTO;
import com.maxdev.plaxbackend.modules.Stay.Service.Impl.StayService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        log.info("Returning {} stays", stayDTOS.size());
        return ResponseEntity.ok(stayDTOS);
    }

    @PostMapping
    public ResponseEntity<StayDTO> createStay(@RequestBody StayDTO stayDTO) {
        log.debug("Received request to create stay: {}", stayDTO);
        try {
            StayDTO savedStay = stayService.save(stayDTO);
            return ResponseEntity.ok(savedStay);
        } catch (IllegalArgumentException e) {
            log.error("Error creating stay: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }
}
