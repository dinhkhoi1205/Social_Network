package com.dtdk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dtdk.dto.LikeDto;
import com.dtdk.dto.mapper.LikeDtoMapper;
import com.dtdk.exception.PostException;
import com.dtdk.exception.UserException;
import com.dtdk.model.Like;
import com.dtdk.model.User;
import com.dtdk.service.LikeService;
import com.dtdk.service.UserService;

@RestController
@RequestMapping("/api")
public class LikeController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private LikeService likeService;
	
	private String extractJwt(String authHeader) {
		return authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
	}
	
	@PostMapping("/posts/{postId}/likes")
	public ResponseEntity<LikeDto> likePost(@PathVariable Long postId,
			@RequestHeader("Authorization")String jwt)throws UserException, PostException{
		
		User user = userService.findUserProfileByJwt(extractJwt(jwt));
		Like like = likeService.likePost(postId, user);
		
		LikeDto likeDto=LikeDtoMapper.toLikeDto(like, user);
		
		
		return new ResponseEntity<LikeDto>(likeDto,HttpStatus.CREATED);
		
	}
	
	@GetMapping("/posts/{postId}/likes")
	public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable Long postId,
	        @RequestHeader("Authorization") String jwt) throws UserException, PostException {

	    User user = userService.findUserProfileByJwt(extractJwt(jwt));
	    List<Like> likes = likeService.getAllLikes(postId);
	    List<LikeDto> likeDtos = LikeDtoMapper.toLikeDtos(likes, user);

	    return new ResponseEntity<>(likeDtos, HttpStatus.OK);
	}
	
}
