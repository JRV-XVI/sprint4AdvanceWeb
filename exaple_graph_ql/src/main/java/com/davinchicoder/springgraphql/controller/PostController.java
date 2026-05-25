package com.davinchicoder.springgraphql.controller;

import com.davinchicoder.springgraphql.dto.PostDto;
import com.davinchicoder.springgraphql.entity.Post;
import com.davinchicoder.springgraphql.exception.PostNotFound;
import com.davinchicoder.springgraphql.mapper.PostMapper;
import com.davinchicoder.springgraphql.repository.PostRepository;
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

    /** Repositorio para acceder y manipular datos de publicaciones. */
    private final PostRepository postRepository;

    /** Mapper para convertir PostDto a entidad Post. */
    private final PostMapper postMapper;

    @QueryMapping
    public List<Post> getPostsByGenre(@Argument String genre) {

        return postRepository.getPostsByGenre(genre);
    }

    /** Obtiene publicaciones recientes con paginación (count, offset). */
    @QueryMapping
    public List<Post> getRecentPosts(@Argument int count, @Argument int offset) {
        return postRepository.getRecentPosts(count, offset);
    }

    /** Obtiene una publicación por su ID o lanza PostNotFound. */
    @QueryMapping
    public Post getPostById(@Argument Long id) {
        return postRepository.getById(id).orElseThrow(PostNotFound::new);
    }

    /** Obtiene todas las publicaciones. */
    @QueryMapping
    public List<Post> getAllPosts() {
        return postRepository.getAll();
    }

    /** Elimina una publicación por ID o lanza PostNotFound. */
    @MutationMapping
    public Post deletePostById(@Argument Long id) {

        return postRepository.delete(id).orElseThrow(PostNotFound::new);
    }

    /** Guarda una nueva publicación a partir de PostDto. */
    @MutationMapping
    public Post savePost(@Argument PostDto postDto) {
        Post post = postMapper.apply(postDto);
        return postRepository.save(post);
    }
}
