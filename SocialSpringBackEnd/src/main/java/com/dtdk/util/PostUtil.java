package com.dtdk.util;

import com.dtdk.model.Like;
import com.dtdk.model.Post;
import com.dtdk.model.User;

public class PostUtil {
	public final static boolean isLikedByReqUser(User reqUser, Post post) {
		for(Like like: post.getLikes()) {
			if(like.getUser().getId().equals(reqUser.getId())) {
				return true;
			}
		}
		return false;
	}
	
	public final static boolean isRetweedByReqUser(User reqUser, Post post) {
		for(User user: post.getRetweetedByUser()) {
			if(user.getId().equals(reqUser.getId())) {
				return true;
			}
		}
		return false;
	}
}
