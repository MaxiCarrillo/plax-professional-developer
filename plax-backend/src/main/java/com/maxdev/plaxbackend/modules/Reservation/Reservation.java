package com.maxdev.plaxbackend.modules.Reservation;

import com.maxdev.plaxbackend.modules.Stay.Stay;
import com.maxdev.plaxbackend.modules.User.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;
    @NotNull(message = "CheckIn cannot be null")
    private LocalDate checkIn;
    @NotNull(message = "CheckOut cannot be null")
    private LocalDate checkOut;
    @NotNull(message = "Total cannot be null")
    private Double total;
    private Boolean confirmed = false;
    @NotNull(message = "Stay cannot be null")
    @ManyToOne
    @JoinColumn(name = "id_stay")
    private Stay stay;
    @NotNull(message = "User cannot be null")
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;
}
