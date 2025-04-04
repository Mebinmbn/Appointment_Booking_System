const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const FILE_PATH = "./appointments.json";

function readAppointments() {
  if (!fs.existsSync(FILE_PATH)) return [];
  try {
    const data = fs.readFileSync(FILE_PATH);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
}

function writeAppointments(appointments) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(appointments, null, 2));
  } catch (err) {
    console.error("Error writing file:", err);
  }
}

const allSlots = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

app.get("/slots/:date", (req, res) => {
  const { date } = req.params;
  if (!date) return res.status(400).json({ message: "Date is required" });

  const currentDate = new Date();
  const bookingDate = new Date(date);

  if (bookingDate < currentDate) {
    return res.status(400).json({ message: "Cannot book for a past date" });
  }

  const appointments = readAppointments();
  const bookedSlots = appointments
    .filter((appt) => appt.date === date)
    .map((appt) => appt.timeSlot);
  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));
  res.status(200).json({ availableSlots });
});

app.post("/book", (req, res) => {
  const { name, phoneNumber, date, timeSlot } = req.body;
  if (!name || !phoneNumber || !date || !timeSlot) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!/^[0-9]{10}$/.test(phoneNumber)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }
  if (!allSlots.includes(timeSlot)) {
    return res.status(400).json({ message: "Invalid time slot" });
  }
  const currentDate = new Date();
  const bookingDate = new Date(date);
  if (bookingDate < currentDate) {
    return res.status(400).json({ message: "Cannot book for a past date" });
  }

  const appointments = readAppointments();
  const existing = appointments.find(
    (appt) => appt.date === date && appt.timeSlot === timeSlot
  );
  if (existing) return res.status(400).json({ message: "Slot already booked" });

  const newAppointment = { name, phoneNumber, date, timeSlot };
  appointments.push(newAppointment);
  writeAppointments(appointments);
  res.json({ message: "Appointment booked successfully" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
