import getUserData from "@/lib/UserData";
import { getSubscription } from "@/lib/payments/subscription/getSubscription";
import Link from "next/link";
import { redirect } from "next/navigation";
import InvoiceCard from "./InvoiceCard";
import cancelSubscription from "@/lib/payments/subscription/cancelSubscription";
import CancelButton from "./CancelButton";

export default async function ManageSubscription() {
  const userData = await getUserData();
  if (!userData) redirect("/login");

  const { user } = userData;

  const subscriptionData = await getSubscription(user.id);

  const { unpaidInvoice } = subscriptionData;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 mt-10">
      <h1 className="text-3xl font-bold mb-6">Manage Your Subscription</h1>

      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-yellow-900 mb-3">
          Subscription Details
        </h2>
        <p>
          <strong>Status:</strong> {subscriptionData.subscriptionStatus}
        </p>
        <p>
          <strong>Next Payment:</strong>{" "}
          {subscriptionData.nextPayment ? subscriptionData.nextPayment : "N/A"}
        </p>
        <p>
          <strong>Next Payment Price:</strong>{" "}
          {subscriptionData.nextPaymentPrice
            ? `$${subscriptionData.nextPaymentPrice}`
            : "N/A"}
        </p>
        <p>
          <strong>Last Payment:</strong>{" "}
          {subscriptionData.lastPaymentDate ?? "N/A"}
        </p>
      </div>

      {unpaidInvoice && subscriptionData.subscriptionStatus === "past_due" && (
        <div className="bg-white p-4 rounded-lg border border-yellow-300 mb-6">
          <h3 className="font-semibold mb-2">Payment Required</h3>
          <p>
            Amount Due: ${unpaidInvoice.amount_due / 100} <br />
          </p>
          <Link
            href={unpaidInvoice.hosted_invoice_url!}
            target="_blank"
            className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            Pay Invoice
          </Link>
        </div>
      )}

      <div className="bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Invoices</h2>
        {subscriptionData.allInvoices &&
        subscriptionData.allInvoices.length > 0 ? (
          <ul className="space-y-4 max-h-96 overflow-y-auto">
            {subscriptionData.allInvoices.map((invoice) => (
              <InvoiceCard invoice={invoice} key={invoice.id} />
            ))}
          </ul>
        ) : (
          <p>No invoices found.</p>
        )}
      </div>

      <div>
        <CancelButton sub_id={subscriptionData.sub_id!} />
      </div>
    </div>
  );
}
