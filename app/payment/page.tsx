"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const CONFIG_ID = "app-config";
const configRef = doc(db, "config", CONFIG_ID);

export default function PaymentPage() {
  const [upiId, setUpiId] = useState("techconnect@upi");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    getDoc(configRef).then((snap) => {
      if (snap.exists() && snap.data().upiId) {
        setUpiId(snap.data().upiId);
      }
    });
  }, []);

  function handlePay() {
    if (!amount) return;
    const uri = `upi://pay?pa=${upiId}&pn=TechConnect&am=${amount}&tn=${encodeURIComponent(note || "Payment for TechConnect Services")}&cu=INR`;
    window.location.href = uri;
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Link href="/" className="mb-8 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">← Back to Home</Link>

        <div className="rounded-2xl bg-white p-8 shadow-sm dark:shadow-gray-900/50 dark:bg-gray-800">
          <div className="text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl">💰</div>
            <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">Online Payment</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Pay securely via UPI (GPay / PhonePe / Paytm)</p>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white p-6 text-center dark:bg-gray-800">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${upiId}&pn=TechConnect&cu=INR`}
                alt="UPI QR Code"
                className="mx-auto h-48 w-48"
              />
              <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">Scan to Pay</p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-800">UPI ID: <span className="font-bold">{upiId}</span></p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount (₹)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" className="mt-1 w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-lg text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Note</label>
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. CCTV Installation" className="mt-1 w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800" />
            </div>
            <button onClick={handlePay} disabled={!amount}
              className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >Pay ₹{amount || "0"}</button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>✅ GPay</span>
            <span>✅ PhonePe</span>
            <span>✅ Paytm</span>
          </div>
        </div>
      </div>
    </main>
  );
}
