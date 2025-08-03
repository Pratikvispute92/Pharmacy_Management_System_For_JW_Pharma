package com.jwpharma.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Deliveries {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String description;
	private String status;

	@ManyToOne
	@JoinColumn(name = "delivery_person_id")
	private DeliveryPerson deliveryPerson;

	public Deliveries() {
		// TODO Auto-generated constructor stub
	}

	public Deliveries(Long id, String description, String status, DeliveryPerson deliveryPerson) {
		super();
		this.id = id;
		this.description = description;
		this.status = status;
		this.deliveryPerson = deliveryPerson;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public DeliveryPerson getDeliveryPerson() {
		return deliveryPerson;
	}

	public void setDeliveryPerson(DeliveryPerson deliveryPerson) {
		this.deliveryPerson = deliveryPerson;
	}

}
