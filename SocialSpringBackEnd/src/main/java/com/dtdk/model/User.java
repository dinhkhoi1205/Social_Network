package com.dtdk.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String fullName;
	private String email;
	private String studentId;
	private String birtDate;
	private String password;
	private String mobile;
	private String image;
	private String backgroundImage;
	private String bio;
	private boolean req_user;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Post> post = new ArrayList<>();
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Like> likes = new ArrayList<>();
	
	@Embedded
	private Verification verification;
	
	@JsonIgnore
	@ManyToMany
	private List<User>followers=new ArrayList<>();
	
	@JsonIgnore
	@ManyToMany
	private List<User>followings=new ArrayList<>();

	public User() {
	    this.post = new ArrayList<>();
	    this.likes = new ArrayList<>();
	    this.followers = new ArrayList<>();
	    this.followings = new ArrayList<>();
	}
	public User(String email, String fullName, String password, String birtDate) {
	    this.email = email;
	    this.fullName = fullName;
	    this.password = password;
	    this.birtDate = birtDate;

	    this.post = new ArrayList<>();
	    this.likes = new ArrayList<>();
	    this.followers = new ArrayList<>();
	    this.followings = new ArrayList<>();
	}
	
	
	public Long getId() {
	    return id;
	}

	public void setId(Long id) {
	    this.id = id;
	}
	
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getStudentId() {
		return studentId;
	}

	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}

	public String getBirtDate() {
		return birtDate;
	}

	public void setBirtDate(String birtDate) {
		this.birtDate = birtDate;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getBackgroundImage() {
		return backgroundImage;
	}

	public void setBackgroundImage(String backgroundImage) {
		this.backgroundImage = backgroundImage;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public boolean isReq_user() {
		return req_user;
	}

	public void setReq_user(boolean req_user) {
		this.req_user = req_user;
	}

	public void setVerification(Verification verification) {
		this.verification = verification;
		
	}

	public List<User> getFollowings() {
	    return followings;
	}

	public void setFollowings(List<User> followings) {
	    this.followings = followings;
	}
	
	public List<User> getFollowers() {
	    return followers;
	}

	public void setFollowers(List<User> followers) {
	    this.followers = followers;
	}


}
