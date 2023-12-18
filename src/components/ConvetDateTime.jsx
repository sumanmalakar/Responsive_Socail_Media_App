import React from 'react'

const ConvetDateTime = ({ seconds, nanoseconds, text }) => {
  // Assuming you have a Firebase timestamp with seconds and nanoseconds
  const firebaseTimestamp = {
    seconds,
    nanoseconds,
  };

  // Convert the Firebase timestamp to milliseconds
  const timestampInMilliseconds =
    firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1e6;

  // Create a Date object using the timestamp
  const date = new Date(timestampInMilliseconds);

  // Convert the date to the IST (Indian Standard Time) timezone
  date.setUTCHours(date.getUTCHours() + 5); // UTC offset for India
  date.setUTCMinutes(date.getUTCMinutes() + 30); // Adjust for UTC offset

  // Format the date as a string
  const formattedDate = date.toLocaleString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });

  // console.log("Indian Date and Time:", formattedDate);
  return <h6>{text}{" "}{formattedDate}</h6>;
};

export default ConvetDateTime