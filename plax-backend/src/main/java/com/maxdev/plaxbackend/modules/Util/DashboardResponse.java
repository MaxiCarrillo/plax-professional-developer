package com.maxdev.plaxbackend.modules.Util;

public record DashboardResponse(
        int totalUsers,
        int totalStays,
        int totalFeatures,
        int totalCategories,
        int totalReservations
) {
}

