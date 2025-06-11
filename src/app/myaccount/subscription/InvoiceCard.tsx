import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";
import Stripe from "stripe";

export default function InvoiceCard({
  invoice,
}: {
  invoice: {
    // stripe typing is dumb so i copied the type it saidf it was
    id: string | undefined;
    status: Stripe.Invoice.Status | null;
    amount_due: number;
    paid_at: string | null;
    due_date: string | null;
    hosted_invoice_url: string | null | undefined;
  };
}) {
  return (
    <li className="border border-gray-200 rounded-lg p-4 bg-white">
      <p>
        <strong>Status:</strong>
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
            invoice.status === "paid"
              ? "bg-green-100 text-green-800"
              : invoice.status === "open"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {invoice.status != "draft"
            ? invoice.status != "open"
              ? invoice.status
              : "missed"
            : "next"}
        </span>
      </p>
      <p>
        <strong>Amount Due:</strong> ${invoice.amount_due.toFixed(2)}
      </p>
      <p>
        <strong>Paid At:</strong> {invoice.paid_at ?? "N/A"}
      </p>
      <p>
        <strong>Due Date:</strong> {invoice.due_date ?? "N/A"}
      </p>
      {invoice.hosted_invoice_url && invoice.status != "open" && (
        <p>
          <Link
            href={invoice.hosted_invoice_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline flex gap-2 items-center"
          >
            View Invoice <ExternalLink />
          </Link>
        </p>
      )}
    </li>
  );
}
