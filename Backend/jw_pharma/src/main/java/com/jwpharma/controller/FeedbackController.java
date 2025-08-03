package com.jwpharma.controller;

import com.jwpharma.entity.Feedback;
import com.jwpharma.security.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FeedbackController {

	@Autowired
	private FeedbackService feedbackService;

	@GetMapping
	public ResponseEntity<List<Feedback>> getAllFeedback() {
		List<Feedback> feedbackList = feedbackService.getAllFeedback();
		return ResponseEntity.ok(feedbackList);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
		try {
			Feedback feedback = feedbackService.getFeedbackById(id);
			return ResponseEntity.ok(feedback);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@PostMapping
	public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
		Feedback savedFeedback = feedbackService.saveFeedback(feedback);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedFeedback);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteFeedback(@PathVariable Long id) {
		try {
			feedbackService.deleteFeedback(id);
			return ResponseEntity.noContent().build();
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
}
