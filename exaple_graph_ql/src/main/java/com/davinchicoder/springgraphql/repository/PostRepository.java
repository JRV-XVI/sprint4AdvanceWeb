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
                ACTION MOVIES
                =================================================
                */

                Post.builder()
                        .id(1L)
                        .title("John Wick")
                        .genre("ACTION")

                        // ACTION FIELDS
                        .weapon("Pistol")
                        .explosions(45)

                        .imageUrl("https://example.com/johnwick.jpg")

                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Post.builder()
                        .id(2L)
                        .title("Mad Max")
                        .genre("ACTION")

                        // ACTION FIELDS
                        .weapon("Shotgun")
                        .explosions(120)

                        .imageUrl("https://example.com/madmax.jpg")

                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),



                /*
                =================================================
                COMEDY MOVIES
                =================================================
                */

                Post.builder()
                        .id(3L)
                        .title("The Mask")
                        .genre("COMEDY")

                        // COMEDY FIELDS
                        .typeOfComedy("Slapstick")
                        .memeCount(80)

                        .imageUrl("https://example.com/mask.jpg")

                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Post.builder()
                        .id(4L)
                        .title("Superbad")
                        .genre("COMEDY")

                        // COMEDY FIELDS
                        .typeOfComedy("Teen Comedy")
                        .memeCount(95)

                        .imageUrl("https://example.com/superbad.jpg")

                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),



                /*
                =================================================
                HORROR MOVIES
                =================================================
                */

                Post.builder()
                        .id(5L)
                        .title("The Conjuring")
                        .genre("HORROR")

                        // HORROR FIELDS
                        .monster("Demon")
                        .goreLevel(70)

                        .imageUrl("https://example.com/conjuring.jpg")

                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build(),

                Post.builder()
                        .id(6L)
                        .title("It")
                        .genre("HORROR")

                        // HORROR FIELDS
                        .monster("Clown")
                        .goreLevel(90)

                        .imageUrl("https://example.com/it.jpg")

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
