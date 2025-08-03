package com.jwpharma.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.jwpharma.entity.ContactUs;
import com.jwpharma.repository.ContactUsRepository;

import java.util.List;

@Service
public class ContactUsService {

	@Autowired
	private ContactUsRepository contactUsRepository;

	public List<ContactUs> getAllMessages() {
		return contactUsRepository.findAll();
	}

	public ContactUs getMessageById(Long id) {
		return contactUsRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Message not found with ID: " + id));
	}

	public ContactUs saveMessage(ContactUs contactUs) {
		return contactUsRepository.save(contactUs);
	}

	@Transactional
	public void deleteMessage(Long id) {
		if (!contactUsRepository.existsById(id)) {
			throw new RuntimeException("Cannot delete. Message not found with ID: " + id);
		}
		contactUsRepository.deleteById(id);
	}
}
