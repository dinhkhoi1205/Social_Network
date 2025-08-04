package com.dtdk.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dtdk.exception.PostException;
import com.dtdk.exception.UserException;
import com.dtdk.model.Like;
import com.dtdk.model.Post;
import com.dtdk.model.User;
import com.dtdk.repository.LikeRepository;
import com.dtdk.repository.PostRepository;

@Service
public class LikeServiceImpl implements LikeService{

	@Autowired
	private LikeRepository likeRepository;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private PostRepository postRepository;
	
	@Override
	public Like likePost(Long postId, User user) throws UserException, PostException {
		Like isLikeExist = likeRepository.isLikeExist(user.getId(), postId);
		
		if(isLikeExist!=null) {
			likeRepository.deleteById(isLikeExist.getId());
			return isLikeExist;
		}
		
		Post post = postService.findById(postId);
		
		Like like = new Like();
		like.setPost(post);
		like.setUser(user);
		
		Like savedLike = likeRepository.save(like);
		
		post.getLikes().add(savedLike);
		postRepository.save(post);
		
		return savedLike;
	}

	@Override
	public List<Like> getAllLikes(Long postId) throws PostException {
		Post post = postService.findById(postId);
		
		List<Like> likes = likeRepository.findByPostId(postId);
		return likes;
	}

}
