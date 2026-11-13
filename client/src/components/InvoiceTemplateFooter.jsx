import { amountToWords } from "../lib/numberToWords";
import { formatMoney } from "../lib/format";

export default function InvoiceTemplateFooter({ invoice, symbol, taxableValue, taxLines, chargedTax }) {
  const { business } = invoice;
  const roundOff = Number(invoice.total) - taxableValue - chargedTax;
  const hasBankDetails = business.bank_account_name || business.bank_name || business.bank_account_number || business.bank_ifsc;

  return (
    <>
      <div className="invoice-template-summary">
        <div className="invoice-template-words">
          <strong>AMOUNT IN WORDS</strong>
          <span>{amountToWords(invoice.total, invoice.currency)}</span>
          {invoice.gst_treatment === "rcm" && <span className="invoice-template-note">Tax payable by recipient under reverse charge.</span>}
          {invoice.gst_treatment === "none" && <span className="invoice-template-note">No GST charged.</span>}
        </div>
        <div className="invoice-template-totals">
          <div><span>Total Taxable Value</span><span>{symbol}{formatMoney(taxableValue)}</span></div>
          {Number(invoice.discount) > 0 && (
            <div><span>Less: Discount</span><span>-{symbol}{formatMoney(invoice.discount)}</span></div>
          )}
          {taxLines.map((line) => (
            <div key={line.label}><span>{line.label}</span><span>{symbol}{formatMoney(line.amount)}</span></div>
          ))}
          <div><span>Round Off</span><span>{symbol}{formatMoney(roundOff)}</span></div>
          <div className="invoice-template-grand-total"><strong>TOTAL (incl. Tax)</strong><strong>{symbol}{formatMoney(invoice.total)}</strong></div>
        </div>
      </div>

      {invoice.notes && <div className="invoice-template-notes"><strong>Notes:</strong> {invoice.notes}</div>}
      {invoice.terms_and_conditions && (
        <div className="invoice-template-notes"><strong>Terms &amp; Conditions:</strong> {invoice.terms_and_conditions}</div>
      )}

      <div className="invoice-template-bank">
        {hasBankDetails && (
          <div>
            <strong>COMPANY&apos;S BANK DETAILS</strong>
            {business.bank_account_name && <p>Account Name: {business.bank_account_name}</p>}
            {business.bank_name && <p>Bank: {business.bank_name}</p>}
            {business.bank_account_number && <p>A/c No.: {business.bank_account_number}</p>}
            {business.bank_ifsc && <p>Branch &amp; IFSC: {business.bank_ifsc}</p>}
            {business.bank_upi_id && <p>UPI: {business.bank_upi_id}</p>}
          </div>
        )}
      </div>

      <div className="invoice-template-declaration">
        <strong>DECLARATION</strong>
        <p>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
      </div>

      <div className="invoice-template-signatures">
        <div className="invoice-template-receiver">
          <div className="invoice-template-signature-line" />
          <span>Receiver&apos;s Signature</span>
        </div>
        <div className="invoice-template-authorized">
          <strong>For {business.name}</strong>
          {business.signature_data_url
            ? <img src={business.signature_data_url} alt="Authorized signature" />
            : <div className="invoice-template-signature-line" />}
          <span>Authorized Signatory{business.signature_name ? ` — ${business.signature_name}` : ""}</span>
        </div>
      </div>
    </>
  );
}
