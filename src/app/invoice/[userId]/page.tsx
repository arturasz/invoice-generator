"use client";
import { useEffect, useState } from "react";
import { meaningOfLife } from "../../../lib/meaning-of-life";
import { jsPDF } from "jspdf";
import { css } from "styled-components";

enum LINE {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  TABLE = "table",
}
type LINES = {
  lineType: LINE;
  value: string;
};
function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 250 / 3,
      align: "center",
      padding: 0,
    });
  }
  return result;
}

/* 210 x 297 */
class InvoiceBuilder {
  pdf = new jsPDF();
  lines: LINES[] = [];

  leftCurrentLine = 0;
  rightCurrentLine = 0;

  x = 10;
  rightX = 210 - this.x;
  constructor() {}
  render() {
    this.lines.forEach((line) => {
      const text = line.value;
      const offset = 10;
      let textType = line.lineType;
      let y = 10,
        x;

      console.log(textType);
      if (textType === LINE.LEFT) {
        this.leftCurrentLine += offset;
        y = this.leftCurrentLine;
        x = this.x;
        textType = LINE.LEFT;
      } else if (textType === LINE.RIGHT) {
        this.rightCurrentLine += offset;
        y = this.rightCurrentLine;
        x = this.rightX;
        textType = LINE.RIGHT;
      } else if (textType === LINE.CENTER) {
        this.leftCurrentLine += offset;
        this.rightCurrentLine = this.leftCurrentLine;
        y = this.leftCurrentLine;
        x = (this.x + this.rightX) / 2;
        textType = LINE.CENTER;
      } else {
        this.leftCurrentLine += offset;
        this.rightCurrentLine = this.leftCurrentLine;
        y = this.leftCurrentLine;
        x = this.x;
        console.log(x);
        textType = LINE.LEFT;
      }

      if (line.lineType !== LINE.TABLE) {
        this.pdf.text(text, x, y, { align: textType });
      } else {
        /* this.pdf.table(x, y, generateData(10), headers, { autoSize: true }); */
        console.log(x, y);

        const month = new Date().getMonth();
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        this.pdf.table(
          x,
          y,
          [
            {
              Services:
                "Consulting and engineering for month" + monthNames[month],
              Price: "1000",
              Amount: "1000",
            },
          ],
          createHeaders(["Services", "Price", "Amount"]),
          {},
        );
      }
    });
    return this.pdf;
  }

  addLine(line: string, order: LINE) {
    this.lines.push({ lineType: order, value: line });
    /* if (order === LINE.LEFT) {
     *   this.leftLines.push(line);
     * }
     * if (order === LINE.RIGHT) {
     *   this.rightLines.push(line);
     * }
     * if (order === LINE.CENTER) {
     *   this.rightLines.push(line);
     * } */
  }
}

export default function Invoice() {
  const [doc, setDoc] = useState();
  useEffect(() => {
    const invoiceBuilder = new InvoiceBuilder();
    // Default export is a4 paper, portrait, using millimeters for units
    invoiceBuilder.addLine("Artūras Zakrevskis", LINE.LEFT);
    invoiceBuilder.addLine("Lithuania", LINE.LEFT);
    invoiceBuilder.addLine("Recepient Name", LINE.RIGHT);
    invoiceBuilder.addLine("Recepient Address", LINE.RIGHT);

    invoiceBuilder.addLine(
      "Date " + new Date(Date.now()).toLocaleDateString("lt-LT"),
      LINE.CENTER,
    );

    invoiceBuilder.addLine("INVOICE", LINE.CENTER);
    invoiceBuilder.addLine("test", LINE.LEFT);
    invoiceBuilder.addLine("Services", LINE.TABLE);
    invoiceBuilder.addLine("", LINE.LEFT);
    invoiceBuilder.addLine("", LINE.LEFT);
    invoiceBuilder.addLine("", LINE.LEFT);
    invoiceBuilder.addLine("", LINE.LEFT);
    invoiceBuilder.addLine("IBAN", LINE.LEFT);

    setDoc(invoiceBuilder.render());
  }, []);
  return (
    <div>
      {meaningOfLife()}
      <iframe
        css={css`
          width: 100%;
          height: 500px;
        `}
        src={doc?.output("dataurl")}
      />
    </div>
  );
}
