package com.jwpharma.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwpharma.entity.Deliveries;
import com.jwpharma.repository.DeliveriesRepository;

@Service
public class DeliveriesService {

	@Autowired
	private DeliveriesRepository deliveryRepository;

	public Deliveries createDelivery(Deliveries delivery) {
		return deliveryRepository.save(delivery);
	}

	public long countDeliveries() {
		
		return deliveryRepository.count();
	}
}
