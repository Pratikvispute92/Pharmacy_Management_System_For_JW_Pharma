package com.jwpharma.security;

import com.jwpharma.entity.Medicine;
import com.jwpharma.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public Optional<Medicine> getMedicineById(Long id) {
        return medicineRepository.findById(id);
    }

    public Medicine saveMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public Medicine updateMedicine(Long id, String name, String category, String manufacturer, double price, MultipartFile image) throws IOException {
        return medicineRepository.findById(id).map(medicine -> {
            medicine.setName(name);
            medicine.setCategory(category);
            medicine.setManufacturer(manufacturer);
            medicine.setPrice(price);
            
            try {
                if (image != null && !image.isEmpty()) {
                    medicine.setImage(image.getBytes());
                }
            } catch (IOException e) {
                throw new RuntimeException("Error processing image", e);
            }

            return medicineRepository.save(medicine);
        }).orElseThrow(() -> new RuntimeException("Medicine not found"));
    }


    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }

	public long countMedicines() {
		return medicineRepository.count();
	}
}
