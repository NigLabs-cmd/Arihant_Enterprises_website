// Email + PDF generation for sending invoices/quotes straight to a customer.
//
// Every self-hosted business brings its own SMTP account (a Gmail app password,
// a transactional-email provider, whatever they already use) — BillItUp never
// routes mail through a shared relay, since that would need per-business abuse
// controls and ongoing cost that doesn't fit a free, self-hosted tool.
//
// PDFs are drawn with pdfkit rather than a headless-browser screenshot of the
// print view, so self-hosting stays a single lightweight Docker image (no
// bundled Chromium).

import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";
import { amountToWords } from "./numberToWords.js";
import { printPrefix } from "./currency.js";
import { formatDate } from "./formatDate.js";

export class SmtpNotConfiguredError extends Error {
  constructor() {
    super("Email is not set up yet. Add SMTP settings in Business Settings first.");
    this.name = "SmtpNotConfiguredError";
  }
}

export function buildTransport(business) {
  if (!business.smtp_host || !business.smtp_user || !business.smtp_pass) {
    throw new SmtpNotConfiguredError();
  }
  return nodemailer.createTransport({
    host: business.smtp_host,
    port: business.smtp_port || 587,
    secure: !!business.smtp_secure,
    auth: { user: business.smtp_user, pass: business.smtp_pass },
  });
}

function dataUrlToBuffer(dataUrl) {
  const match = /^data:image\/\w+;base64,(.+)$/.exec(dataUrl || "");
  return match ? Buffer.from(match[1], "base64") : null;
}

// Same shape as the client's formatAddressLines (client/src/lib/format.js),
// kept as its own copy since server and client don't share a lib folder,
// turning a Billing or Shipping address's Street 1/Street 2/City/State/Pin
// Code/Country fields (2026-09-22) into the printed lines for this PDF's
// party block.
// Splits one line item into its printed heading and the lines under it
// (2026-10-07). A line that has a saved item_name prints that name as the
// heading with the whole description beneath it as plain text (the name is
// not repeated if the description already starts with it). A line from before
// item names were saved keeps the old behaviour: the first line of the
// description is the heading.
function lineHeadingAndDetail(line) {
  const name = String(line.item_name || "").trim();
  const parts = String(line.description || "").split("\n").map((s) => s.trim()).filter(Boolean);
  if (name) {
    const rest = parts.length > 0 && parts[0].toLowerCase() === name.toLowerCase() ? parts.slice(1) : parts;
    return { heading: name, detail: rest };
  }
  return { heading: parts[0] || "", detail: parts.slice(1) };
}

function formatAddressLines({ line1, line2, city, state, pincode, country } = {}) {
  const cityStatePin = [city, state].filter(Boolean).join(", ") + (pincode ? ` - ${pincode}` : "");
  return [line1, line2, cityStatePin || null, country && country !== "India" ? country : null].filter(Boolean);
}

