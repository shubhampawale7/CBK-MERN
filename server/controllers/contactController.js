// server/controllers/contactController.js
export const submitContactForm = (req, res) => {
  const { name, email, subject, message } = req.body;

  // Log the form data to the console
  console.log("New contact form submission:", {
    name,
    email,
    subject,
    message,
  });

  res.status(200).json({ message: "Message sent successfully!" });
};
