(function () {
  const script = document.currentScript;
  const container = document.createElement("div");
  container.innerHTML = `<div style="font-family: Arial, sans-serif; max-width: 450px; margin: 20px auto; padding: 15px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align:center">
    <h3 style="text-align: center;">Book an Appointment</h3>
    <input id='name' placeholder='Name' style="width: 90%; padding: 8px; margin: 5px 0;" />
    <input id='phone' placeholder='Phone Number' style="width: 90%; padding: 8px; margin: 5px 0;" />
    <input id='date' type='date' style="width: 90%; padding: 8px; margin: 5px 0;" />
    <select id='slot' style="width: 95%; padding: 8px; margin: 5px 0;"></select>
    <button id='book' style="width: 100%; padding: 10px; background-color: #28a745; color: white; border: none; border-radius: 4px; margin: 5px 0;">Book</button>
    <p id='message' style="color: #555; text-align: center;"></p>
  </div>`;
  script.parentNode.insertBefore(container, script);

  const slotSelect = container.querySelector("#slot");
  const message = container.querySelector("#message");

  const loadSlots = async (date) => {
    try {
      const response = await fetch(`http://localhost:5000/slots/${date}`);
      const data = await response.json();
      slotSelect.innerHTML = data.availableSlots
        .map((slot) => `<option>${slot}</option>`)
        .join("");
    } catch (error) {
      message.textContent = "Error loading slots";
    }
  };

  container.querySelector("#date").addEventListener("change", (e) => {
    loadSlots(e.target.value);
  });

  container.querySelector("#book").addEventListener("click", async () => {
    const name = container.querySelector("#name").value;
    const phone = container.querySelector("#phone").value;
    const date = container.querySelector("#date").value;
    const timeSlot = slotSelect.value;

    if (!name || !phone || !date || !timeSlot) {
      message.textContent = "All fields are required";
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phoneNumber: phone, date, timeSlot }),
      });
      const result = await response.json();
      message.textContent = result.message;
      loadSlots(date);
    } catch (error) {
      message.textContent = "Error booking appointment";
    }
  });
})();
