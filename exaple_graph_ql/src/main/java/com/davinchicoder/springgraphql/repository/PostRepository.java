package com.davinchicoder.springgraphql.repository;

import com.davinchicoder.springgraphql.entity.Post;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/** Repositorio en memoria que simula operaciones CRUD sobre Post sin usar base de datos. */
@Repository
public class PostRepository {

    private final List<Post> POSTS = new ArrayList<>(

        List.of(

                /*
                =================================================
                BLOCKS
                =================================================
                */

                Post.builder()
                        .id(1L)
                        .title("Diamond Block")
                        .genre("BLOCK")

                        // BLOCK FIELDS
                        .material("Diamond")
                        .durability(50)

                        .imageUrl("https://minecraft.wiki/images/Block_of_Diamond_JE5_BE3.png")

                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Post.builder()
                        .id(2L)
                        .title("Obsidian")
                        .genre("BLOCK")

                        // BLOCK FIELDS
                        .material("Volcanic Glass")
                        .durability(1200)

                        .imageUrl("https://minecraft.wiki/images/Obsidian_JE3_BE2.png")

                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),



                /*
                =================================================
                WEAPONS
                =================================================
                */

                Post.builder()
                        .id(3L)
                        .title("Diamond Sword")
                        .genre("WEAPON")

                        // WEAPON FIELDS
                        .material("Diamond")
                        .damage(7)
                        .enchantment("Sharpness IV")

                        .imageUrl("https://minecraft.wiki/images/Diamond_Sword_JE2_BE2.png")

                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Post.builder()
                        .id(4L)
                        .title("Netherite Pickaxe")
                        .genre("WEAPON")

                        // WEAPON FIELDS
                        .material("Netherite")
                        .damage(6)
                        .enchantment("Efficiency V")

                        .imageUrl("https://minecraft.wiki/images/Netherite_Pickaxe_JE3_BE2.png")

                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),



                /*
                =================================================
                FOOD
                =================================================
                */

                Post.builder()
                        .id(5L)
                        .title("Golden Apple")
                        .genre("FOOD")

                        // FOOD FIELDS
                        .foodPoints(4)
                        .effect("Regeneration, Absorption")

                        .imageUrl("https://minecraft.wiki/images/Golden_Apple_JE2_BE2.png")

                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Post.builder()
                        .id(6L)
                        .title("Cooked Porkchop")
                        .genre("FOOD")

                        // FOOD FIELDS
                        .foodPoints(8)
                        .effect("None")

                        .imageUrl("https://minecraft.wiki/images/Cooked_Porkchop_JE4_BE3.png")

                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Post.builder()
                        .id(7L)
                        .title("Dirt")
                        .genre("BLOCK")
                        .material("Earth")
                        .durability(10)
                        .imageUrl("https://minecraft.wiki/images/Dirt_JE2_BE2.png")
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Post.builder()
                        .id(8L)
                        .title("Bow")
                        .genre("WEAPON")
                        .material("Wood & String")
                        .damage(9)
                        .enchantment("Power IV")
                        .imageUrl("https://minecraft.wiki/images/Bow_JE2_BE1.png")
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Post.builder()
                        .id(9L)
                        .title("Bread")
                        .genre("FOOD")
                        .foodPoints(5)
                        .effect("None")
                        .imageUrl("https://minecraft.wiki/images/Bread_JE3_BE3.png")
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Post.builder()
                        .id(10L)
                        .title("Oak Log")
                        .genre("BLOCK")
                        .material("Wood")
                        .durability(40)
                        .imageUrl("https://minecraft.wiki/images/Oak_Log_(inventory)_MCE.png")
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build()
        )
);

    
    public List<Post> getPostsByGenre(String genre) {

        return POSTS.stream()
                .filter(post ->
                        post.getGenre()
                                .equalsIgnoreCase(genre))
                .toList();
    }

    public List<Post> getRecentPosts(int count, int offset) {
        return POSTS.stream()
                .filter(post -> post.getDeletedAt() == null)
                .toList()
                .subList(offset, Math.min(offset + count, POSTS.size()));
    }

    public Post save(Post post) {
        post.setId(this.getNextId());
        post.setCreatedAt(LocalDateTime.now());

        POSTS.add(post);
        return post;
    }

    public Optional<Post> delete(Long id) {
        Optional<Post> postToDelete = POSTS.stream()
                .filter(post -> post.getId().equals(id))
                .findFirst();

        postToDelete.ifPresent(post -> post.setDeletedAt(LocalDateTime.now()));

        return postToDelete;
    }

    public Optional<Post> getById(Long id) {
        return POSTS.stream().filter(post -> post.getId().equals(id)).findFirst();
    }

    public List<Post> getAll() {
        return POSTS.stream().filter(post -> post.getDeletedAt() == null).toList();
    }

    private Long getNextId() {
        return POSTS.stream().mapToLong(Post::getId).max().orElse(0L) + 1L;
    }

}
