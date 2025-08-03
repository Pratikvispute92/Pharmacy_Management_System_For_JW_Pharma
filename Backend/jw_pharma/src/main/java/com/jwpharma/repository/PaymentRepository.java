package com.jwpharma.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.jwpharma.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
