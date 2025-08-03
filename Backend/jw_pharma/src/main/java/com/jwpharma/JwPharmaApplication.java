package com.jwpharma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.jwpharma"})
public class JwPharmaApplication {

	public static void main(String[] args) {
		SpringApplication.run(JwPharmaApplication.class, args);
		System.out.println("Application Started...");
	}

}
