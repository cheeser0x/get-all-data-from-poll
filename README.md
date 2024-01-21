# get-all-data-from-poll

Due to limits, I could only poll an api in intervals which were too long to capture all new data using standard techniques. New data was getting posted the API so quickly that using a simple script resulted in only pulling the most recent object, and missing various data points.

I found a solution by creating this test app with dummy data. Thought I would upload incase anyone else was having the same issue.

How it works:

The server is initially populated, as was my API of interest. It then adds data, using the data generator function, which adds data faster that the poll. This code is written in a way where it gets all the data since the last poll, no matter how fast it gets added.

In order to run this code, you must run the server in one terminal, and the index file in another.
