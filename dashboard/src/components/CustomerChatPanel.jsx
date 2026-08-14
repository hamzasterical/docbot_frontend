import React, { useEffect, useRef, useState } from 'react';
import { fetchConversationMessages, sendPatientMessage } from '../api';

export default function CustomerChatPanel({ patient, onClose }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!patient || !patient.id) return;
    setLoading(true);
    fetchConversationMessages(patient.id)
      .then((data) => {
        setMessages(data || []);
        setLoading(false);
        setTimeout(scrollToBottom, 100);
      })
      .catch((err) => {
        console.error("Failed to fetch messages for patient:", err);
        setError(err.message);
        setMessages([]);
        setLoading(false);
      });
  }, [patient]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || sending || !patient) return;

    const textToSend = inputText.trim();
    setSending(true);

    sendPatientMessage(patient.id, textToSend)
      .then((newMsg) => {
        setMessages((prev) => [...prev, newMsg]);
        setInputText('');
        setSending(false);
      })
      .catch((err) => {
        console.error("Error sending message to patient:", err);
        alert(`Failed to send WhatsApp message: ${err.message}`);
        setSending(false);
      });
  };

  if (!patient) return null;

  const formatTime = (isoString) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="w-full lg:w-96 bg-surface-container-lowest border border-[#DFEAE7] rounded-xl card-shadow flex flex-col h-[650px] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-surface-variant/40 bg-surface-container-low/30 flex items-center justify-between">
        <div>
          <h4 className="font-patient-title text-patient-title text-on-surface font-semibold">
            {patient.name || 'Unnamed Patient'}
          </h4>
          <p className="font-data-mono text-xs text-on-surface-variant">
            {patient.phone_number}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer"
          title="Close chat panel"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3 bg-surface-container-lowest">
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-on-surface-variant text-sm">
            Loading message log...
          </div>
        ) : error ? (
          <div className="p-3 bg-error-container text-on-error-container text-xs rounded-lg">
            Error loading chat history: {error}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-on-surface-variant/70 text-xs text-center p-6 bg-surface-container-low/20 rounded-xl">
            No message history recorded in database yet. Type a message below to start the conversation!
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
              >
                <div className={`bubble ${isUser ? 'user' : 'system'}`}>
                  {msg.body}
                </div>
                <span className="text-[10px] text-on-surface-variant/60 px-1">
                  {formatTime(msg.created_at)}
                </span>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Composer Footer */}
      <div className="p-3 border-t border-surface-variant/40 bg-surface-container-low/20">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a WhatsApp message to patient..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={sending}
            className="flex-1 px-3 py-2 bg-surface-container-lowest border border-surface-variant rounded-lg font-body-sm text-on-surface focus:outline-none focus:border-primary placeholder:text-on-surface-variant/50 text-xs"
          />
          <button
            type="submit"
            disabled={sending || !inputText.trim()}
            className="p-2 bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center justify-center cursor-pointer"
            title="Send WhatsApp message"
          >
            <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
