
import csv from 'csv-parser'; // Import csv-parser
import { Readable } from 'stream'; // Import Readable from the stream module
/**
 * Parse a CSV file buffer or string into an array of JSON objects.
 * @param {Buffer|string} data - The CSV file buffer or string.
 * @returns {Promise<Array>} - A promise that resolves to an array of JSON objects.
 */
const parseCSV = (data) => {
    return new Promise((resolve, reject) => {
        const results = [];

        // Convert the data (buffer or string) into a readable stream
        const stream = Readable.from(data.toString());

        // Pipe the stream through csv-parser
        stream
            .pipe(csv())
            .on('data', (row) => results.push(row)) // Each row is converted to a JSON object
            .on('end', () => resolve(results)) // Resolve the promise with the parsed data
            .on('error', (error) => reject(error)); // Reject the promise if an error occurs
    });
};

const formatData = (data) => {
    const formatedData = parseCSV(data);
    forEach(formatedData, (row) => {
        row.amount = parseFloat(row.amount);
    });

}

export { parseCSV };

