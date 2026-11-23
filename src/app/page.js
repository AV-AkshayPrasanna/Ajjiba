
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const STORAGE_KEY = "ajjiba-chat-data-v1";

export default function Home() {
  const [conversations, setConversations] = useState([
    {
      id: "welcome",
      title: "New conversation",
      messages: [],
    },
  ]);

  const [activeId, setActiveId] = useState("welcome");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  // Restore saved conversations when the app loads.
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);

      if (savedData) {
        const parsedData = JSON.parse(savedData);

        const validConversations =
          Array.isArray(parsedData.conversations) &&
          parsedData.conversations.length > 0 &&
          parsedData.conversations.every(
            (conversation) =>
              typeof conversation.id === "string" &&
              typeof conversation.title === "string" &&
              Array.isArray(conversation.messages)
          );

        if (validConversations) {
          setConversations(parsedData.conversations);

          const savedActiveId = parsedData.activeId;
          const activeConversationExists =
            parsedData.conversations.some(
              (conversation) => conversation.id === savedActiveId
            );

          setActiveId(
            activeConversationExists
              ? savedActiveId
              : parsedData.conversations[0].id
          );
        }
      }
    } catch (err) {
      console.error("Unable to restore Ajjiba chats:", err);
    } finally {
      setIsStorageLoaded(true);
    }
  }, []);

  // Automatically save conversations whenever they change.
  useEffect(() => {
    if (!isStorageLoaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          conversations,
          activeId,
        })
      );
    } catch (err) {
      console.error("Unable to save Ajjiba chats:", err);
    }
  }, [conversations, activeId, isStorageLoaded]);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeId
  );

  const messages = activeConversation?.messages || [];

  function createConversation() {
    const id = crypto.randomUUID();

    setConversations((previous) => [
      { id, title: "New conversation", messages: [] },
      ...previous,
    ]);

    setActiveId(id);
    setInput("");
    setError("");
  }

  // Delete an individual conversation.
  function deleteConversation(conversationId) {
    const conversationToDelete = conversations.find(
      (conversation) => conversation.id === conversationId
    );

    if (!conversationToDelete) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${conversationToDelete.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    const remainingConversations = conversations.filter(
      (conversation) => conversation.id !== conversationId
    );

    if (remainingConversations.length === 0) {
      const newConversation = {
        id: crypto.randomUUID(),
        title: "New conversation",
        messages: [],
      };

      setConversations([newConversation]);
      setActiveId(newConversation.id);
    } else {
      setConversations(remainingConversations);

      if (activeId === conversationId) {
        setActiveId(remainingConversations[0].id);
      }
    }

    setInput("");
    setError("");
  }

  async function sendMessage(event) {
    event?.preventDefault();

    const content = input.trim();

    if (!content || loading) return;

    const conversationId = activeId;

    const conversation = conversations.find(
      (item) => item.id === conversationId
    );

    const updatedMessages = [
      ...(conversation?.messages || []),
      { role: "user", content },
    ];

    setConversations((previous) =>
      previous.map((item) =>
        item.id === conversationId
          ? {
              ...item,
              title:
                item.messages.length === 0
                  ? content.slice(0, 32)
                  : item.title,
              messages: updatedMessages,
            }
          : item
      )
    );

    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setConversations((previous) =>
        previous.map((item) =>
          item.id === conversationId
            ? {
                ...item,
                messages: [
                  ...item.messages,
                  { role: "assistant", content: data.reply },
                ],
              }
            : item
        )
      );
    } catch (err) {
      setError(
        err.message || "Unable to reach Ajjiba. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex h-screen overflow-hidden bg-[#FAF6EE] text-[#162032]">

      {/* SIDEBAR */}
      <aside className="hidden w-72 shrink-0 flex-col bg-[#162032] p-5 text-[#FAF6EE] sm:flex">

        {/* AJJIBA OFFICIAL LOGO */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/ajjiba-logo-dark.png"
            alt="Ajjiba AI"
            width={500}
            height={500}
            priority
            className="h-44 w-44 object-contain"
          />
        </div>

        {/* New conversation */}
        <button
          onClick={createConversation}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <span className="text-lg">＋</span>
          New conversation
        </button>

        {/* Conversation history */}
        <p className="mb-3 mt-9 text-xs font-semibold uppercase tracking-widest text-[#FAF6EE]/40">
          Recent conversations
        </p>

        <div className="flex-1 space-y-2 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`group flex items-center gap-1 rounded-xl transition ${
                activeId === conversation.id
                  ? "bg-[#FAF6EE]/15"
                  : "hover:bg-[#FAF6EE]/10"
              }`}
            >
              <button
                onClick={() => {
                  setActiveId(conversation.id);
                  setError("");
                }}
                className={`min-w-0 flex-1 truncate rounded-xl px-3 py-3 text-left text-sm transition ${
                  activeId === conversation.id
                    ? "text-white"
                    : "text-[#FAF6EE]/65 hover:text-white"
                }`}
              >
                <span className="mr-2 text-[#FF5A5F]">◈</span>
                {conversation.title}
              </button>

              {/* Delete conversation */}
              <button
                onClick={() => deleteConversation(conversation.id)}
                title="Delete conversation"
                aria-label={`Delete ${conversation.title}`}
                className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#FAF6EE]/40 opacity-0 transition hover:bg-red-500/20 hover:text-red-400 focus:opacity-100 group-hover:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4h8v2" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v5" />
                  <path d="M14 11v5" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar footer */}
        <div className="border-t border-[#FAF6EE]/15 pt-5">
          <p className="text-sm text-[#FAF6EE]/70">
            A little wisdom, a lot of care.
          </p>
          <p className="mt-1 text-xs text-[#FAF6EE]/35">
            Ajjiba AI · 2026
          </p>
        </div>
      </aside>

      {/* MAIN CHAT AREA */}
      <section className="flex min-w-0 flex-1 flex-col">

        {/* HEADER */}
        <header className="flex h-16 shrink-0 items-center justify-end border-b border-[#162032]/10 bg-[#FAF6EE] px-5 sm:px-8">

          {/* Header status removed */}

        </header>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-10">

          {messages.length === 0 ? (
            <div className="flex min-h-full flex-col items-center justify-center text-center">

              {/* AJJIBA PORTRAIT */}
              <div className="mb-7 h-28 w-28 overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/ajjiba-avatar.webp"
                  alt="Ajjiba"
                  width={400}
                  height={400}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>

              {/* TAGLINE */}
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#2563EB]">
                WISDOM IN EVERY CONVERSATION.
              </p>

              {/* WELCOME HEADING */}
              <h2 className="text-[26px] font-semibold tracking-tight leading-tight text-[#162032] sm:text-[30px]">
                Hmph. Well, look who it is. Hello there.
              </h2>

            </div>
          ) : (

            /* Conversation messages */
            <div className="mx-auto max-w-3xl space-y-7">

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {message.role === "assistant" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#162032]">
                      <Image
                        src="/ajjiba-avatar.webp"
                        alt="Ajjiba"
                        width={72}
                        height={72}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-5 py-3 text-sm leading-7 sm:text-base ${
                      message.role === "user"
                        ? "rounded-br-md bg-[#162032] text-[#FAF6EE]"
                        : "rounded-bl-md border border-[#162032]/10 bg-white/70 text-[#162032]"
                    }`}
                  >
                    {message.content}
                  </div>

                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex items-center gap-3 text-sm text-[#162032]/60">
                  <div className="h-9 w-9 overflow-hidden rounded-xl">
                    <Image
                      src="/ajjiba-avatar.webp"
                      alt="Ajjiba"
                      width={72}
                      height={72}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span>Ajjiba is thinking...</span>
                </div>
              )}

            </div>
          )}

        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mx-auto w-full max-w-3xl px-4 pb-2 text-sm text-[#FF5A5F]">
            {error}
          </div>
        )}

        {/* MESSAGE INPUT */}
        <div className="shrink-0 bg-[#FAF6EE] px-4 pb-6 pt-3 sm:px-8">

          <form
            onSubmit={sendMessage}
            className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-[#162032]/15 bg-white p-3 shadow-lg transition focus-within:border-[#2563EB]/60 focus-within:ring-2 focus-within:ring-[#2563EB]/10"
          >

            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Message Ajjiba..."
              rows={1}
              className="max-h-36 min-h-11 flex-1 resize-y bg-transparent px-2 py-3 text-sm text-[#162032] outline-none placeholder:text-[#162032]/40"
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-xl font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Send message"
            >
              ↑
            </button>

          </form>

          {/* FOOTER DISCLAIMER */}
          {/* FOOTER DISCLAIMER */}
          <p className="mt-3 text-center text-[11px] text-[#162032]/45">
            80 years young. Still learning. Still occasionally wrong! Please verify important information.
          </p>

        </div>

      </section>
    </main>
  );
}
