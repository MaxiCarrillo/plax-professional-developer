package com.maxdev.plaxbackend.modules.Util;

public record ApiResponse<T>(int totalPages, T data, String message) {
}
