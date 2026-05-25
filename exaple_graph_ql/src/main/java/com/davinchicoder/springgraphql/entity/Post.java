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
    private String weapon;
    private Integer explosions;
    private String typeOfComedy;
    private Integer memeCount;
    private String monster;
    private Integer goreLevel;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

}
