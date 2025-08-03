package com.jwpharma;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.JSONObject;

public class ApiTest {
    private static final String API_URL = "https://bfhldevapigw.healthrx.co.in/automation-campus/create/user";
    private static final String ROLL_NUMBER = "1";

    public static void main(String[] args) {
        testValidUserCreation();
        testMultipleUniqueUsers();
        testDuplicatePhoneNumber();
        testDuplicateEmail();
        testMissingRollNumber();
        testInvalidPhoneNumber();
        testInvalidEmailFormat();
        testMissingFields();
        testEmptyStringFields();
        testLongInputValues();
        testSQLInjection();
    }

    private static void testValidUserCreation() {
        sendTestRequest("John", "Doe", 9876543210L, "john.doe@example.com", true);
    }

    private static void testMultipleUniqueUsers() {
        sendTestRequest("Alice", "Smith", 9876543211L, "alice.smith@example.com", true);
        sendTestRequest("Bob", "Brown", 9876543212L, "bob.brown@example.com", true);
    }

    private static void testDuplicatePhoneNumber() {
        sendTestRequest("Charlie", "Davis", 9876543210L, "charlie.davis@example.com", true);
    }

    private static void testDuplicateEmail() {
        sendTestRequest("David", "Miller", 9876543213L, "john.doe@example.com", true);
    }

    private static void testMissingRollNumber() {
        sendTestRequest("Eve", "Johnson", 9998887776L, "eve.johnson@example.com", false);
    }

    private static void testInvalidPhoneNumber() {
        sendTestRequest("Frank", "Williams", 1234L, "frank.williams@example.com", true);
    }

    private static void testInvalidEmailFormat() {
        sendTestRequest("Grace", "Hall", 7776665554L, "invalid-email", true);
    }

    private static void testMissingFields() {
        sendTestRequest("", "", 0L, "", true);
    }

    private static void testEmptyStringFields() {
        sendTestRequest(" ", " ", 7776665555L, " ", true);
    }

    private static void testLongInputValues() {
        String longString = "A".repeat(1000);
        sendTestRequest(longString, longString, 9876543215L, longString + "@example.com", true);
    }

    private static void testSQLInjection() {
        sendTestRequest("' OR '1'='1'; --", "Hacker", 9876543216L, "<script>alert(1)</script>", true);
    }

    private static void sendTestRequest(String firstName, String lastName, long phoneNumber, String emailId, boolean includeRollNumber) {
        try {
            JSONObject data = new JSONObject();
            data.put("firstName", firstName);
            data.put("lastName", lastName);
            data.put("phoneNumber", phoneNumber);
            data.put("emailId", emailId);
            
            URL url = new URL(API_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            if (includeRollNumber) {
                conn.setRequestProperty("roll-number", ROLL_NUMBER);
            }
            conn.setDoOutput(true);
            
            OutputStream os = conn.getOutputStream();
            os.write(data.toString().getBytes());
            os.flush();
            os.close();
            
            int responseCode = conn.getResponseCode();
            System.out.println("Response Code: " + responseCode + " for " + emailId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
