"use client";
import { useState } from "react";
import { FileText, Plus, Trash2, Pencil, X, Check } from "lucide-react";

type TContentTab =
  | "help_and_support"
  | "privacy_policy"
  | "terms_and_conditions"
  | "faq"
  | "note";

const tabs: { key: TContentTab; label: string }[] = [
  { key: "help_and_support", label: "Help & Supports" },
  { key: "privacy_policy", label: "Privacy Policy" },
  { key: "terms_and_conditions", label: "Terms & Conditions" },
  { key: "faq", label: "FAQ" },
  { key: "note", label: "Note" },
];

// ── dummy FAQ ─────────────────────────────────────────────────
const dummyFaqs = [
  {
    id: "1",
    question: "How do I place an order?",
    answer:
      "You can place an order through our mobile app by selecting the services you need and choosing a pickup time.",
  },
  {
    id: "2",
    question: "What are your operating hours?",
    answer:
      "We operate from 8 AM to 8 PM, Monday through Saturday. Sunday we are closed.",
  },
  {
    id: "3",
    question: "Do you offer same-day delivery?",
    answer:
      "Yes, same-day delivery is available for an additional fee if the order is placed before 10 AM.",
  },
];

const dummyNote =
  "Please Kindly Note that the number of your Items should match your final payment amount Before you submit your Order. Thank You.";

const ContentPage = () => {
  const [activeTab, setActiveTab] = useState<TContentTab>("help_and_support");
  const [bodyContent, setBodyContent] = useState<Record<string, string>>({
    help_and_support: "",
    privacy_policy: "",
    terms_and_conditions: "",
  });
  const [faqs, setFaqs] = useState(dummyFaqs);
  const [note, setNote] = useState(dummyNote);
  const [editingNote, setEditingNote] = useState(false);
  const [addingFaq, setAddingFaq] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  const isTextTab = [
    "help_and_support",
    "privacy_policy",
    "terms_and_conditions",
  ].includes(activeTab);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <FileText size={16} className="text-primary" /> Content Management
        </h2>
        {isTextTab && (
          <button className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            💾 Save Changes
          </button>
        )}
      </div>

      <div className="flex gap-6">
        {/* Left Sidebar Tabs */}
        <div className="w-44 flex flex-col gap-1 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-left px-4 py-2.5 rounded-lg text-sm transition ${
                activeTab === tab.key
                  ? "bg-primary text-white font-medium"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              {tab.key === "help_and_support" && (
                <span className="ml-1 text-xs">›</span>
              )}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex-1">
          {/* Text content tabs */}
          {isTextTab && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-4">
                {tabs.find((t) => t.key === activeTab)?.label}
              </h3>
              <textarea
                rows={10}
                placeholder="Enter privacy policy content here..."
                value={bodyContent[activeTab] || ""}
                onChange={(e) =>
                  setBodyContent((prev) => ({
                    ...prev,
                    [activeTab]: e.target.value,
                  }))
                }
                className="w-full border border-gray-200 rounded-lg p-4 text-sm text-gray-600 placeholder-gray-300 focus:outline-none focus:border-primary resize-none transition"
              />
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">
                  Frequently Asked Questions
                </h3>
                <button
                  onClick={() => setAddingFaq(true)}
                  className="flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                >
                  <Plus size={14} /> Add FAQ
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border-b border-gray-100 pb-4">
                    <p className="font-medium text-gray-700 text-sm mb-1">
                      {faq.question}
                    </p>
                    <p className="text-sm text-gray-500">{faq.answer}</p>
                  </div>
                ))}

                {/* Add new FAQ inline */}
                {addingFaq && (
                  <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
                    <input
                      placeholder="New Question"
                      value={newFaq.question}
                      onChange={(e) =>
                        setNewFaq({ ...newFaq, question: e.target.value })
                      }
                      className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                    <textarea
                      placeholder="Answer"
                      rows={3}
                      value={newFaq.answer}
                      onChange={(e) =>
                        setNewFaq({ ...newFaq, answer: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-primary resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setAddingFaq(false);
                          setNewFaq({ question: "", answer: "" });
                        }}
                        className="text-gray-400 hover:text-red-400 transition"
                      >
                        <X size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (newFaq.question && newFaq.answer) {
                            setFaqs([
                              ...faqs,
                              { id: Date.now().toString(), ...newFaq },
                            ]);
                            setNewFaq({ question: "", answer: "" });
                            setAddingFaq(false);
                          }
                        }}
                        className="text-primary hover:text-primary-dark transition"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Note Tab */}
          {activeTab === "note" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Write Your Note</h3>
                <button
                  onClick={() => setEditingNote(true)}
                  className="flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                >
                  <Plus size={14} /> Add Note
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 relative">
                {editingNote ? (
                  <>
                    <textarea
                      rows={4}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full text-sm text-gray-600 focus:outline-none resize-none"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => setEditingNote(false)}
                        className="text-gray-400 hover:text-red-400 transition"
                      >
                        <X size={16} />
                      </button>
                      <button
                        onClick={() => setEditingNote(false)}
                        className="text-primary hover:text-primary-dark transition"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-gray-600">{note}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      <button className="text-red-400 hover:text-red-500 transition">
                        <Trash2 size={14} />
                      </button>
                      <button
                        onClick={() => setEditingNote(true)}
                        className="text-gray-400 hover:text-primary transition"
                      >
                        <Pencil size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
