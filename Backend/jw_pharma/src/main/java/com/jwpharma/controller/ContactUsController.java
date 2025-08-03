package com.jwpharma.controller;

import com.jwpharma.entity.ContactUs;
import com.jwpharma.security.ContactUsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact-us")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ContactUsController {

    @Autowired
    private ContactUsService contactUsService;

    @GetMapping
    public ResponseEntity<List<ContactUs>> getAllMessages() {
        List<ContactUs> messages = contactUsService.getAllMessages();
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactUs> getMessageById(@PathVariable Long id) {
        ContactUs contactUs = contactUsService.getMessageById(id);
        return ResponseEntity.ok(contactUs);
    }

    @PostMapping
    public ResponseEntity<ContactUs> createMessage(@RequestBody ContactUs contactUs) {
        ContactUs savedMessage = contactUsService.saveMessage(contactUs);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMessage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long id) {
        try {
            contactUsService.deleteMessage(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
