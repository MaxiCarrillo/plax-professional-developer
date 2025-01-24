package com.maxdev.plaxbackend.modules.Category;

import com.maxdev.plaxbackend.modules.Stay.Stay;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "categories")
public class Category {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;
    @NotNull(message = "Name cannot be null")
    private String name;
    private String description;
    @NotNull(message = "Image cannot be null")
    private String image;
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Stay> stays;
}
