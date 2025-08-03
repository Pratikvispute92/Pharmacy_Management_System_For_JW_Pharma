package com.jwpharma.entity;

import jakarta.persistence.*;

@Entity
public class Medicine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String category;
	private String manufacturer;
	private Double price;

	@Lob
	@Column(columnDefinition = "LONGBLOB")
	private byte[] image;

	public Medicine() {
		// TODO Auto-generated constructor stub
	}

	public Medicine(Long id, String name, String category, String manufacturer, Double price, byte[] image) {
		super();
		this.id = id;
		this.name = name;
		this.category = category;
		this.manufacturer = manufacturer;
		this.price = price;
		this.image = image;
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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getManufacturer() {
		return manufacturer;
	}

	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

}
