package com.maxdev.plaxbackend.modules.Review;

import com.maxdev.plaxbackend.modules.Reservation.Reservation;
import com.maxdev.plaxbackend.modules.Stay.Stay;
import com.maxdev.plaxbackend.modules.User.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    @NotNull
    @Positive
    private Integer qualification;
    private String comment;

    @NotNull
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_stay", nullable = false, foreignKey = @ForeignKey(name = "FK_id_stay"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Stay stay;
}
