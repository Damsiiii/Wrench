import React, { useState } from 'react';
import {
  Paperclip,
  Send,
  User,
  Check,
  CheckCheck,
  CheckCircle2,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { INITIAL_CONVERSATIONS } from '../data/mockData';

export default function MessagesPage({
  onViewWorkerProfile
}) {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState('conv-1');
  const [inputMessage, setInputMessage] = useState('');

  const activeConv =
    conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: 'customer',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setConversations(
      conversations.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            lastMessage: inputMessage,
            lastTime: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    setInputMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Messages</h1>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Chat with customers and workers about your jobs.
        </p>
      </div>

      {/* Messages Window (Split 2 cols) */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[580px]">
        {/* Left Column: Conversations List */}
        <div className="border-r border-slate-200 divide-y divide-slate-100 overflow-y-auto">
          {conversations.map((conv) => {
            const isSelected = conv.id === activeConvId;
            return (
              <div
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`p-4 cursor-pointer transition-colors flex items-start gap-3.5 ${
                  isSelected ? 'bg-[#e6f7f5]' : 'hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                    isSelected
                      ? 'bg-teal-200 text-[#006256]'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {conv.participantAvatar}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {conv.participantName}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {conv.lastTime}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 truncate font-medium">
                    {conv.jobTitle}
                  </div>

                  <p className="text-xs text-slate-600 truncate leading-relaxed">
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Chat Content & Input */}
        <div className="md:col-span-2 flex flex-col justify-between h-full bg-[#fafbfc]">
          {/* Chat Header */}
          <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-[#008272] font-bold text-xs flex items-center justify-center">
                {activeConv.participantAvatar}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {activeConv.participantName}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {activeConv.participantRole} • {activeConv.participantTown}
                </p>
              </div>
            </div>

            <button
              onClick={() => onViewWorkerProfile(activeConv.workerId)}
              className="bg-white hover:bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-slate-600" />
              <span>View profile</span>
            </button>
          </div>

          {/* Pinned Job Context Banner (Mint background matching Board 14) */}
          <div className="bg-[#e6f7f5] border-b border-[#cbf0ea] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#cbf0ea] flex items-center justify-center text-[#008272] flex-shrink-0 shadow-sm">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {activeConv.jobTitle}
                  </h4>
                  <span className="bg-[#d1fae5] text-[#065f46] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{activeConv.jobStatus}</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Posted by {activeConv.jobCustomer} • {activeConv.jobLocation}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div>
                <div className="text-[10px] text-slate-500">Accepted quote</div>
                <div className="font-extrabold text-[#008272]">
                  Rs. {activeConv.acceptedQuote.toLocaleString()}
                </div>
              </div>
              <div className="border-l border-[#cbf0ea] pl-3">
                <div className="text-[10px] text-slate-500">Your budget</div>
                <div className="font-bold text-slate-800">
                  Rs. {activeConv.yourBudget.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {/* Date separator */}
            <div className="text-center my-2">
              <span className="text-[10px] text-slate-400 font-semibold bg-slate-200/60 px-3 py-1 rounded-full">
                18 Sep 2026
              </span>
            </div>

            {activeConv.messages.map((msg) => {
              const isMe = msg.sender === 'customer';
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                      {activeConv.participantAvatar}
                    </div>
                  )}

                  <div
                    className={`max-w-md rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-sm space-y-1 ${
                      isMe
                        ? 'bg-[#d1fae5] text-slate-900 rounded-br-none'
                        : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 text-[10px] ${
                        isMe ? 'text-teal-800' : 'text-slate-400'
                      }`}
                    >
                      <span>{msg.time}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5 text-[#008272]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-3"
          >
            <button
              type="button"
              onClick={() => alert('Attachments dialog opened.')}
              className="p-2 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-slate-300 rounded-xl px-4 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-[#008272] focus:outline-none"
            />

            <button
              type="submit"
              className="bg-[#008272] hover:bg-[#007163] text-white font-bold px-5 py-2 rounded-xl text-xs sm:text-sm transition-colors shadow-sm"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
