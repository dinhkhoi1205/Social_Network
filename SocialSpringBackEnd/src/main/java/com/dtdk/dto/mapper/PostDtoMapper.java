package com.dtdk.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.dtdk.dto.PostDto;
import com.dtdk.dto.UserDto;
import com.dtdk.model.Post;
import com.dtdk.model.User;
import com.dtdk.util.PostUtil;

public class PostDtoMapper {
	public static PostDto toPostDto(Post post, User reqUser) {
		UserDto user = UserDtoMapper.toUserDto(post.getUser());

		boolean isLiked = PostUtil.isLikedByReqUser(reqUser, post);
		boolean isRetwited = PostUtil.isRetweedByReqUser(reqUser, post);

		List<Long> retwitUserId = new ArrayList<>();

		for (User user1 : post.getRetweetedByUser()) {
			retwitUserId.add(user1.getId());
		}

		PostDto postDto = new PostDto();
		postDto.setId(post.getId());
		postDto.setContent(post.getContent());
		postDto.setCreatedAt(post.getCreatedAt());
		postDto.setImage(post.getImage());
		postDto.setTotalLikes(post.getLikes().size());
		postDto.setTotalReplies(post.getReplies().size());
		postDto.setTotalRetweets(post.getRetweetedByUser().size());
		postDto.setUser(user);
		postDto.setLiked(isLiked);
		postDto.setRetwit(isRetwited);
		postDto.setRetwitUsersId(retwitUserId);
		postDto.setReplyPosts(toPostDtos(post.getReplies(), reqUser));
		postDto.setVideo(post.getVideo());

		return postDto;
	}

	public static List<PostDto> toPostDtos(List<Post> posts, User reqUser) {
		List<PostDto> postDtos = new ArrayList<>();

		for (Post post : posts) {
			PostDto postDto = toReplyPostDto(post, reqUser);
			postDtos.add(postDto);
		}
		return postDtos;
	}

	private static PostDto toReplyPostDto(Post post, User reqUser) {
		UserDto user = UserDtoMapper.toUserDto(post.getUser());

		boolean isLiked = PostUtil.isLikedByReqUser(reqUser, post);
		boolean isRetwited = PostUtil.isRetweedByReqUser(reqUser, post);

		List<Long> retwitUserId = new ArrayList<>();

		for (User user1 : post.getRetweetedByUser()) {
			retwitUserId.add(user1.getId());
		}

		PostDto postDto = new PostDto();
		postDto.setId(post.getId());
		postDto.setContent(post.getContent());
		postDto.setCreatedAt(post.getCreatedAt());
		postDto.setImage(post.getImage());
		postDto.setTotalLikes(post.getLikes().size());
		postDto.setTotalReplies(post.getReplies().size());
		postDto.setTotalRetweets(post.getRetweetedByUser().size());
		postDto.setUser(user);
		postDto.setLiked(isLiked);
		postDto.setRetwit(isRetwited);
		postDto.setRetwitUsersId(retwitUserId);
		postDto.setVideo(post.getVideo());

		return postDto;
	}
}
