package com.jwpharma.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwpharma.entity.DeliveryPerson;
import com.jwpharma.repository.DeliveryPerRepository;

import java.util.List;

@Service
public class DeliveryPersonService {

	@Autowired
	private DeliveryPerRepository deliveryPersonRepository;

	public DeliveryPerson getDeliveryPerson(Long id) {
		return deliveryPersonRepository.findById(id).orElse(null);
	}

	public DeliveryPerson createDeliveryPerson(DeliveryPerson deliveryPerson) {
		return deliveryPersonRepository.save(deliveryPerson);
	}

	public DeliveryPerson updateDeliveryPerson(Long id, DeliveryPerson deliveryPerson) {
		if (!deliveryPersonRepository.existsById(id)) {
			return null; // not found
		}
		deliveryPerson.setId(id);
		return deliveryPersonRepository.save(deliveryPerson);
	}

	// New method to get all delivery persons
	public List<DeliveryPerson> getAllDeliveryPersons() {
		return deliveryPersonRepository.findAll();
	}

	// New method to delete a delivery person
	public boolean deleteDeliveryPerson(Long id) {
		if (deliveryPersonRepository.existsById(id)) {
			deliveryPersonRepository.deleteById(id);
			return true;
		}
		return false;
	}

	public long countDeliveries() {
		return deliveryPersonRepository.count();
	}
	
	
}
