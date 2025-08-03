package com.jwpharma.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jwpharma.entity.DeliveryPerson;
import com.jwpharma.security.DeliveryPersonService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/delivery-persons")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DeliveryPersonController {

	@Autowired
	private DeliveryPersonService deliveryPersonService;

	@GetMapping("/{id}")
	public ResponseEntity<DeliveryPerson> getDeliveryPerson(@PathVariable Long id) {
		DeliveryPerson deliveryPerson = deliveryPersonService.getDeliveryPerson(id);
		if (deliveryPerson == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(deliveryPerson, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<DeliveryPerson> addDeliveryPerson(@RequestBody DeliveryPerson deliveryPerson) {
	    DeliveryPerson savedPerson = deliveryPersonService.createDeliveryPerson(deliveryPerson);
	    return new ResponseEntity<>(savedPerson, HttpStatus.CREATED);
	}


	@PutMapping("/{id}")
	public ResponseEntity<String> updateDeliveryPerson(@PathVariable Long id,
			@RequestBody DeliveryPerson deliveryPerson) {
		DeliveryPerson updatedDeliveryPerson = deliveryPersonService.updateDeliveryPerson(id, deliveryPerson);
		if (updatedDeliveryPerson == null) {
			return new ResponseEntity<>("Delivery person not found.", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>("Delivery person updated successfully with ID: " + updatedDeliveryPerson.getId(),
				HttpStatus.OK);
	}

	// GET ALL method
	@GetMapping
	public ResponseEntity<List<DeliveryPerson>> getAllDeliveryPersons() {
		List<DeliveryPerson> deliveryPersons = deliveryPersonService.getAllDeliveryPersons();
		if (deliveryPersons.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(deliveryPersons, HttpStatus.OK);
	}

	// DeliveryPersonController
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteDeliveryPerson(@PathVariable Long id) {
		boolean isDeleted = deliveryPersonService.deleteDeliveryPerson(id);
		if (isDeleted) {
			// Log message to the console for debugging
			System.out.println("Delivery person deleted successfully.");
			return new ResponseEntity<>("Delivery person deleted successfully.", HttpStatus.NO_CONTENT); // 204 -
																											// successful
																											// deletion
		} else {
			// Log message to the console for debugging
			System.out.println("Delivery person not found.");
			return new ResponseEntity<>("Delivery person not found.", HttpStatus.NOT_FOUND); // 404 - delivery person
																								// not found
		}
	}

	@GetMapping("/count")
	public ResponseEntity<Map<String, Long>> getDeliveryCount() {
	    long count = deliveryPersonService.countDeliveries();
	    return ResponseEntity.ok(Map.of("count", count));
	}
}
