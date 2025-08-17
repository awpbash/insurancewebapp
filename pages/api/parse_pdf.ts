// pages/api/parse_pdf.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable'; // Correct import: import IncomingForm directly
import { parsePdf } from './lib/pdf-utils';
import fs from 'fs';

// This is crucial for the Pages Router. It disables the default body parser
// so that 'formidable' can handle the file upload stream.
export const config = {
    api: {
        bodyParser: false,
    },
};

// The Pages Router uses a single default export function for its API routes.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // We only want to handle POST requests for file uploads.
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Create a new instance of formidable.IncomingForm to parse the request.
        const form = new IncomingForm();
        
        // Use the new form.parse method to get fields and files
        const [fields, files] = await form.parse(req);

        // Access the uploaded file. The key 'file' corresponds to the name attribute in your client-side FormData.
        const uploadedFile = files.file?.[0];

        if (!uploadedFile) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        // Validate the file type and size to prevent processing malicious or oversized files.
        const contentType = uploadedFile.mimetype || '';
        if (!/pdf/i.test(contentType) && !uploadedFile.originalFilename?.toLowerCase().endsWith('.pdf')) {
            return res.status(400).json({ error: 'Uploaded file must be a PDF.' });
        }

        const MAX_BYTES = 10 * 1024 * 1024;
        if (typeof uploadedFile.size === 'number' && uploadedFile.size > MAX_BYTES) {
            return res.status(413).json({ error: 'PDF too large. Max 10 MB.' });
        }

        // Read the temporary file created by formidable into a Node Buffer for parsing.
        const fileBuffer = fs.readFileSync(uploadedFile.filepath);

        // Call your PDF parsing utility function with the buffer.
        const text = await parsePdf(fileBuffer);

        if (!text || !text.trim()) {
            return res.status(422).json({ error: 'Failed to extract text from PDF.' });
        }

        // Send a successful JSON response back to the client.
        return res.status(200).json({
            file_name: uploadedFile.originalFilename,
            mime_type: uploadedFile.mimetype || 'application/pdf',
            size: uploadedFile.size,
            textContent: text,
        });

    } catch (err: unknown) {
        console.error('Error processing PDF upload:', err);
        // Return a generic 500 error for unhandled exceptions.
        return res.status(500).json(
            { error: 'Internal server error.', detail: err instanceof Error ? err.message : String(err) },
        );
    }
}
