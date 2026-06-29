"use client";

import { useState, FormEvent } from "react";
import Dropdown from "./Dropdown";

const subjectOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "test-drive", label: "Schedule a Test Drive" },
  { value: "financing", label: "Financing Question" },
  { value: "trade-in", label: "Trade-In Valuation" },
  { value: "availability", label: "Vehicle Availability" },
];

export default function ContactForm() {
  const [subject, setSubject] = useState("general");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-form-wrap glass-card">
        <div className="contact-form-success">
          <div className="contact-success-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22,4 12,14.01 9,11.01" />
            </svg>
          </div>
          <h2 className="contact-success-title">Message Sent!</h2>
          <p className="contact-success-text">
            Thanks for reaching out, {form.firstName || "there"}! We&apos;ll get back to you within 24 hours.
          </p>
          <button
            className="contact-form-submit"
            onClick={() => {
              setSubmitted(false);
              setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
              setSubject("general");
            }}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form-wrap glass-card">
      <h2 className="contact-form-title">Send us a message</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label>First Name</label>
            <input type="text" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} required />
          </div>
          <div className="contact-form-field">
            <label>Last Name</label>
            <input type="text" name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} required />
          </div>
        </div>
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label>Email</label>
            <input type="email" name="email" placeholder="john@email.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="contact-form-field">
            <label>Phone</label>
            <input type="tel" name="phone" placeholder="(416) 555-1234" value={form.phone} onChange={handleChange} />
          </div>
        </div>
        <div className="contact-form-field">
          <label>Subject</label>
          <Dropdown
            options={subjectOptions}
            value={subject}
            onChange={setSubject}
            className="contact-dropdown"
            ariaLabel="Subject"
          />
        </div>
        <div className="contact-form-field">
          <label>Message</label>
          <textarea name="message" rows={5} placeholder="Tell us how we can help..." value={form.message} onChange={handleChange} required />
        </div>
        <button type="submit" className="contact-form-submit" disabled={submitting}>
          {submitting ? "Sending…" : "Send Message →"}
        </button>
      </form>
    </div>
  );
}