function renderInvoicePdf({ docNumber, docDate, business, party, lineItems, totals, notes, termsAndConditions }) {
  const prefix = printPrefix(totals.currency);
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 30 });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const left = 30, width = 535, bottom = 812, signatureY = 748;
    const ink = "#26364a", muted = "#4b5563", border = "#8a96a5";
    const formatAmount = (value) => `${prefix} ${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const stateCodes = {
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
    const stateCode = (state, gstin) => {
      const code = String(gstin || "").slice(0, 2) || stateCodes[state] || "";
      return state ? `${state}${code ? ` (${code})` : ""}` : "";
    };
    const date = (value) => value ? formatDate(value, business.date_format) : "";
    const sameState = Boolean(business.state && party?.state && business.state === party.state);
    const taxMode = totals.gst_treatment === "none" ? "none" : sameState ? "local" : "interstate";
    const localTax = taxMode === "local";
    const tableColumns = localTax
      ? [
          ["Sr", 24], ["Description of Goods", 130], ["HSN/SAC", 40], ["Qty", 34], ["Unit", 25],
          [`Rate (${prefix})`, 48], [`Taxable Value (${prefix})`, 67], ["CGST %", 32],
          [`CGST Amt (${prefix})`, 50], ["SGST %", 32], [`SGST Amt (${prefix})`, 50],
        ]
      : [
          ["Sr", 24], ["Description of Goods", 170], ["HSN/SAC", 43], ["Qty", 38], ["Unit", 30],
          [`Rate (${prefix})`, 55], [`Taxable Value (${prefix})`, 75], [taxMode === "none" ? "Tax %" : "IGST %", 48],
          [`${taxMode === "none" ? "Tax" : "IGST"} Amt (${prefix})`, 52],
        ];
    const tableWidth = tableColumns.reduce((sum, [, colWidth]) => sum + colWidth, 0);
    const textAt = (text, x, y, w, size = 8, options = {}) => {
      doc.font(options.bold ? "Helvetica-Bold" : "Helvetica").fontSize(size).fillColor(options.color || "#111");
      doc.text(String(text ?? ""), x, y, { width: w, align: options.align || "left", lineGap: 1 });
      return doc.heightOfString(String(text ?? ""), { width: w, font: options.bold ? "Helvetica-Bold" : "Helvetica", fontSize: size, lineGap: 1 });
    };
    let y = 30;

    const drawHeader = (continued = false) => {
      const top = y;
      let leftY = top;
      const logo = dataUrlToBuffer(business.logo_data_url);
      if (logo) {
        try { doc.image(logo, left, top, { fit: [130, 42] }); leftY += 48; } catch { /* skip unsupported logo image */ }
      }
      leftY += textAt(business.name || "Business", left, leftY, 300, 15, { bold: true, color: ink }) + 3;
      for (const line of [
        [business.address, business.pincode].filter(Boolean).join(", "),
        business.gstin && `GSTIN: ${business.gstin}${business.state ? `  |  State: ${stateCode(business.state, business.gstin)}` : ""}`,
        business.phone && `Ph: ${business.phone}`,
        business.email && `E-mail: ${business.email}`,
      ].filter(Boolean)) {
        leftY += textAt(line, left, leftY, 315, 8, { color: muted }) + 2;
      }
      let rightY = top;
      rightY += textAt("TAX INVOICE", 365, rightY, 200, 15, { bold: true, align: "right", color: ink }) + 1;
      rightY += textAt(continued ? "CONTINUED" : "ORIGINAL FOR RECIPIENT", 365, rightY, 200, 7, { bold: true, align: "right", color: muted }) + 6;
      for (const line of [
        `Invoice No: ${docNumber}`,
        `Date: ${docDate}`,
        totals.terms ? `Payment Terms: ${totals.terms}` : null,
      ].filter(Boolean)) rightY += textAt(line, 365, rightY, 200, 8, { align: "right" }) + 3;
      y = Math.max(leftY, rightY) + 8;
      doc.moveTo(left, y).lineTo(left + width, y).strokeColor(ink).stroke();
      y += 8;
    };

    const drawParties = () => {
      const columns = [
        { title: "BILL TO", x: left, w: 175 },
        { title: "SHIP TO", x: left + 178, w: 175 },
        { title: "REFERENCES", x: left + 356, w: 179 },
      ];
      const billing = formatAddressLines({
        line1: party?.billing_address, line2: party?.billing_address_line2,
        city: party?.billing_city, state: party?.state, pincode: party?.pincode, country: party?.country,
      });
      const shipping = formatAddressLines({
        line1: party?.shipping_address, line2: party?.shipping_address_line2,
        city: party?.shipping_city, state: party?.shipping_state,
        pincode: party?.shipping_pincode, country: party?.shipping_country,
      });
      const partyState = stateCode(party?.state, totals.gstin || party?.gstin);
      const placeOfSupply = stateCode(party?.shipping_state || party?.state, totals.gstin || party?.gstin);
      const referenceLines = [
        `Order No / Date: ${[totals.reference, date(totals.order_date)].filter(Boolean).join(" / ") || "—"}`,
        `Challan No / Date: ${[totals.challan_number, date(totals.challan_date)].filter(Boolean).join(" / ") || "—"}`,
        `Delivery Note: ${totals.delivery_note || "—"}`,
        `Dispatch Through: ${[totals.dispatch_through || totals.eway_transporter_name, totals.eway_vehicle_number].filter(Boolean).join(" / ") || "—"}`,
        totals.eway_bill_number ? `E-Way Bill No: ${totals.eway_bill_number}` : null,
      ].filter(Boolean);
      const rows = [
        [party?.name || "—", ...billing, (totals.gstin || party?.gstin) ? `GSTIN: ${totals.gstin || party.gstin}` : null, partyState ? `State / Code: ${partyState}` : null].filter(Boolean),
        [...(shipping.length ? shipping : ["Same as billing address"]), `Place of Supply: ${placeOfSupply || "—"}`, `Reverse Charge: ${totals.gst_treatment === "rcm" ? "Yes" : "No"}`],
        referenceLines,
      ];
      const top = y, contentTop = top + 20;
      const heights = rows.map((lines, index) => {
        const col = columns[index];
        let cy = contentTop;
        textAt(col.title, col.x + 6, top + 6, col.w - 12, 8, { bold: true, color: ink });
        for (const line of lines) cy += textAt(line, col.x + 6, cy, col.w - 12, 7, { bold: index === 0 && line === rows[0][0] }) + 2;
        return cy + 6 - top;
      });
      const height = Math.max(...heights, 54);
      doc.rect(left, top, width, height).strokeColor(border).stroke();
      doc.moveTo(left + 178, top).lineTo(left + 178, top + height).strokeColor(border).stroke();
      doc.moveTo(left + 356, top).lineTo(left + 356, top + height).strokeColor(border).stroke();
      y += height + 8;
    };

    const drawTableHeader = () => {
      const headerHeight = 30;
      doc.rect(left, y, tableWidth, headerHeight).fill(ink);
      let x = left;
      for (const [label, colWidth] of tableColumns) {
        textAt(label, x + 2, y + 4, colWidth - 4, 6, { bold: true, color: "#fff", align: "center" });
        x += colWidth;
      }
      y += headerHeight;
    };

    const drawContinuation = () => {
      doc.addPage();
      y = 30;
      textAt(`TAX INVOICE ${docNumber} — CONTINUED`, left, y, width, 9, { bold: true, color: ink });
      y += 20;
      drawTableHeader();
    };

    drawHeader();
    drawParties();
    let itemNumber = 0;
    drawTableHeader();
    for (const line of lineItems) {
      if (line.line_type === "header") {
        const height = 18;
        if (y + height > bottom - 180) drawContinuation();
        doc.rect(left, y, tableWidth, height).fillAndStroke("#e7edf3", border);
        textAt(line.description || "", left + 4, y + 4, tableWidth - 8, 7, { bold: true });
        y += height;
        continue;
      }
      itemNumber += 1;
      const { heading, detail } = lineHeadingAndDetail(line);
      const base = Math.max(0, Number(line.qty) * Number(line.rate) - Number(line.discount));
      const rate = Number(line.tax_rate) || 0;
      const lineTax = totals.gst_treatment === "none" ? 0 : (base * rate) / 100;
      const cells = localTax
        ? [String(itemNumber), [heading, ...detail].filter(Boolean).join("\n"), line.hsn_sac_code || "", String(line.qty), line.unit || "", formatAmount(line.rate), formatAmount(base), `${rate / 2}%`, formatAmount(lineTax / 2), `${rate / 2}%`, formatAmount(lineTax / 2)]
        : [String(itemNumber), [heading, ...detail].filter(Boolean).join("\n"), line.hsn_sac_code || "", String(line.qty), line.unit || "", formatAmount(line.rate), formatAmount(base), `${rate}%`, formatAmount(lineTax)];
      const descWidth = tableColumns[1][1] - 8;
      doc.font("Helvetica-Bold").fontSize(6.5);
      const descHeight = doc.heightOfString(cells[1], { width: descWidth, lineGap: 1 });
      const height = Math.max(20, descHeight + 8);
      if (y + height > bottom - 180) drawContinuation();
      let x = left;
      const rowY = y;
      for (let i = 0; i < tableColumns.length; i++) {
        const colWidth = tableColumns[i][1];
        doc.rect(x, rowY, colWidth, height).strokeColor(border).stroke();
        textAt(cells[i], x + 3, rowY + 4, colWidth - 6, 6.5, { align: i === 1 ? "left" : "center", bold: i === 1 });
        x += colWidth;
      }
      y += height;
    }

    const groups = new Map();
    for (const line of lineItems) {
      if (line.line_type === "header") continue;
      const rate = Number(line.tax_rate) || 0;
      if (!rate) continue;
      const base = Math.max(0, Number(line.qty) * Number(line.rate) - Number(line.discount));
      groups.set(rate, (groups.get(rate) || 0) + (base * rate) / 100);
    }
    const gstLines = totals.gst_treatment === "none" ? [] : [...groups.entries()].sort(([a], [b]) => a - b).flatMap(([rate, amount]) => (
      localTax
        ? [[`Add: CGST @ ${rate / 2}%`, amount / 2], [`Add: SGST @ ${rate / 2}%`, amount / 2]]
        : [[`Add: IGST @ ${rate}%`, amount]]
    ));
    const taxable = Number(totals.sub_total || 0) - Number(totals.discount || 0);
    const chargedTax = totals.gst_treatment === "gst" ? Number(totals.tax_total || 0) : 0;
    const totalRows = [
      ["Total Taxable Value", taxable],
      ...(Number(totals.discount) > 0 ? [["Less: Discount", -Number(totals.discount)]] : []),
      ...gstLines,
      ...(totals.gst_treatment === "none" ? [["GST", 0]] : []),
      ["Round Off", Number(totals.total) - taxable - chargedTax],
      ["TOTAL (incl. Tax)", Number(totals.total)],
    ];
    const hasBankDetails = business.bank_account_name || business.bank_name || business.bank_account_number || business.bank_ifsc || business.bank_upi_id;
    const bankLines = [
      business.bank_account_name && `Account Name: ${business.bank_account_name}`,
      business.bank_name && `Bank: ${business.bank_name}`,
      business.bank_account_number && `A/c No.: ${business.bank_account_number}`,
      business.bank_ifsc && `Branch & IFSC: ${business.bank_ifsc}`,
      business.bank_upi_id && `UPI: ${business.bank_upi_id}`,
    ].filter(Boolean);
    const extraText = [notes, termsAndConditions ?? business.terms_and_conditions].filter(Boolean);
    const footerHeight = Math.max(totalRows.length * 17, 72 + (hasBankDetails ? (bankLines.length + 1) * 11 : 0))
      + extraText.reduce((sum, text) => sum + doc.heightOfString(String(text), { width: 245, fontSize: 7 }) + 8, 0)
      + 55;
    if (y + 10 + footerHeight > signatureY - 12) {
      doc.addPage();
      y = 36;
    } else {
      y += 9;
    }

    const summaryTop = y;
    const summaryWidth = 265;
    const words = amountToWords(totals.total, totals.currency);
    textAt("AMOUNT IN WORDS", left + 5, summaryTop + 5, summaryWidth - 10, 7, { bold: true, color: ink });
    let leftY = summaryTop + 18;
    leftY += textAt(words, left + 5, leftY, summaryWidth - 10, 8) + 6;
    if (totals.gst_treatment === "rcm") {
      leftY += textAt("Tax payable by recipient under reverse charge.", left + 5, leftY, summaryWidth - 10, 7, { color: muted }) + 5;
    } else if (totals.gst_treatment === "none") {
      leftY += textAt("No GST charged.", left + 5, leftY, summaryWidth - 10, 7, { color: muted }) + 5;
    }
    if (hasBankDetails) {
      leftY += textAt("COMPANY'S BANK DETAILS", left + 5, leftY, summaryWidth - 10, 7, { bold: true, color: ink }) + 4;
      for (const line of bankLines) leftY += textAt(line, left + 5, leftY, summaryWidth - 10, 7) + 2;
    }
    doc.rect(left, summaryTop, summaryWidth, leftY - summaryTop + 5).strokeColor(border).stroke();

    const totalX = left + 275, totalWidth = width - 275;
    let totalY = summaryTop;
    for (const [label, amount] of totalRows) {
      const rowHeight = label.startsWith("TOTAL") ? 21 : 17;
      doc.rect(totalX, totalY, totalWidth, rowHeight).fillAndStroke(label.startsWith("TOTAL") ? "#e8edf2" : "#fff", border);
      textAt(label, totalX + 5, totalY + 4, 135, label.startsWith("TOTAL") ? 8 : 7, { bold: label.startsWith("TOTAL") });
      textAt(formatAmount(amount), totalX + 140, totalY + 4, totalWidth - 145, label.startsWith("TOTAL") ? 8 : 7, { bold: label.startsWith("TOTAL"), align: "right" });
      totalY += rowHeight;
    }
    y = Math.max(leftY + 5, totalY) + 8;

    for (const text of extraText) {
      const heading = text === notes ? "Notes" : "Terms & Conditions";
      y += textAt(`${heading}: ${text}`, left, y, width, 7, { color: muted }) + 5;
    }
    const declarationHeight = 37;
    doc.rect(left, y, width, declarationHeight).strokeColor(border).stroke();
    textAt("DECLARATION", left + 5, y + 4, width - 10, 7, { bold: true, color: ink });
    textAt("We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.", left + 5, y + 16, width - 10, 7);
    y += declarationHeight + 6;

    const lineY = signatureY + 42;
    doc.moveTo(left + 4, lineY).lineTo(left + 180, lineY).strokeColor(ink).stroke();
    textAt("Receiver's Signature", left + 4, lineY + 4, 180, 7);
    const sigX = left + width - 180;
    textAt(`For ${business.name || "Business"}`, sigX, signatureY, 180, 8, { bold: true, align: "right" });
    const signatureBuffer = dataUrlToBuffer(business.signature_data_url);
    if (signatureBuffer) {
      try { doc.image(signatureBuffer, sigX + 20, signatureY + 8, { fit: [140, 26] }); } catch { /* skip unsupported signature image */ }
    }
    doc.moveTo(sigX + 5, lineY).lineTo(sigX + 180, lineY).strokeColor(ink).stroke();
    textAt(`Authorized Signatory${business.signature_name ? ` — ${business.signature_name}` : ""}`, sigX, lineY + 4, 180, 7, { align: "right" });

    doc.end();
  });
}

// Renders a document (invoice, quote, or credit note all share the same
// shape: branding header/parties/line-items/totals/footer) into a PDF
// buffer, mirroring the on-screen print layout as closely as pdfkit allows.
export function renderDocumentPdf({ docLabel, docNumber, docDate, extraMeta = [], business, party, partyLabel, lineItems, totals, notes, headlineLabel = "Total", headlineValue, upiQrPngBuffer, termsAndConditions }) {
  if (docLabel === "Invoice") {
    return renderInvoicePdf({ docNumber, docDate, business, party, lineItems, totals, notes, termsAndConditions });
  }
  // Which text prefix stands in for a currency symbol on this document — see
  // lib/currency.js for why this is always plain ASCII text, never a ₹/€/£
  // glyph (2026-09-16). totals.currency is the invoice's own currency
  // (defaults to INR for every document type that doesn't set one yet).
  const prefix = printPrefix(totals.currency);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const headerTop = doc.y;
    let logoBottom = headerTop;
    const logoBuffer = dataUrlToBuffer(business.logo_data_url);
    if (logoBuffer) {
      try {
        doc.image(logoBuffer, 40, headerTop, { fit: [140, 50] });
        logoBottom = headerTop + 55;
      } catch {
        // Unsupported image format (pdfkit only handles PNG/JPEG) — skip the
        // logo rather than fail the whole document.
        logoBottom = headerTop;
      }
    }

    doc.fontSize(16).text(business.name || "Business", 40, logoBottom);
    doc.fontSize(9).fillColor("#555");
    if (business.address) doc.text(business.address, 40);
    if (business.phone) doc.text(business.phone, 40);
    if (business.email) doc.text(business.email, 40);
    if (business.gstin) doc.text(`GSTIN: ${business.gstin}`, 40);
    doc.fillColor("#000");
    const leftBottom = doc.y;

    doc.fontSize(14).text(`${docLabel} #${docNumber}`, 350, headerTop, { width: 205, align: "right" });
    doc.fontSize(9).fillColor("#555").text(`Date: ${docDate}`, 350, doc.y, { width: 205, align: "right" });
    for (const line of extraMeta) doc.text(line, 350, doc.y, { width: 205, align: "right" });
    if (headlineValue) {
      doc.fontSize(10).fillColor("#555").text(headlineLabel, 350, doc.y + 6, { width: 205, align: "right" });
      doc.fontSize(16).fillColor("#000").text(headlineValue, 350, doc.y, { width: 205, align: "right" });
    }
    doc.fillColor("#000");

    doc.y = Math.max(leftBottom, doc.y) + 20;

    doc.fontSize(10).text(partyLabel, 40, doc.y, { underline: true });
    doc.text(party?.name || "—");
    const billingLines = formatAddressLines({
      line1: party?.billing_address, line2: party?.billing_address_line2,
      city: party?.billing_city, state: party?.state,
      pincode: party?.pincode, country: party?.country,
    });
    for (const line of billingLines) doc.text(line);

    // Ship To only on an actual Invoice (matching the on-screen view,
    // 2026-09-22). Quotes, Credit Notes and Receipts have no goods-movement
    // concept of their own to ship anything against, and only prints when
    // the customer actually has a shipping address on file.
    if (docLabel === "Invoice") {
      const shippingLines = formatAddressLines({
        line1: party?.shipping_address, line2: party?.shipping_address_line2,
        city: party?.shipping_city, state: party?.shipping_state,
        pincode: party?.shipping_pincode, country: party?.shipping_country,
      });
      if (shippingLines.length > 0) {
        doc.moveDown(0.5);
        doc.fontSize(9).fillColor("#555").text("Ship To", 40, doc.y);
        doc.fontSize(10).fillColor("#000");
        for (const line of shippingLines) doc.text(line);
      }
    }
    doc.moveDown(1);

    // Older invoices (and every Quote/Credit Note/Receipt, which never carry
    // these two per-line fields at all) simply won't have hsn_sac_code on any
    // line — the extra column only appears once there's real data for it, so
    // this stays the shared renderer for every document type without any of
    // them needing their own copy of this table (2026-09-17).
    const showHsn = lineItems.some((l) => l.hsn_sac_code);
    // Zoho's own printed invoices leave the Discount column off entirely once
    // a business never uses it, rather than a column of "0.00"s on every
    // line. Already applied to the on-screen/browser-printed view
    // (FullInvoice.jsx / QuoteView.jsx / CreditNoteView.jsx, 2026-09-21), but
    // never carried over to this renderer, so the actual emailed/downloaded
    // PDF kept showing it unconditionally, found 2026-09-22 comparing the
    // two. Columns are now built from one filtered list instead of two
    // hand-written variants, so a third toggle later won't need its own
    // combinatorial branch.
    const showDiscount = lineItems.some((l) => Number(l.discount) > 0);
    const columns = [
      { header: "#", width: showHsn ? 30 : 40 },
      { header: "Description", width: showHsn ? 160 : 220 },
      ...(showHsn ? [{ header: "HSN/SAC", width: 70 }] : []),
      { header: "Qty", width: 60 },
      { header: "Rate", width: 80 },
      ...(showDiscount ? [{ header: "Discount", width: 80 }] : []),
      { header: "Amount", width: 80 },
    ];
    const tableTop = doc.y;
    doc.rect(40, tableTop, 520, 20).fill("#2b2f38");
    const cols = columns.map((c) => c.width);
    const headers = columns.map((c) => c.header);
    let x = 40;
    doc.fillColor("#fff").fontSize(9);
    headers.forEach((h, i) => { doc.text(h, x + 4, tableTop + 6, { width: cols[i] - 4 }); x += cols[i]; });
    doc.fillColor("#000");

    let y = tableTop + 26;
    // A running count of real, billable lines only. A section header (see
    // db.js's line_type comment) never gets its own number, the same way
    // Zoho's own printed documents leave a header row out of the numbering
    // (2026-09-21).
    let itemNumber = 0;
    lineItems.forEach((line) => {
      if (line.line_type === "header") {
        // Printed as a plain shaded band across the full table width, with
        // just its own label, rather than another row of columns with
        // nothing in most of them.
        doc.rect(40, y, 520, 18).fill("#eef0f3");
        doc.fillColor("#000").font("Helvetica-Bold").fontSize(9).text(line.description || "", 44, y + 5, { width: 512 });
        doc.font("Helvetica");
        y += 20;
        return;
      }
      itemNumber += 1;
      x = 40;
      // Qty prints as a plain number, unit was never meant to read as part
      // of the number itself ("3.00 job" as clutter next to it, especially
      // for a service line, 2026-09-22).
      const otherCells = [
        ...(showHsn ? [line.hsn_sac_code || ""] : []),
        String(line.qty),
        `${prefix} ${Number(line.rate).toFixed(2)}`,
        ...(showDiscount ? [`${prefix} ${Number(line.discount).toFixed(2)}`] : []),
        `${prefix} ${Number(line.amount).toFixed(2)}`,
      ];
      // The item name prints as the bold heading and the description sits
      // below it as plain, smaller text, so a long multi line description is
      // never bolded or squeezed into the fixed row height this table used to
      // have (2026-10-07). The row grows to fit whatever the description needs.
      const { heading, detail } = lineHeadingAndDetail(line);
      const descWidth = cols[1] - 4;
      const detailText = detail.join("\n");
      doc.font("Helvetica-Bold").fontSize(9);
      const headingHeight = heading ? doc.heightOfString(heading, { width: descWidth }) : 0;
      doc.font("Helvetica").fontSize(8);
      const detailHeight = detailText ? doc.heightOfString(detailText, { width: descWidth }) : 0;
      const rowHeight = Math.max(18, headingHeight + detailHeight + (detailText ? 3 : 0) + 8);
      if (y + rowHeight > 780) {
        doc.addPage();
        y = 40;
      }
      doc.font("Helvetica").fontSize(9).fillColor("#000").text(String(itemNumber), x, y, { width: cols[0] });
      x += cols[0];
      doc.font("Helvetica-Bold").fontSize(9).text(heading, x, y, { width: descWidth });
      if (detailText) {
        doc.font("Helvetica").fontSize(8).fillColor("#555").text(detailText, x, y + headingHeight + 3, { width: descWidth });
      }
      doc.fillColor("#000").font("Helvetica");
      x += cols[1];
      otherCells.forEach((cell, ci) => {
        doc.fontSize(9).text(cell, x, y, { width: cols[ci + 2] });
        x += cols[ci + 2];
      });
      y += rowHeight;
    });

    doc.moveTo(40, y + 4).lineTo(560, y + 4).strokeColor("#ddd").stroke();
    y += 14;
    const taxSuffix = totals.gst_treatment === "rcm" ? " (reverse charge)" : "";
    const cgst = Number(totals.cgst) || 0, sgst = Number(totals.sgst) || 0, igst = Number(totals.igst) || 0;
    const taxLines = (cgst || sgst || igst)
      ? [
          ...(cgst ? [[`CGST${taxSuffix}`, cgst]] : []),
          ...(sgst ? [[`SGST${taxSuffix}`, sgst]] : []),
          ...(igst ? [[`IGST${taxSuffix}`, igst]] : []),
        ]
      : [[`Tax${taxSuffix}`, totals.tax_total]];
    const totalLines = [
      ["Sub Total", totals.sub_total],
      ["Discount", -totals.discount],
      ...taxLines,
      ["Total", totals.total],
    ];
    totalLines.forEach(([label, val]) => {
      doc.fontSize(label === "Total" ? 11 : 9).text(label, 380, y, { width: 100 });
      doc.text(`${prefix} ${Number(val).toFixed(2)}`, 480, y, { width: 80, align: "right" });
      y += 16;
    });

    doc.y = y + 10;
    if (totals.gst_treatment === "rcm") {
      doc.fontSize(8).fillColor("#555").text(
        "Tax payable on reverse charge basis: Yes. GST shown above is payable by the recipient directly to the government and is not included in the total.",
        40, doc.y, { width: 500 }
      );
      doc.moveDown(0.5);
    } else if (totals.gst_treatment === "none") {
      doc.fontSize(8).fillColor("#555").text("No GST charged on this document.", 40, doc.y);
      doc.moveDown(0.5);
    }
    doc.fontSize(9).fillColor("#555").text(`Total In Words: ${amountToWords(totals.total, totals.currency)}`, 40, doc.y);
    doc.fillColor("#000");

    if (notes) {
      doc.moveDown(1);
      doc.fontSize(9).fillColor("#555").text(notes);
      doc.fillColor("#000");
    }

    if (totals.eway_bill_number || totals.eway_transporter_name || totals.eway_vehicle_number) {
      doc.moveDown(1);
      doc.fontSize(9).fillColor("#000").text("E-Way Bill", { underline: true });
      doc.fontSize(9).fillColor("#555");
      if (totals.eway_bill_number) doc.text(`E-Way Bill No: ${totals.eway_bill_number}`);
      if (totals.eway_transporter_name) {
        doc.text(`Transporter: ${totals.eway_transporter_name}${totals.eway_transporter_id ? ` (${totals.eway_transporter_id})` : ""}`);
      }
      if (totals.eway_vehicle_number) doc.text(`Vehicle Number: ${totals.eway_vehicle_number}`);
      if (totals.eway_distance_km) doc.text(`Distance: ${totals.eway_distance_km} km`);
      doc.fillColor("#000");
    }

    // Milestone/project progress (2026-09-16) — only shown once a business
    // has actually named a project on this invoice (see lib/projectProgress.js
    // for how billed-to-date is worked out). project_total_amount is
    // optional even then, since a business might just want to label a
    // milestone without tracking against a fixed project value.
    if (totals.project_name) {
      doc.moveDown(1);
      doc.fontSize(9).fillColor("#000").text("Project / Milestone Billing", { underline: true });
      doc.fontSize(9).fillColor("#555");
      doc.text(`Project: ${totals.project_name}${totals.milestone_label ? ` — ${totals.milestone_label}` : ""}`);
      if (totals.project_total_amount) {
        doc.text(
          `Project Total: ${prefix} ${Number(totals.project_total_amount).toFixed(2)}   ·   Billed To Date: ${prefix} ${Number(totals.project_billed_to_date || 0).toFixed(2)}   ·   Remaining: ${prefix} ${Number(totals.project_remaining || 0).toFixed(2)}`
        );
      }
      doc.fillColor("#000");
    }

    const hasBankDetails = business.bank_account_name || business.bank_account_number || business.bank_ifsc || business.bank_upi_id;
    if (hasBankDetails) {
      doc.moveDown(1.5);
      const bankBlockTop = doc.y;
      doc.fontSize(9).fillColor("#000");
      if (business.bank_account_name) doc.text(`Account Name: ${business.bank_account_name}`);
      if (business.bank_name) doc.text(`Bank: ${business.bank_name}`);
      if (business.bank_account_number) doc.text(`Account Number: ${business.bank_account_number}`);
      if (business.bank_ifsc) doc.text(`IFSC Code: ${business.bank_ifsc}`);
      if (business.bank_upi_id) doc.text(`UPI: ${business.bank_upi_id}`);
      const textBottom = doc.y;

      // The QR sits beside the bank text, not below it — drawn at a fixed
      // position so it never disturbs pdfkit's own text flow, then doc.y is
      // pushed past whichever of the two ran taller so Terms/signature below
      // never overlaps it.
      if (upiQrPngBuffer) {
        try {
          doc.image(upiQrPngBuffer, 450, bankBlockTop, { fit: [90, 90] });
          doc.fontSize(7).fillColor("#555").text("Scan to pay via UPI", 440, bankBlockTop + 92, { width: 110, align: "center" });
          doc.fillColor("#000");
          doc.y = Math.max(textBottom, bankBlockTop + 106);
        } catch {
          // Shouldn't happen (qrcode always produces a valid PNG buffer), but
          // never let a QR-drawing hiccup take down the whole PDF.
        }
      }
    }

    // The document's own snapshotted Terms & Conditions (from whichever
    // saved template applied when it was created) takes priority; a document
    // from before this existed falls back to the business's old single
    // terms_and_conditions field, matching DocumentFooter.jsx (2026-09-16).
    const terms = termsAndConditions ?? business.terms_and_conditions;
    if (terms) {
      doc.moveDown(1);
      doc.fontSize(10).text("Terms & Conditions", { underline: true });
      doc.fontSize(8).fillColor("#555").text(terms);
      doc.fillColor("#000");
    }

    if (business.signature_data_url || business.signature_name) {
      doc.moveDown(2);
      const sigTop = doc.y;
      const sigX = 400;
      const sigBuffer = dataUrlToBuffer(business.signature_data_url);
      let lineY = sigTop + 20;
      let imageDrawn = false;
      if (sigBuffer) {
        try { doc.image(sigBuffer, sigX, sigTop, { fit: [140, 40] }); lineY = sigTop + 44; imageDrawn = true; } catch { /* skip unsupported image */ }
      }
      if (!imageDrawn) {
        doc.moveTo(sigX, lineY).lineTo(sigX + 140, lineY).strokeColor("#000").stroke();
      }
      doc.fontSize(9).text(`Authorized Signature${business.signature_name ? ` — ${business.signature_name}` : ""}`, sigX, lineY + 6, { width: 160 });
    }

    doc.end();
  });
}

