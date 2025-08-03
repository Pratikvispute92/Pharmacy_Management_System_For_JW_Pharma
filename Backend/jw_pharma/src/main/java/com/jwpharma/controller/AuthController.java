package com.jwpharma.controller;

import com.jwpharma.entity.User;

import com.jwpharma.repository.UserRepository;
import com.jwpharma.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

	private Map<String, String> otpStorage = new HashMap<>(); // ✅ In-memory OTP storage

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private JwtUtil jwtUtil;

	// ✅ Signup API
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
		if (existingUser.isPresent()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Email already registered!"));
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "User registered successfully!"));
	}

	// ✅ Login API
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User user) {
		User existingUser = userRepository.findByEmail(user.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found"));

		if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
			String token = jwtUtil.generateToken(existingUser.getEmail());
			Map<String, Object> response = new HashMap<>();
			response.put("message", "Login successful!");
			response.put("token", token);
			response.put("userId", existingUser.getId()); // ✅ Added userId
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials!"));
		}
	}

	// ✅ Send OTP API
	@PostMapping("/send-otp")
	public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		System.out.println("Received OTP request for email: " + email); // Log email

		Optional<User> optionalUser = userRepository.findByEmail(email);
		if (optionalUser.isEmpty()) {
			System.out.println("User not found with email: " + email); // Log if user not found
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User with this email not found!"));
		}

		String otp = String.valueOf(new Random().nextInt(9000) + 1000);
		otpStorage.put(email, otp);
		System.out.println("Generated OTP: " + otp); // Log generated OTP

		// ✅ Send OTP via Email with Error Logging
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(email);
			message.setSubject("JW Pharma Shop - Password Reset OTP");
			message.setText("Your OTP for password reset is: " + otp);

			System.out.println("Attempting to send email..."); // Log before sending
			mailSender.send(message);
			System.out.println("OTP email sent successfully."); // Log after sending

		} catch (Exception e) {
			e.printStackTrace(); // Print the exact error stack trace
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "Failed to send OTP. Please try again later.", "details", e.getMessage()));
		}

		return ResponseEntity.ok(Map.of("message", "OTP sent successfully to your email!"));
	}

	// ✅ Reset Password API
	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String newPassword = request.get("newPassword");
		String otp = request.get("otp");

		Optional<User> optionalUser = userRepository.findByEmail(email);
		if (optionalUser.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User with this email not found!"));
		}

		String storedOtp = otpStorage.get(email);
		if (storedOtp == null || !storedOtp.equals(otp)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Invalid or expired OTP!"));
		}

		User user = optionalUser.get();
		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(user);
		otpStorage.remove(email); // ✅ Clear OTP after successful reset

		return ResponseEntity.ok(Map.of("message", "Password reset successfully!"));
	}

	// ✅ Create New User
	@PostMapping("/create")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Email already exists!"));
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User savedUser = userRepository.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
	}

	// ✅ Get All Users
	@GetMapping("/all")
	public ResponseEntity<List<User>> getAllUsers() {
		return ResponseEntity.ok(userRepository.findAll());
	}

	// ✅ Get User by ID
	@GetMapping("/{userId}")
	public ResponseEntity<?> getUserById(@PathVariable Long userId) {
		return userRepository.findById(userId).map(user -> {
			Map<String, Object> userData = new HashMap<>();
			userData.put("id", user.getId());
			userData.put("name", user.getName());
			userData.put("email", user.getEmail());
			userData.put("profileImageURL", user.getProfileImageUrl());

			return ResponseEntity.ok(userData);
		}).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found!")));
	}

	// ✅ Update User
	@PutMapping("/update/{userId}")
	public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody User updatedUser) {
		Optional<User> optionalUser = userRepository.findById(userId);
		if (optionalUser.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found!"));
		}

		User user = optionalUser.get();
		user.setName(updatedUser.getName());
		user.setEmail(updatedUser.getEmail());
		if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
			user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
		}
		userRepository.save(user);
		return ResponseEntity.ok(Map.of("message", "User updated successfully!", "user", user));
	}

	// ✅ Delete User
	@DeleteMapping("/delete/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
		if (!userRepository.existsById(userId)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found!"));
		}
		userRepository.deleteCartsByUserId(userId);
		userRepository.deleteById(userId);
		return ResponseEntity.ok(Map.of("message", "User deleted successfully!"));
	}

	// ✅ Upload Profile Image API
	@PostMapping("/uploadProfileImage/{userId}")
	public ResponseEntity<?> uploadProfileImage(@PathVariable Long userId, @RequestParam("image") MultipartFile file) {
		Optional<User> optionalUser = userRepository.findById(userId);
		if (optionalUser.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found!"));
		}

		try {
			User user = optionalUser.get();
			user.setProfileImage(file.getBytes()); // ✅ Store image as binary
			String imageUrl = "/api/users/getProfileImage/" + userId;
			user.setProfileImageUrl(imageUrl); // ✅ Generate URL to access image
			userRepository.save(user);

			return ResponseEntity.ok(Map.of("message", "Profile image uploaded successfully!", "imageUrl", imageUrl));
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "Error uploading file: " + e.getMessage()));
		}
	}

	// ✅ Fetch Profile Image (returns image data)
	@GetMapping("/getProfileImage/{userId}")
	public ResponseEntity<?> getProfileImage(@PathVariable Long userId) {
		Optional<User> user = userRepository.findById(userId);
		if (user.isPresent() && user.get().getProfileImage() != null) {
			return ResponseEntity.ok().header("Content-Type", "image/jpeg") // or image/png based on type
					.body(user.get().getProfileImage());
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Profile image not found!"));
		}
	}
}
