package com.jwpharma.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jwpharma.entity.DeliveryPerson;


public interface DeliveryPerRepository extends JpaRepository<DeliveryPerson, Long> {

}
