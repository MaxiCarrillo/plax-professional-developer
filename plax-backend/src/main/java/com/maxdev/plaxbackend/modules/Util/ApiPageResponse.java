package com.maxdev.plaxbackend.modules.Util;

public record ApiPageResponse<T>(int totalPages, int totalElements,T data, String message) {
}
