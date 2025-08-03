package com.jwpharma.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.jwpharma.entity.Delivery;
import com.jwpharma.repository.DeliveryRepository;

import java.util.List;

@Service
public class DeliveryService {

	@Autowired
	private DeliveryRepository deliveryRepository;

	public List<Delivery> getAllDeliveries() {
		return deliveryRepository.findAll();
	}

	public Delivery getDeliveryById(Long id) {
		return deliveryRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Delivery record not found with ID: " + id));
	}

	public Delivery saveDelivery(Delivery delivery) {
		return deliveryRepository.save(delivery);
	}

	@Transactional
	public void deleteDelivery(Long id) {
		if (!deliveryRepository.existsById(id)) {
			throw new RuntimeException("Cannot delete. Delivery record not found with ID: " + id);
		}
		deliveryRepository.deleteById(id);
	}
}
