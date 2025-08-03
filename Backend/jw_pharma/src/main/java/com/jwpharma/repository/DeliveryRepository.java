package com.jwpharma.repository;

import com.jwpharma.entity.Delivery;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
	List<Delivery> findByEmail(String email);

	List<Delivery> findByPhoneNo(String phoneNo);

}
