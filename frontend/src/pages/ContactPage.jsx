import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const openingHoursData = {
  // Sunday: 0, Monday: 1, ..., Saturday: 6
  1: { day: 'Monday', open: '12:00', close: '23:00' },
  2: { day: 'Tuesday', open: '12:00', close: '23:00' },
  3: { day: 'Wednesday', open: '12:00', close: '23:00' },
  4: { day: 'Thursday', open: '12:00', close: '23:00' },
  5: { day: 'Friday', open: '12:00', close: '23:00' },
  6: { day: 'Saturday', open: '12:00', close: '23:00' },
  0: { day: 'Sunday', open: '12:00', close: '23:00' },
};

function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState(new Date().getDay());

  useEffect(() => {
    const checkOpeningStatus = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hours + minutes / 60;

      const todaysHours = openingHoursData[currentDay];
      if (todaysHours) {
        const [openHour, openMinute] = todaysHours.open.split(':').map(Number);
        const [closeHour, closeMinute] = todaysHours.close.split(':').map(Number);
        const openTime = openHour + openMinute / 60;
        const closeTime = closeHour + closeMinute / 60;

        setIsOpen(currentTime >= openTime && currentTime < closeTime);
      } else {
        setIsOpen(false);
      }
    };

    checkOpeningStatus();
    // Check every minute
    const interval = setInterval(checkOpeningStatus, 60000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header title="Contact Us" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Map and Address Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Location</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg mb-4">
              {/* Embedded Google Map for the new address */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.563801452595!2d100.51039181534498!3d13.8048949903126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29b950339c365%3A0x828949a37c3b55b5!2s15%20Soi%20Nonthaburi%2018%2F1%2C%20Bang%20Krasor%2C%20Mueang%20Nonthaburi%20District%2C%20Nonthaburi%2011000%2C%20Thailand!5e0!3m2!1sen!2sid!4v1724102154321!5m2!1sen!2sid"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
              ></iframe>
            </div>
            <div className="text-gray-700">
                <p><strong>Address:</strong> 1, 15 ซ. นนทบุรี 18/1 Bang Krasor, อำเภอเมืองนนทบุรี นนทบุรี 11000, Thailand</p>
                <p><strong>Phone:</strong> (024) 123-4567</p>
                <p><strong>Email:</strong> contact@ourrestaurant.com</p>
            </div>
          </div>

          {/* Opening Hours Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Opening Hours</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Today's Status</h3>
                <span className={`px-3 py-1 text-sm font-bold rounded-full text-white ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
                  {isOpen ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
              <ul>
                {Object.values(openingHoursData).map((item, index) => (
                  <li key={index} className={`flex justify-between py-2 border-b ${item.day === openingHoursData[today].day ? 'font-bold text-blue-600' : ''}`}>
                    <span>{item.day}</span>
                    <span>{item.open} - {item.close}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactPage;
