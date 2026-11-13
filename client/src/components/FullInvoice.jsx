import InvoiceTemplateFooter from "./InvoiceTemplateFooter";
import { formatMoney, formatQty, formatDate, formatAddressLines, splitLineDescription } from "../lib/format";
import { currencySymbol } from "../lib/currencies";

const INDIAN_STATE_CODES = {
  "Andhra Pradesh": "37", "Arunachal Pradesh": "12", Assam: "18", Bihar: "10",
  Chhattisgarh: "22", Goa: "30", Gujarat: "24", Haryana: "06", "Himachal Pradesh": "02",
  Jharkhand: "20", Karnataka: "29", Kerala: "32", "Madhya Pradesh": "23",
  Maharashtra: "27", Manipur: "14", Meghalaya: "17", Mizoram: "15", Nagaland: "13",
  Odisha: "21", Punjab: "03", Rajasthan: "08", Sikkim: "11", "Tamil Nadu": "33",
  Telangana: "36", Tripura: "16", "Uttar Pradesh": "09", Uttarakhand: "05",
  "West Bengal": "19", "Andaman and Nicobar Islands": "35", Chandigarh: "04",
  "Dadra and Nagar Haveli and Daman and Diu": "26", Delhi: "07",
  "Jammu and Kashmir": "01", Ladakh: "38", Lakshadweep: "31", Puducherry: "34",
};

function stateWithCode(state, gstin) {
  if (!state && !gstin) return "";
  const code = String(gstin || "").slice(0, 2) || INDIAN_STATE_CODES[state] || "";
  return `${state || "State"}${code ? ` (${code})` : ""}`;
}

function formatRate(rate) {
  return String(Number(Number(rate).toFixed(2)));
}

