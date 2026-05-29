package com.davinchicoder.springgraphql.controller;

import com.davinchicoder.springgraphql.dto.PostDto;
import com.davinchicoder.springgraphql.entity.Post;
import com.davinchicoder.springgraphql.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@Controller
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @QueryMapping
    public List<Post> getPostsByGenre(@Argument String genre) {
        return postService.getPostsByGenre(genre);
    }

    /** Obtiene publicaciones recientes con paginación (count, offset). */
    @QueryMapping
    public List<Post> getRecentPosts(@Argument int count, @Argument int offset) {
        return postService.getRecentPosts(count, offset);
    }

    /** Obtiene una publicación por su ID o lanza PostNotFound. */
    @QueryMapping
    public Post getPostById(@Argument Long id) {
        return postService.getPostById(id);
    }

    /** Obtiene todas las publicaciones. */
    @QueryMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    /** Elimina una publicación por ID o lanza PostNotFound. */
    @MutationMapping
    public Post deletePostById(@Argument Long id) {
        return postService.deletePostById(id);
    }

    /** Guarda una nueva publicación a partir de PostDto. */
    @MutationMapping
    public Post savePost(@Argument PostDto postDto) {
        return postService.savePost(postDto);
    }
}
