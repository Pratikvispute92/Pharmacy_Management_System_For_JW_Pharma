package com.jwpharma.entity;

import jakarta.persistence.*;

@Entity
public class Feedback {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@Column(nullable = false, unique = true)
	private String email;

	private int rating;

	private String reason;

	private String feedback;

	public Feedback() {
		// Default constructor
	}

	public Feedback(Long id, String name, String email, int rating, String reason, String feedback) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.rating = rating;
		this.reason = reason;
		this.feedback = feedback;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	@Override
	public String toString() {
		return "Feedback [id=" + id + ", name=" + name + ", email=" + email + ", rating=" + rating + ", reason="
				+ reason + ", feedback=" + feedback + "]";
	}
}
