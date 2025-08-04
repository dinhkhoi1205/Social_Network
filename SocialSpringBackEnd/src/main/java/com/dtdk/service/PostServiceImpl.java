package com.dtdk.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dtdk.exception.PostException;
import com.dtdk.exception.UserException;
import com.dtdk.model.Post;
import com.dtdk.model.User;
import com.dtdk.repository.PostRepository;
import com.dtdk.request.PostReplyReques;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostRepository postRepository;

	@Override
	public Post createPost(Post req, User user) throws UserException {
		Post post = new Post();
		post.setContent(req.getContent());
		post.setCreatedAt(LocalDateTime.now());
		post.setImage(req.getImage());
		post.setUser(user);
		post.setReply(false);
		post.setTwit(true);
		post.setVideo(req.getVideo());
		return postRepository.save(post);
	}

	@Override
	public List<Post> findAllPost() {
		return postRepository.findByIsReplyFalseOrderByCreatedAtDesc();
	}

	@Override
	public Post retwit(Long postId, User user) throws UserException, PostException {
		Post post = findById(postId);
		if (post.getRetweetedByUser().contains(user)) {
			post.getRetweetedByUser().remove(user);
		} else {
			post.getRetweetedByUser().add(user);
		}
		return postRepository.save(post);
	}

	@Override
	public Post findById(Long postId) throws PostException {
		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new PostException("Post not found with id" + postId));
		return post;
	}

	@Override
	public void deletePostById(Long postId, Long userId) throws PostException, UserException {
		
		Post post=findById(postId);
		
		if(!userId.equals(post.getUser().getId())) {
			throw new UserException("You can't delete another user's post");
		}
		
		postRepository.deleteById(post.getId());
	}

	@Override
	public Post removeFromRetwit(Long postId, User user) throws PostException, UserException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Post createdReply(PostReplyReques req, User user) throws PostException {
		Post replyFor=findById(req.getPostId());
		
		Post post = new Post();
		post.setContent(req.getContent());
		post.setCreatedAt(LocalDateTime.now());
		post.setImage(req.getImage());
		post.setUser(user);
		post.setReply(true);
		post.setTwit(false);
		post.setReplyFor(replyFor);
		
		Post savedReply =postRepository.save(post);
		
		post.getReplies().add(savedReply);
		postRepository.save(replyFor);
		return replyFor;
	}

	@Override
	public List<Post> getUserPost(User user) {

		return postRepository.findByRetweetedByUserContainingOrUser_IdAndIsReplyFalseOrderByCreatedAtDesc(user, user.getId());
	}

	@Override
	public List<Post> findByLikesContainsUser(User user) {
	
		return postRepository.findByLikesUser_id(user.getId());
	}

}
