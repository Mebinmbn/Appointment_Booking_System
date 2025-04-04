# Appointment Booking System

## Overview
This project implements an Appointment Booking System using Node.js, Express, and a simple JSON file to store appointment data. The frontend is packaged as a JavaScript plugin that can be embedded on any website using a `<script>` tag.

## Features
1. **Appointment Slots:**
   - Available time slots are 30-minute intervals between 10:00 AM and 5:00 PM.
   - A break from 1:00 PM to 2:00 PM (not available for booking).

2. **Booking Functionality:**
   - Users can book an appointment by providing their Name, Phone Number, Date, and Selected Time Slot.
   - Double booking of the same slot is not allowed.

3. **Slot Availability:**
   - Users can view all available slots for a specific date.

4. **Frontend Plugin:**
   - A self-contained UI plugin that can be embedded into any webpage via a `<script>` tag.

## API Endpoints

### 1. Get Available Slots
**Endpoint:** `/slots/:date`
- **Method:** GET
- **Description:** Fetches the available time slots for a specific date.
- **Parameters:**
  - `date` (string): Date in `YYYY-MM-DD` format

**Example:**
```
GET http://localhost:5000/slots/2025-04-05
```
**Response:**
```
{
  "availableSlots": ["10:00 AM", "10:30 AM", "11:00 AM"]
}
```

### 2. Book an Appointment
**Endpoint:** `/book`
- **Method:** POST
- **Description:** Books an appointment for a given date and time slot.
- **Request Body:**
```json
{
  "name": "Mebin Joseph",
  "phoneNumber": "1234567890",
  "date": "2025-04-05",
  "timeSlot": "10:00 AM"
}
```
**Response:**
```
{
  "message": "Appointment booked successfully"
}
```

## How to Run the Server
1. Install dependencies:
   ```bash
   npm install express cors body-parser
   ```
2. Run the server:
   ```bash
   node server.js
   ```
3. Server will be running at `http://localhost:5000`


## Usage
1. Open the HTML file in your browser.
2. Select a date to see available slots.
3. Fill in your details and select a slot.
4. Click the 'Book' button to make an appointment.

## Edge Case Handling
- Validates that all input fields are filled.
- Phone number must be a 10-digit numeric string.
- Prevents booking for past dates.
- Prevents double booking of the same slot on the same date.
- Handles errors related to file reading and writing.

## Technology Stack
- Backend: Node.js, Express
- Frontend: JavaScript
- Data Storage: JSON file

## License
This project is licensed under the MIT License.

