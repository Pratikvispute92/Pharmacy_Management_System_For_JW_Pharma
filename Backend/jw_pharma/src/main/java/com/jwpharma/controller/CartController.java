package com.jwpharma.controller;

import com.jwpharma.entity.Cart;
import com.jwpharma.entity.Product;
import com.jwpharma.entity.User;
import com.jwpharma.repository.CartRepository;
import com.jwpharma.repository.ProductRepository;
import com.jwpharma.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // ✅ Add Product to Cart
    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addToCart(
            @PathVariable Long userId,
            @RequestParam String name,
            @RequestParam double price,
            @RequestParam String category,
            @RequestParam String manufacturer,
            @RequestParam("image") MultipartFile image) {

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Product product = new Product(name, price, category, manufacturer, image.getBytes());
            productRepository.save(product);  // Save product in DB

            Cart cart = cartRepository.findByUserId(userId);
            if (cart == null) {
                cart = new Cart();
                cart.setUser(user);
                cart.setProducts(new ArrayList<>());
            }
            cart.getProducts().add(product);

            cartRepository.save(cart);
            return ResponseEntity.ok(cart);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error while processing image");
        }
    }

    // ✅ Get Cart for a User
    @GetMapping("/{userId}")
    public ResponseEntity<?> getCart(@PathVariable Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            return ResponseEntity.badRequest().body("Cart not found");
        }
        return ResponseEntity.ok(cart);
    }

    // ✅ Update Product Details in Cart
    @PutMapping("/update/{userId}/{productId}")
    public ResponseEntity<?> updateProductInCart(
            @PathVariable Long userId,
            @PathVariable Long productId,
            @RequestParam String name,
            @RequestParam double price,
            @RequestParam String category,
            @RequestParam String manufacturer,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        try {
            Cart cart = cartRepository.findByUserId(userId);
            if (cart == null) {
                return ResponseEntity.badRequest().body("Cart not found");
            }

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            product.setName(name);
            product.setPrice(price);
            product.setCategory(category);
            product.setManufacturer(manufacturer);

            if (image != null && !image.isEmpty()) {
                product.setImage(image.getBytes());
            }

            productRepository.save(product);
            return ResponseEntity.ok("Product updated successfully!");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error while processing image");
        }
    }

    // ✅ Remove Product from Cart
    @DeleteMapping("/remove/{userId}/{productId}")
    public ResponseEntity<?> removeProductFromCart(@PathVariable Long userId, @PathVariable Long productId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            return ResponseEntity.badRequest().body("Cart not found");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (cart.getProducts().remove(product)) {
            cartRepository.save(cart);
            return ResponseEntity.ok("Product removed successfully!");
        } else {
            return ResponseEntity.badRequest().body("Product not found in cart");
        }
    }

    // ✅ Clear Entire Cart
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<?> clearCart(@PathVariable Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            return ResponseEntity.badRequest().body("Cart not found");
        }

        cart.getProducts().clear();
        cartRepository.save(cart);
        return ResponseEntity.ok("Cart cleared successfully!");
    }
}
