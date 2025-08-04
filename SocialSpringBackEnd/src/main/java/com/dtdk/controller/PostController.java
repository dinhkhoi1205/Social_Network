package com.dtdk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dtdk.dto.PostDto;
import com.dtdk.dto.mapper.PostDtoMapper;
import com.dtdk.exception.PostException;
import com.dtdk.exception.UserException;
import com.dtdk.model.Post;
import com.dtdk.model.User;
import com.dtdk.request.PostReplyReques;
import com.dtdk.response.ApiResponse;
import com.dtdk.service.PostService;
import com.dtdk.service.UserService;

@RestController
@RequestMapping("/api/posts")
public class PostController {

	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;

	private String extractJwt(String authHeader) {
		return authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
	}
	
	@PostMapping("/create")
	public ResponseEntity<PostDto> createPost(@RequestBody Post req,
			@RequestHeader("Authorization")String jwt)throws UserException, PostException{
		User user=userService.findUserProfileByJwt(extractJwt(jwt));
		Post post = postService.createPost(req, user);
		PostDto postDto=PostDtoMapper.toPostDto(post, user);
		return new ResponseEntity<>(postDto,HttpStatus.CREATED);
	}
	
	@PostMapping("/reply")
	public ResponseEntity<PostDto> replyPost(@RequestBody PostReplyReques req,
			@RequestHeader("Authorization")String jwt)throws UserException, PostException{
		User user=userService.findUserProfileByJwt(extractJwt(jwt));
		Post post = postService.createdReply(req, user);
		PostDto postDto=PostDtoMapper.toPostDto(post, user);
		return new ResponseEntity<>(postDto,HttpStatus.CREATED);
	}
	
	@PutMapping("/{postId}/repost")
	public ResponseEntity<PostDto> rePost(@PathVariable Long postId,
			@RequestHeader("Authorization")String jwt)throws UserException, PostException{
		User user=userService.findUserProfileByJwt(extractJwt(jwt));
		Post post = postService.retwit(postId, user);
		PostDto postDto=PostDtoMapper.toPostDto(post, user);
		return new ResponseEntity<>(postDto,HttpStatus.OK);
	}
	
	@GetMapping("/{postId}")
	public ResponseEntity<PostDto> findPostById(@PathVariable Long postId,
			@RequestHeader("Authorization")String jwt)throws UserException, PostException{
		User user=userService.findUserProfileByJwt(extractJwt(jwt));
		Post post = postService.findById(postId);
		PostDto postDto=PostDtoMapper.toPostDto(post, user);
		return new ResponseEntity<>(postDto,HttpStatus.OK);
	}
	
	@DeleteMapping("/{postId}")
	public ResponseEntity<ApiResponse> deletePost(@PathVariable Long postId,
			@RequestHeader("Authorization")String jwt)throws UserException, PostException{
		User user=userService.findUserProfileByJwt(extractJwt(jwt));
		postService.deletePostById(postId, user.getId());
		ApiResponse res = new ApiResponse();
		res.setMessage("Post deleted success");
		res.setStatus(true);
		return new ResponseEntity<>(res,HttpStatus.OK);
	}
	
	@GetMapping("")
	public ResponseEntity<List<PostDto>> getAllPost(
	        @RequestHeader("Authorization") String authHeader) throws UserException, PostException {
	    String jwt = extractJwt(authHeader);
	    User user = userService.findUserProfileByJwt(jwt);
	    List<Post> posts = postService.findAllPost();
	    List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, user);
	    return new ResponseEntity<>(postDtos, HttpStatus.OK);
	}
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<PostDto>> getUserAllPosts(@PathVariable Long userId,
			@RequestHeader("Authorization")String jwt)throws UserException, PostException{
		User reqUser = userService.findUserProfileByJwt(extractJwt(jwt));
		User profileUser = userService.findUserById(userId);
		List<Post> posts = postService.getUserPost(profileUser);
		List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, reqUser);
		return new ResponseEntity<>(postDtos,HttpStatus.OK);
	}

	@GetMapping("/user/{userId}/likes")
	public ResponseEntity<List<PostDto>> findPostByLikesContainsUser(@PathVariable Long userId,
			@RequestHeader("Authorization")String jwt)throws UserException, PostException{
	    User likedUser = userService.findUserById(userId); 
	    User reqUser = userService.findUserProfileByJwt(extractJwt(jwt)); 
	    List<Post> posts = postService.findByLikesContainsUser(likedUser);
	    List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, reqUser);
	    return new ResponseEntity<>(postDtos, HttpStatus.OK);
	}
}
