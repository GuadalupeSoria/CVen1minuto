/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'pdfjs-dist' {
  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
  }

  export interface PDFPageProxy {
    getTextContent(): Promise<TextContent>;
  }

  export interface TextContent {
    items: TextItem[];
  }

  export interface TextItem {
    str: string;
    [key: string]: any;
  }

  export interface PDFWorkerOptions {
    workerSrc: string;
  }

  export const GlobalWorkerOptions: {
    workerSrc: string;
  };

  export function getDocument(src: { data: ArrayBuffer }): {
    promise: Promise<PDFDocumentProxy>;
  };
}

declare module 'pdfjs-dist/build/pdf.worker.mjs' {
  const worker: string;
  export default worker;
}
