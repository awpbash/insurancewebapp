declare module "pdf2json" {
  export interface TextObject {
    T: string;
  }
  export interface TextLine {
    R: TextObject[];
  }
  export interface Page {
    Texts: TextLine[];
  }
  export interface Output {
    Pages: Page[];
  }
  class PDFParser {
    constructor(context?: any, verbosity?: number);
    on(event: "pdfParser_dataReady", callback: (data: Output) => void): void;
    on(event: "pdfParser_dataError", callback: (error: any) => void): void;
    parseBuffer(buffer: Buffer): void;
  }
  export default PDFParser;
}