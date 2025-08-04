package com.dtdk.dto;

import lombok.Data;

@Data
public class LikeDto {
	private Long id;
	private UserDto user;
	private PostDto post;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public UserDto getUser() {
		return user;
	}
	public void setUser(UserDto user) {
		this.user = user;
	}
	public PostDto getPost() {
		return post;
	}
	public void setPost(PostDto post) {
		this.post = post;
	}
}
