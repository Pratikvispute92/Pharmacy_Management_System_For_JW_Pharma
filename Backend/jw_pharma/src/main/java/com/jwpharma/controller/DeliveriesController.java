package com.jwpharma.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jwpharma.entity.Deliveries;
import com.jwpharma.entity.DeliveryPerson;
import com.jwpharma.security.DeliveriesService;
import com.jwpharma.security.DeliveryPersonService;

@RestController
@RequestMapping("/api/delivery-assignments")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DeliveriesController {

	@Autowired
	private DeliveryPersonService deliveryPersonService;

	@Autowired
	private DeliveriesService deliveryService;

	@PostMapping("/{deliveryPersonId}/assign")
	public ResponseEntity<Deliveries> assignDeliveryToPerson(@PathVariable Long deliveryPersonId,
			@RequestBody Deliveries delivery) {

		DeliveryPerson deliveryPerson = deliveryPersonService.getDeliveryPerson(deliveryPersonId);
		if (deliveryPerson == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		delivery.setDeliveryPerson(deliveryPerson);
		Deliveries assignedDelivery = deliveryService.createDelivery(delivery);
		return new ResponseEntity<>(assignedDelivery, HttpStatus.CREATED);
	}
	
	

}
