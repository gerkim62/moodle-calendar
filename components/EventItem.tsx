import { CalendarComponent } from 'ical';
import React, { useState } from 'react';

interface EventProps {
  event:CalendarComponent
}

const EventItem: React.FC<EventProps> = ({ event }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  const renderDescription = () => {
    if (!event.description) return 'No description available';
    
    const maxLength = 50; // Set your desired maximum length for description

    if (showFullDescription) {
      return event.description;
    } else {
      return truncateText(event.description, maxLength);
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">{event.summary}</h2>
      <p className="text-gray-600 mb-2">
        <strong>Start:</strong> {event.start ? new Date(event.start).toDateString() : 'No start date specified'}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>End:</strong> {event.end ? new Date(event.end).toDateString() : 'No end date specified'}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Description:</strong> {renderDescription()}
        {event.description && event.description.length > 150 && (
          <button className="text-blue-500" onClick={toggleDescription}>
            {showFullDescription ? 'Read Less' : 'Read More'}
          </button>
        )}
      </p>
      <p className="text-gray-600">
        <strong>Categories:</strong> {event.categories?.join(', ') || 'No categories specified'}
      </p>
    </div>
  );
};

export default EventItem;
