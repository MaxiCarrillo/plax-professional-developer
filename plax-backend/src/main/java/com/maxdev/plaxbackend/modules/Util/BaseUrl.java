package com.maxdev.plaxbackend.modules.Util;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public interface BaseUrl {

    default String getBaseUrl() {
        return ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
    }
}
