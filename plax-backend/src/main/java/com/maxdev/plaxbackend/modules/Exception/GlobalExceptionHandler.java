package com.maxdev.plaxbackend.modules.Exception;

import java.io.IOException;
import java.net.MalformedURLException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.log4j.Log4j2;

@Log4j2
@RestControllerAdvice
public class GlobalExceptionHandler {

    // @ExceptionHandler(Exception.class)
    // public ResponseEntity<String> handleException(Exception ex) {
    //     log.error("An error occurred", ex.getMessage());
    //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
    // }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        log.error("Resource not found", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(MalformedURLException.class)
    public ResponseEntity<String> handleMalformedURLException(MalformedURLException ex) {
        log.error("Invalid URL", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid URL");
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<String> handleResourceAlreadyExistsException(ResourceAlreadyExistsException ex) {
        log.error("Resource already exists", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

   @ExceptionHandler(IOException.class)
   public ResponseEntity<String> handleIOException(IOException ex) {
       log.error("An error occurred while processing the file", ex.getMessage());
       return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the file");
   }
}
