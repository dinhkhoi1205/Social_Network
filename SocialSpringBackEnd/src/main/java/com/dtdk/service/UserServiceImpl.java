package com.dtdk.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dtdk.config.JwtProvider;
import com.dtdk.exception.UserException;
import com.dtdk.model.User;
import com.dtdk.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtProvider jwtProvider;
	
	@Override
	public User findUserById(Long userId) throws UserException {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserException("User not found with id" + userId));
		
		return user;
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		String email = jwtProvider.getEmailFromToken(jwt);
		User user = userRepository.findByEmail(email);
		
		if(user==null) {
			throw new UserException("user not found with email" + email);
		}
		
		return user;
	}

	@Override
	public User updateUser(Long userId, User req) throws UserException {
		User user = findUserById(userId);
		
		if(req.getFullName()!=null) {
			user.setFullName(req.getFullName());
		}
		
		if(req.getImage()!=null) {
			user.setImage(req.getImage());
		}
		
		if(req.getBackgroundImage()!=null) {
			user.setBackgroundImage(req.getBackgroundImage());
		}
		
		if(req.getBirtDate()!=null) {
			user.setBirtDate(req.getBirtDate());
		}
		
		if(req.getBio()!=null) {
			user.setBio(req.getBio());
		}
		
		if(req.getMobile()!=null) {
			user.setMobile(req.getMobile());
		}
		
		if(req.getEmail()!=null) {
			user.setEmail(req.getEmail());
		}
		
		if(req.getStudentId()!=null) {
			user.setStudentId(req.getStudentId());
		}
		return userRepository.save(user);
	}

	@Override
	public User followUser(Long userId, User user) throws UserException {
		User followToUser=findUserById(userId);
		
		if(user.getId().equals(userId)) {
		    throw new UserException("Cannot follow yourself");
		}
		
		if(user.getFollowings().contains(followToUser) && followToUser.getFollowers().contains(user)) {
			user.getFollowings().remove(followToUser);
			followToUser.getFollowers().remove(user);
		}
		else {
			user.getFollowings().add(followToUser);
			followToUser.getFollowers().add(user);
		}
		
		userRepository.save(followToUser);
		userRepository.save(user);
		return followToUser;
	}

	@Override
	public List<User> searchUser(String query) {
		// TODO Auto-generated method stub
		return userRepository.searchUser(query);
	}

}
