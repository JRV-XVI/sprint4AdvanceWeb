package com.davinchicoder.springgraphql.dto;

import lombok.Builder;
import lombok.Data;

/** DTO (Data Transfer Object): objeto simple usado para transportar datos entre capas
 *  (ej. cliente ↔ servidor) sin exponer la entidad interna. */
@Data
@Builder
public class PostDto {

    private String title;
    private String content;
    private String author;
    private String genre;
    private String imageUrl;
    
    // Minecraft fields
    private String material;
    private Integer durability;
    private String enchantment;
    private Integer damage;
    private String biome;
    private Integer foodPoints;
    private String effect;
}
