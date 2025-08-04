package com.dtdk.service;

import java.util.List;

import com.dtdk.exception.PostException;
import com.dtdk.exception.UserException;
import com.dtdk.model.Post;
import com.dtdk.model.User;
import com.dtdk.request.PostReplyReques;

public interface PostService {
	
	public Post createPost(Post req, User user)throws UserException;
	public List<Post> findAllPost();
	public Post retwit(Long postId, User user)throws UserException,PostException;
	public Post findById(Long postId)throws PostException;
	
	public void deletePostById(Long postId, Long userId)throws PostException,UserException;
	
	public Post removeFromRetwit(Long postId, User user)throws PostException, UserException;
	
	public Post createdReply(PostReplyReques req, User user)throws PostException;
	
	public List<Post> getUserPost(User user);
	
	public List<Post>findByLikesContainsUser(User user);
}
