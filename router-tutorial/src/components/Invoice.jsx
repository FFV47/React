import { useParams } from "react-router-dom";
import { getInvoice } from "../data";

export default function Invoice() {
  // useParams returns an object with URL parameters
  const { invoiceID } = useParams();
  // URL params are always "string"
  const invoice = getInvoice(parseInt(invoiceID, 10));

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
    </main>
  );
}
