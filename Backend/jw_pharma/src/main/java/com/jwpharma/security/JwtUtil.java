package com.jwpharma.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

	// Secure 256-bit key
	private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	// Generate Token
	public String generateToken(String email) {
		return Jwts.builder().setSubject(email).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day validity
				.signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
	}

	// Extract Username from Token
	public String extractUsername(String token) {
		return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody().getSubject();
	}

	// Validate Token
	public boolean validateToken(String token) {
		if (token == null || token.trim().isEmpty()) {
			System.out.println("Invalid token: Token is null or empty");
			return false;
		}

		try {
			Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
			return true;
		} catch (ExpiredJwtException e) {
			System.out.println("Token expired: " + e.getMessage());
		} catch (UnsupportedJwtException e) {
			System.out.println("Unsupported token: " + e.getMessage());
		} catch (MalformedJwtException e) {
			System.out.println("Malformed token: " + e.getMessage());
		} catch (SignatureException e) {
			System.out.println("Invalid signature: " + e.getMessage());
		} catch (IllegalArgumentException e) {
			System.out.println("Illegal argument token: " + e.getMessage());
		}
		return false;
	}

}
