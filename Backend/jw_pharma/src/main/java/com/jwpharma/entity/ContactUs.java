package com.jwpharma.entity;

import jakarta.persistence.*;

@Entity
public class ContactUs {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String fullName;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(length = 1000)
	private String message;

	public ContactUs() {
		// Default constructor
	}

	public ContactUs(Long id, String fullName, String email, String message) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.email = email;
		this.message = message;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "ContactUs [id=" + id + ", fullName=" + fullName + ", email=" + email + ", message=" + message + "]";
	}
}