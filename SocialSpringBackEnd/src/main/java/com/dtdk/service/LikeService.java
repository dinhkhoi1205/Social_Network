package com.dtdk.service;

import java.util.List;

import com.dtdk.exception.PostException;
import com.dtdk.exception.UserException;
import com.dtdk.model.Like;
import com.dtdk.model.User;

public interface LikeService {
	
	public Like likePost(Long postId, User user)throws UserException, PostException;
	
	public List<Like> getAllLikes(Long postId)throws PostException;
}
