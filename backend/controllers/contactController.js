import Contact from "../models/Contact.js";

// Send Contact Message
export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Admin - Get Messages
export const getMessages = async (req, res) => {
  try {

    const messages = await Contact.find().sort({
      createdAt: -1,
    });

    res.json(messages);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });

  }
};

// Admin - Delete Message
export const deleteMessage = async (req, res) => {

  try {

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: "Message deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });

  }

};


// Admin mark message as read
export const markAsRead = async (req, res) => {
  try {

    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    message.isRead = true;

    await message.save();

    res.json({
      message: "Message marked as read",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });

  }
};