export default function FullInvoice({ invoice, copyLabel = "ORIGINAL FOR RECIPIENT" }) {
  const { business, customer, lineItems } = invoice;
  const symbol = currencySymbol(invoice.currency);
  const billingLines = formatAddressLines({
    line1: customer?.billing_address, line2: customer?.billing_address_line2,
    city: customer?.billing_city, state: customer?.state,
    pincode: customer?.pincode, country: customer?.country,
  });
  const shippingLines = formatAddressLines({
    line1: customer?.shipping_address, line2: customer?.shipping_address_line2,
    city: customer?.shipping_city, state: customer?.shipping_state,
    pincode: customer?.shipping_pincode, country: customer?.shipping_country,
  });
  const localSupply = Boolean(business.state && customer?.state && business.state === customer.state);
  const taxMode = invoice.gst_treatment === "none" ? "none" : localSupply ? "local" : "interstate";
  const taxableValue = Number(invoice.sub_total || 0) - Number(invoice.discount || 0);
  const chargedTax = invoice.gst_treatment === "gst" ? Number(invoice.tax_total || 0) : 0;
  const taxGroups = new Map();
  for (const line of lineItems) {
    if (line.line_type === "header") continue;
    const rate = Number(line.tax_rate) || 0;
    if (!rate) continue;
    const base = Math.max(0, Number(line.qty) * Number(line.rate) - Number(line.discount));
    taxGroups.set(rate, (taxGroups.get(rate) || 0) + (base * rate) / 100);
  }
  const taxLines = invoice.gst_treatment === "none" ? [] : [...taxGroups.entries()]
    .sort(([a], [b]) => a - b)
    .flatMap(([rate, amount]) => taxMode === "local"
      ? [
          { label: `Add: CGST @ ${formatRate(rate / 2)}%`, amount: amount / 2 },
          { label: `Add: SGST @ ${formatRate(rate / 2)}%`, amount: amount / 2 },
        ]
      : [{ label: `Add: IGST @ ${formatRate(rate)}%`, amount }]);
  const businessState = stateWithCode(business.state, business.gstin);
  const customerState = stateWithCode(customer?.state, invoice.gstin || customer?.gstin);
  const placeOfSupply = stateWithCode(customer?.shipping_state || customer?.state, invoice.gstin || customer?.gstin);
  const dispatchThrough = [invoice.dispatch_through || invoice.eway_transporter_name, invoice.eway_vehicle_number].filter(Boolean).join(" / ");
  const businessAddress = [business.address, business.pincode].filter(Boolean).join(", ");

  return (
    <div className="invoice-template">
      {invoice.status === "cancelled" && <div className="doc-cancelled-stamp">CANCELLED</div>}
      <header className="invoice-template-header">
        <div className="invoice-template-business">
          {business.logo_data_url && <img src={business.logo_data_url} alt={business.name} />}
          <strong>{business.name}</strong>
          {businessAddress && <p>{businessAddress}</p>}
          {business.gstin && <p>GSTIN: {business.gstin}{businessState ? `  |  State: ${businessState}` : ""}</p>}
          {!business.gstin && businessState && <p>State: {businessState}</p>}
          {business.phone && <p>Ph: {business.phone}</p>}
          {business.email && <p>E-mail: {business.email}</p>}
        </div>
        <div className="invoice-template-title">
          <h1>TAX INVOICE</h1>
          <strong>{copyLabel}</strong>
          <p><b>Invoice No:</b> {invoice.invoice_number}</p>
          <p><b>Date:</b> {formatDate(invoice.invoice_date, business.date_format)}</p>
          {invoice.terms && <p><b>Payment Terms:</b> {invoice.terms}</p>}
        </div>
      </header>

      <section className="invoice-template-parties">
        <div>
          <strong>BILL TO</strong>
          <b>{customer?.name || "—"}</b>
          {billingLines.map((line, i) => <span key={i}>{line}</span>)}
          {(invoice.gstin || customer?.gstin) && <span>GSTIN: {invoice.gstin || customer.gstin}</span>}
          {customerState && <span>State / Code: {customerState}</span>}
        </div>
        <div>
          <strong>SHIP TO</strong>
          {shippingLines.length > 0
            ? shippingLines.map((line, i) => <span key={i}>{line}</span>)
            : <span>Same as billing address</span>}
          <span>Place of Supply: {placeOfSupply || "—"}</span>
          <span>Reverse Charge: {invoice.gst_treatment === "rcm" ? "Yes" : "No"}</span>
        </div>
        <div>
          <strong>REFERENCES</strong>
          <span>Order No / Date: {[invoice.reference, invoice.order_date && formatDate(invoice.order_date, business.date_format)].filter(Boolean).join(" / ") || "—"}</span>
          <span>Challan No / Date: {[invoice.challan_number, invoice.challan_date && formatDate(invoice.challan_date, business.date_format)].filter(Boolean).join(" / ") || "—"}</span>
          <span>Delivery Note: {invoice.delivery_note || "—"}</span>
          <span>Dispatch Through: {dispatchThrough || "—"}</span>
          {invoice.eway_bill_number && <span>E-Way Bill No: {invoice.eway_bill_number}</span>}
        </div>
      </section>

      {invoice.subject && <p className="invoice-template-subject"><strong>Subject:</strong> {invoice.subject}</p>}

      <table className={`invoice-template-items invoice-tax-${taxMode}`}>
        <thead>
          <tr>
            <th>Sr</th><th>Description of Goods</th><th>HSN/SAC</th><th>Qty</th><th>Unit</th>
            <th>Rate ({symbol})</th><th>Taxable Value ({symbol})</th>
            {taxMode === "local" ? (
              <><th>CGST %</th><th>CGST Amt ({symbol})</th><th>SGST %</th><th>SGST Amt ({symbol})</th></>
            ) : taxMode === "interstate" ? (
              <><th>IGST %</th><th>IGST Amt ({symbol})</th></>
            ) : <><th>Tax %</th><th>Tax Amt ({symbol})</th></>}
          </tr>
        </thead>
        <tbody>
          {(() => {
            let itemNumber = 0;
            return lineItems.map((line) => {
              if (line.line_type === "header") {
                return <tr key={line.id} className="invoice-template-section"><td colSpan={taxMode === "local" ? 11 : 9}>{line.description}</td></tr>;
              }
              itemNumber += 1;
              const { heading, detail } = splitLineDescription(line);
              const rate = Number(line.tax_rate) || 0;
              const taxable = Math.max(0, Number(line.qty) * Number(line.rate) - Number(line.discount));
              const lineTax = invoice.gst_treatment === "none" ? 0 : (taxable * rate) / 100;
              const halfTax = lineTax / 2;
              return (
                <tr key={line.id}>
                  <td>{itemNumber}</td>
                  <td>
                    <strong>{heading}</strong>
                    {detail.map((part, idx) => <span className="invoice-template-description-detail" key={idx}>{part}</span>)}
                  </td>
                  <td>{line.hsn_sac_code || ""}</td>
                  <td>{formatQty(line.qty)}</td>
                  <td>{line.unit || ""}</td>
                  <td>{symbol}{formatMoney(line.rate)}</td>
                  <td>{symbol}{formatMoney(taxable)}</td>
                  {taxMode === "local" ? (
                    <><td>{formatRate(rate / 2)}%</td><td>{symbol}{formatMoney(halfTax)}</td><td>{formatRate(rate / 2)}%</td><td>{symbol}{formatMoney(halfTax)}</td></>
                  ) : (
                    <><td>{formatRate(rate)}%</td><td>{symbol}{formatMoney(lineTax)}</td></>
                  )}
                </tr>
              );
            });
          })()}
        </tbody>
      </table>

      <InvoiceTemplateFooter
        invoice={invoice} symbol={symbol} taxableValue={taxableValue}
        taxLines={taxLines} chargedTax={chargedTax}
      />
    </div>
  );
}
