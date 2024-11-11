package com.maxdev.plaxbackend.modules.Stay;

import com.maxdev.plaxbackend.modules.Category.Category;
import com.maxdev.plaxbackend.modules.Feature.Feature;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data // Generar los getters y setters
@AllArgsConstructor // Generar el constructor con todos los argumentos
@NoArgsConstructor // Generar el constructor vacio
@Builder // Generar el patron de diseño Builder
@Entity(name = "stays")
public class Stay {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;
    @NotNull(message = "Name cannot be null")
    private String name;
    private String description;
    @NotNull(message = "Images cannot be null")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<StayImage> images;

    @NotNull(message = "Features cannot be null")
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinTable(
            name = "stay_feature",
            joinColumns = @JoinColumn(name = "stay_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id")
    )
    private Set<Feature> features;

    @NotNull(message = "Price cannot be null")
    @PositiveOrZero(message = "Price must be zero or positive")
    private Double price;
    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;
    private String address;
}
