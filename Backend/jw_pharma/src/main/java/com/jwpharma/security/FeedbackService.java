package com.jwpharma.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.jwpharma.entity.Feedback;
import com.jwpharma.repository.FeedbackRepository;

import java.util.List;

@Service
public class FeedbackService {

	@Autowired
	private FeedbackRepository feedbackRepository;

	public List<Feedback> getAllFeedback() {
		return feedbackRepository.findAll();
	}

	public Feedback getFeedbackById(Long id) {
		return feedbackRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Feedback not found with ID: " + id));
	}

	public List<Feedback> getFeedbackByEmail(String emailId) {
		return feedbackRepository.findByEmail(emailId);
	}

	public List<Feedback> getFeedbackByRating(int rating) {
		return feedbackRepository.findByRating(rating);
	}

	public Feedback saveFeedback(Feedback feedback) {
		return feedbackRepository.save(feedback);
	}

	@Transactional
	public void deleteFeedback(Long id) {
		if (!feedbackRepository.existsById(id)) {
			throw new RuntimeException("Cannot delete. Feedback not found with ID: " + id);
		}
		feedbackRepository.deleteById(id);
	}
}
