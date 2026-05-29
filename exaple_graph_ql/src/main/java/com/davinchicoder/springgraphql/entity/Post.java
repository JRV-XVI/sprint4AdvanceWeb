package com.davinchicoder.springgraphql.entity;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/** Entity: representa el modelo interno/persistente (BD) con identidad y estado;
 * DTO: objeto ligero para transferir datos entre capas sin exponer la entidad ni su lógica. */
@Data
@Builder
public class Post {

    private Long id;
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
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

}
