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
    private String weapon;
    private Integer explosions;
    private String typeOfComedy;
    private Integer memeCount;
    private String monster;
    private Integer goreLevel;
}
