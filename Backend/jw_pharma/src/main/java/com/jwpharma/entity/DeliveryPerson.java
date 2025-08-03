package com.jwpharma.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class DeliveryPerson {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String contact;
	private String email; // Added Email field
	private String vehicle; // Added Vehicle field

	@OneToMany(mappedBy = "deliveryPerson", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Deliveries> deliveries;

	public DeliveryPerson() {
		// TODO Auto-generated constructor stub
	}

	public DeliveryPerson(Long id, String name, String contact, String email, String vehicle,
			List<Deliveries> deliveries) {
		super();
		this.id = id;
		this.name = name;
		this.contact = contact;
		this.email = email;
		this.vehicle = vehicle;
		this.deliveries = deliveries;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getVehicle() {
		return vehicle;
	}

	public void setVehicle(String vehicle) {
		this.vehicle = vehicle;
	}

	public List<Deliveries> getDeliveries() {
		return deliveries;
	}

	public void setDeliveries(List<Deliveries> deliveries) {
		this.deliveries = deliveries;
	}

}