export async function sendDocumentEmail({ business, to, subject, text, html, pdfBuffer, pdfFilename }) {
  const transport = buildTransport(business);
  const fromEmail = business.smtp_from_email || business.smtp_user;
  const fromName = business.smtp_from_name || business.name || "TradeLedger";
  await transport.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject,
    text,
    ...(html ? { html } : {}),
    attachments: [{ filename: pdfFilename, content: pdfBuffer }],
  });
}

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

// A clean, branded HTML version of the email — sent alongside the plain
// `text` above (most mail clients prefer html when both are present, and
// text is the fallback for the ones that don't). summaryRows is a list of
// [label, value] pairs (invoice number, amount, balance due, due date —
// whichever apply) rendered as a small table; ctaUrl is only passed for
// invoices, which have a public shareable link — quotes and credit notes
// don't, so they render without a button (2026-09-15).
export function renderEmailHtml({ business, bodyText, ctaLabel, ctaUrl, summaryRows = [] }) {
  const brandName = escapeHtml(business.name || "TradeLedger");
  const headerInner = business.logo_data_url
    ? `<img src="${business.logo_data_url}" alt="${brandName}" style="max-height:40px;max-width:180px;display:block;" />`
    : `<span style="color:#ffffff;font-size:18px;font-weight:700;font-family:Arial,Helvetica,sans-serif;">${brandName}</span>`;

  const summaryHtml = summaryRows.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 22px;border:1px solid #e2e5ea;border-radius:8px;overflow:hidden;">
        ${summaryRows.map(([label, value], i) => `
          <tr style="background:${i % 2 === 0 ? "#f7f8fa" : "#ffffff"};">
            <td style="padding:9px 14px;font-size:12px;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(label)}</td>
            <td style="padding:9px 14px;font-size:13px;color:#1c1f26;text-align:right;font-weight:600;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(value)}</td>
          </tr>`).join("")}
      </table>`
    : "";

  const ctaHtml = ctaUrl
    ? `<div style="margin-top:4px;"><a href="${ctaUrl}" style="display:inline-block;background:#1a7f5a;color:#ffffff;text-decoration:none;padding:11px 24px;border-radius:6px;font-size:13px;font-weight:700;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(ctaLabel || "View Document")}</a></div>`
    : "";

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f7f8fa;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e2e5ea;">
          <tr><td style="background:#0a2c50;padding:20px 28px;">${headerInner}</td></tr>
          <tr><td style="padding:28px;">
            <p style="margin:0 0 18px;font-size:14px;line-height:1.7;color:#1c1f26;white-space:pre-wrap;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(bodyText)}</p>
            ${summaryHtml}
            ${ctaHtml}
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}
