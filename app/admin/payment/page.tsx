"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CONFIG_ID = "app-config";
const configRef = doc(db, "config", CONFIG_ID);

export default function PaymentPage() {
  const [upiId, setUpiId] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getDoc(configRef).then((snap) => {
      if (snap.exists() && snap.data().upiId) {
        setUpiId(snap.data().upiId);
      }
    });
  }, []);

  async function handleSave() {
    await setDoc(configRef, { upiId }, { merge: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const qrData = upiId
    ? `upi://pay?pa=${encodeURIComponent(upiId)}&pn=TechConnect&cu=INR`
    : "";

  const qrUrl = qrData
    ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`
    : "";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Payment QR Code</h1>
      <p className="mt-1 text-gray-500 dark:text-gray-400">Set your UPI ID for payment collection</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Your UPI Details</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800"
                placeholder="e.g. yourname@upi or 7217357366@paytm"
              />
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Enter your Google Pay / PhonePe / Paytm UPI ID</p>
            </div>
            <button
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              {saved ? "✓ Saved!" : "Save UPI ID"}
            </button>
          </div>

          <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">How to use:</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>1. Enter your UPI ID above and save</li>
              <li>2. QR code will generate automatically</li>
              <li>3. Go to any Task Detail page</li>
              <li>4. Customer/Engineer can scan QR to pay</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800 text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Payment QR Code</h2>
          {qrUrl ? (
            <div className="mt-6">
              <img
                src={qrUrl}
                alt="Payment QR Code"
                className="mx-auto rounded-xl border border-gray-200 dark:border-gray-700"
              />
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Scan with any UPI app (GPay / PhonePe / Paytm)</p>
              <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">{upiId}</p>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-12">
              <p className="text-4xl">📱</p>
              <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">Enter your UPI ID to generate QR code</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
