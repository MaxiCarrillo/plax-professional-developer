package com.maxdev.plaxbackend.modules.Util;

public record ApiResponse<T>(int status, int totalPages, T data, String message) {
}
