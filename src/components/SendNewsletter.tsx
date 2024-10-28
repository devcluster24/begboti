"use client";
import { postNewsletter } from "@/lib/postNewsletter";
import React, { FormEvent } from "react";

const SendNewsletter: React.FC = () => {
  const sendNewsLetter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const email = (e.target as HTMLFormElement).email.value;
      await postNewsletter(email);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={sendNewsLetter} className="w-full flex gap-2">
      <input
        type="text"
        placeholder="ইমেইল ঠিকানা"
        name="email"
        className="border border-gray-300 p-2 rounded-md w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md"
      >
        সাবমিট
      </button>
    </form>
  );
};

export default SendNewsletter;
