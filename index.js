import { Readable } from 'stream';
import { setupListener } from './listener/setupListener.js';

const activityStream = new Readable({
    objectMode: true,
    read() {} // No-op
});

setupListener(activityStream);

const receivedChunks = [];
let lastProcessedId = 0;
let isInitialDataProcessed = false;

activityStream.on('data', (chunk) => {
    const chunkData = JSON.parse(chunk.toString());

    // Update lastProcessedId based on the initial chunks
    if (!isInitialDataProcessed) {
        lastProcessedId = Math.max(lastProcessedId, chunkData.id);
    }

    receivedChunks.push(chunkData);
    console.log('Received chunk:', chunkData);
});

// Mark that initial data processing is complete after the first interval
setTimeout(() => {
    isInitialDataProcessed = true;
}, 30 * 1000); // After 30 seconds

// Process new chunks at regular intervals
setInterval(() => {
    // Filter new chunks based on lastProcessedId
    const newChunks = receivedChunks.filter(chunk => chunk.id > lastProcessedId);
    
    if (newChunks.length > 0) {
        // Process each new chunk
        newChunks.forEach(chunk => {
            console.log(chunk.email); // Log the email of each chunk
        });

        // Update lastProcessedId to the id of the last new chunk
        lastProcessedId = newChunks[newChunks.length - 1].id;
        console.log('New chunks added:', newChunks.map(chunk => chunk.id));

        // Clear receivedChunks to start fresh for the next interval
        receivedChunks.length = 0;
    } else {
        console.log('No new chunks since last check.');
    }
}, 30 * 1000); // Every 30 seconds
