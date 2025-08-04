package com.dtdk.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // hoặc AUTO
    private Long id;

    @ManyToOne
    private User user; // Người đăng bài

    private String content;
    private String image;
    private String video;

    private LocalDateTime createdAt = LocalDateTime.now();

    private boolean isReply;
    private boolean isTwit;
    
    public Post() {
        this.likes = new ArrayList<>();
        this.replies = new ArrayList<>();
        this.retweetedByUser = new ArrayList<>();
    }
    
    public Post(User user, String content, boolean isReply, boolean isTwit) {
        this.user = user;
        this.setContent(content);
        this.setReply(isReply);
        this.setTwit(isTwit);
        this.setCreatedAt(LocalDateTime.now());
    }
    
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

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getVideo() {
		return video;
	}

	public void setVideo(String video) {
		this.video = video;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public boolean isReply() {
		return isReply;
	}

	public void setReply(boolean isReply) {
		this.isReply = isReply;
	}

	public boolean isTwit() {
		return isTwit;
	}

	public void setTwit(boolean isTwit) {
		this.isTwit = isTwit;
	}
	
	public User getUser() {
	    return user;
	}

	public void setUser(User user) {
	    this.user = user;
	}
	
	public List<User> getRetweetedByUser() {
	    return retweetedByUser;
	}

	public void setRetweetedByUser(List<User> retweetedByUser) {
	    this.retweetedByUser = retweetedByUser;
	}
	
	public Post getReplyFor() {
	    return replyFor;
	}

	public void setReplyFor(Post replyFor) {
	    this.replyFor = replyFor;
	}
	
	public List<Post> getReplies() {
	    return replies;
	}

	public void setReplies(List<Post> replies) {
	    this.replies = replies;
	}

	public List<Like> getLikes() {
	    return likes;
	}

	public void setLikes(List<Like> likes) {
	    this.likes = likes;
	}
	
	// Like
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    // Các bình luận trả lời cho bài viết này
    @OneToMany(mappedBy = "replyFor", cascade = CascadeType.ALL)
    private List<Post> replies = new ArrayList<>();

    // Bài viết này đang trả lời cho bài viết nào (nếu có)
    @ManyToOne()
    private Post replyFor;

    // Người đã retweet bài viết này
    @ManyToMany
    private List<User> retweetedByUser = new ArrayList<>();
}
