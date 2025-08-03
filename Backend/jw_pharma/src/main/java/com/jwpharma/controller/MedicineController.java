package com.jwpharma.controller;

import org.springframework.web.multipart.MultipartFile;

import com.jwpharma.entity.Medicine;
import com.jwpharma.security.MedicineService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @GetMapping
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable Long id) {
        Optional<Medicine> medicine = medicineService.getMedicineById(id);
        return medicine.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Medicine> addMedicine(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("manufacturer") String manufacturer,
            @RequestParam("price") double price,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        
        Medicine medicine = new Medicine();
        medicine.setName(name);
        medicine.setCategory(category);
        medicine.setManufacturer(manufacturer);
        medicine.setPrice(price);

        if (image != null && !image.isEmpty()) {
            medicine.setImage(image.getBytes()); // Save image as byte[]
        }

        return ResponseEntity.ok(medicineService.saveMedicine(medicine));
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Medicine> updateMedicine(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("manufacturer") String manufacturer,
            @RequestParam("price") double price,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        
        try {
            Medicine updatedMedicine = medicineService.updateMedicine(id, name, category, manufacturer, price, image);
            return ResponseEntity.ok(updatedMedicine);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMedicine(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getMedicineCount() {
        long count = medicineService.countMedicines();
        return ResponseEntity.ok(Map.of("count", count));
    }

}
