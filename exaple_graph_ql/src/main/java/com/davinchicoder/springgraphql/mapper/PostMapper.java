package com.davinchicoder.springgraphql.mapper;

import com.davinchicoder.springgraphql.dto.PostDto;
import com.davinchicoder.springgraphql.entity.Post;
import org.springframework.stereotype.Component;

import java.util.function.Function;

/** Mapper que convierte un PostDto en una entidad Post para su procesamiento o persistencia. */
@Component
public class PostMapper implements Function<PostDto, Post> {

    @Override
    public Post apply(PostDto postDto) {
        return Post.builder()
            .title(postDto.getTitle())
            .author(postDto.getAuthor())
            .content(postDto.getContent())
            .genre(postDto.getGenre())
            .imageUrl(postDto.getImageUrl())
            .material(postDto.getMaterial())
            .durability(postDto.getDurability())
            .enchantment(postDto.getEnchantment())
            .damage(postDto.getDamage())
            .biome(postDto.getBiome())
            .foodPoints(postDto.getFoodPoints())
            .effect(postDto.getEffect())
            .build();
    }
}
