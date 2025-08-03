package com.jwpharma.controller;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jwpharma.security.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) {
        try {
            RazorpayClient razorpay = new RazorpayClient("rzp_test_r8uNONct0Exne8", "your_secret_key");

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", data.get("amount")); // Amount in paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "txn_12345");

            Order order = razorpay.orders.create(orderRequest);
            Map<String, Object> response = new HashMap<>();
            response.put("orderId", order.get("id"));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create order: " + e.getMessage());
        }
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> request) {
        String orderId = request.get("orderId");
        String paymentId = request.get("paymentId");

        if (orderId == null || paymentId == null) {
            return ResponseEntity.badRequest().body("Missing orderId or paymentId");
        }

        paymentService.savePaymentDetails(orderId, paymentId, 0, "Paid");
        return ResponseEntity.ok().body("Payment verified successfully!");
    }
}
