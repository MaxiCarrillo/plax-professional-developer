package com.maxdev.plaxbackend.modules.Reservation;

import com.maxdev.plaxbackend.modules.Stay.Stay;
import com.maxdev.plaxbackend.modules.User.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
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
    private Date checkIn;
    @NotNull(message = "CheckOut cannot be null")
    private Date checkOut;
    @NotNull(message = "Total cannot be null")
    private Double total;
    @NotNull(message = "Stay cannot be null")
    @ManyToOne
    private Stay stay;
    @NotNull(message = "User cannot be null")
    @ManyToOne
    private User user;
}
