package com.maxdev.plaxbackend.modules.Util;

public record ApiPageResponse<T>(int totalPages, T data, String message) {
}
