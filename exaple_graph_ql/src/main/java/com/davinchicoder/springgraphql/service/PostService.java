package com.davinchicoder.springgraphql.service;

import com.davinchicoder.springgraphql.dto.PostDto;
import com.davinchicoder.springgraphql.entity.Post;
import com.davinchicoder.springgraphql.exception.PostNotFound;
import com.davinchicoder.springgraphql.mapper.PostMapper;
import com.davinchicoder.springgraphql.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;

    public List<Post> getPostsByGenre(String genre) {
        return postRepository.getPostsByGenre(genre);
    }

    public List<Post> getRecentPosts(int count, int offset) {
        return postRepository.getRecentPosts(count, offset);
    }

    public Post getPostById(Long id) {
        return postRepository.getById(id).orElseThrow(PostNotFound::new);
    }

    public List<Post> getAllPosts() {
        return postRepository.getAll();
    }

    public Post deletePostById(Long id) {
        return postRepository.delete(id).orElseThrow(PostNotFound::new);
    }

    public Post savePost(PostDto postDto) {
        Post post = postMapper.apply(postDto);
        return postRepository.save(post);
    }
}
