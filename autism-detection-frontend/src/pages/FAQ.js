import React, { useState } from "react";
import "../pages/FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the autism detection work?",
      answer: "Our AI analyzes facial expressions and eye movements to determine possible autism traits.",
    },
    {
      question: "Is my data stored?",
      answer: "No, we prioritize privacy. Images are processed in real-time and not stored.",
    },
    {
      question: "Can I access my previous reports?",
      answer: "Yes! Login to your account to view your previous analysis results.",
    },
    {
      question: "Is this project for research or commercial use?",
      answer: "This is a university project demonstrating AI's potential in autism detection.",
    },
    {
      question: "How accurate is the detection?",
      answer: "The accuracy depends on various factors, including image quality and AI training data. It provides a probability score rather than a definitive diagnosis.",
    },
    {
      question: "Who can use this tool?",
      answer: "Anyone interested in understanding autism traits can use it. However, for clinical diagnosis, consult a medical professional.",
    },
    {
      question: "What kind of facial expressions does it analyze?",
      answer: "It analyzes eye movement, microexpressions, and certain facial cues that are linked with autism spectrum indicators.",
    },
    {
      question: "Will this tool replace medical diagnosis?",
      answer: "No. This is an AI-based assistive tool and should not be used as a substitute for a professional medical diagnosis.",
    },
    {
      question: "Can I use this on mobile?",
      answer: "Yes! Our platform is responsive and works on both desktop and mobile devices.",
    },
    {
      question: "Is there a cost to use this service?",
      answer: "Currently, this is a free-to-use research project with no costs involved.",
    },
  ];

  return (
    <div className="faq-page">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">{faq.question}</div>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
