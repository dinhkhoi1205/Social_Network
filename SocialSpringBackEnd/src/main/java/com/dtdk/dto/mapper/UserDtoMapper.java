package com.dtdk.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.dtdk.dto.UserDto;
import com.dtdk.model.User;

public class UserDtoMapper {
	
	public static UserDto toUserDto(User user) {
		UserDto userDto = new UserDto();
		userDto.setId(user.getId());
		userDto.setEmail(user.getEmail());
		userDto.setFullName(user.getFullName());
		userDto.setImage(user.getImage());
		userDto.setBackgroundImage(user.getBackgroundImage());
		userDto.setBio(user.getBio());
		userDto.setBirthDate(user.getBirtDate());
		userDto.setStudentId(user.getStudentId());
		userDto.setMobile(user.getMobile());
		userDto.setFollowers(toUserDtos(user.getFollowers()));
		userDto.setFollowing(toUserDtos(user.getFollowings()));
		
		return userDto;
	}

	public static List<UserDto> toUserDtos(List<User> followers) {
		List<UserDto> userDtos = new ArrayList<>();
		
		for(User user:followers) {
			UserDto userDto = new UserDto();
			userDto.setId(user.getId());
			userDto.setEmail(user.getEmail());
			userDto.setFullName(user.getFullName());
			userDto.setImage(user.getImage());
			userDtos.add(userDto);
		}
		return userDtos;
	}
	
}
