package com.jwpharma.repository;

import com.jwpharma.entity.Feedback;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
	List<Feedback> findByEmail(String emailId);

	List<Feedback> findByRating(int rating);

}
