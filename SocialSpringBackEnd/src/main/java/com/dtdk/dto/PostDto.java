package com.dtdk.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class PostDto {

	private Long id;
	
	private String content;
	 
	private String image;
	
	private String video;
	
	private UserDto user;
	
	private LocalDateTime createdAt;
	
	private int totalLikes;
	
	private int totalReplies;
	
	private int totalRetweets;
	
	private boolean isLiked;
	
	private boolean isRetwit;
	
	private List<Long>retwitUsersId;
	private List<PostDto> replyPosts;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getVideo() {
		return video;
	}
	public void setVideo(String video) {
		this.video = video;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public UserDto getUser() {
		return user;
	}
	public void setUser(UserDto user) {
		this.user = user;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public int getTotalLikes() {
		return totalLikes;
	}
	public void setTotalLikes(int totalLikes) {
		this.totalLikes = totalLikes;
	}
	public int getTotalReplies() {
		return totalReplies;
	}
	public void setTotalReplies(int totalReplies) {
		this.totalReplies = totalReplies;
	}
	public int getTotalRetweets() {
		return totalRetweets;
	}
	public void setTotalRetweets(int totalRetweets) {
		this.totalRetweets = totalRetweets;
	}
	public boolean isLiked() {
		return isLiked;
	}
	public void setLiked(boolean isLiked) {
		this.isLiked = isLiked;
	}
	public boolean isRetwit() {
		return isRetwit;
	}
	public void setRetwit(boolean isRetwit) {
		this.isRetwit = isRetwit;
	}
	public List<Long> getRetwitUsersId() {
		return retwitUsersId;
	}
	public void setRetwitUsersId(List<Long> retwitUsersId) {
		this.retwitUsersId = retwitUsersId;
	}
	public List<PostDto> getReplyPosts() {
		return replyPosts;
	}
	public void setReplyPosts(List<PostDto> replyPosts) {
		this.replyPosts = replyPosts;
	}
}
