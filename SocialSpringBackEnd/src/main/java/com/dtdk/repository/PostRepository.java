package com.dtdk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dtdk.model.Post;
import com.dtdk.model.User;

public interface PostRepository extends JpaRepository<Post, Long>{
	
    List<Post> findAllByIsReplyTrueOrderByCreatedAtDesc();
    
    List<Post> findByIsReplyFalseOrderByCreatedAtDesc();

    List<Post> findByRetweetedByUserContainingOrUser_IdAndIsReplyFalseOrderByCreatedAtDesc(User user, Long userId);

    @Query("SELECT t FROM Post t JOIN t.likes l WHERE l.user.id = :userId")
    List<Post> findByLikesUser_id(@Param("userId") Long userId);
	
}
