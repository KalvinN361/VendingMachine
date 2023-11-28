// components/termsAndConditions.tsx
import React, { useEffect, useState } from 'react';

const termsAndConditionsContent = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed purus risus.
  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
  cubilia Curae; Aliquam vitae metus vitae urna posuere ultrices. Integer eu
  odio urna. Fusce vel tristique arcu. Etiam tincidunt sapien ex, vel egestas
  velit pharetra in. Ut rhoncus scelerisque orci non auctor.
  // Add more content as needed
   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed purus risus.
  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
  cubilia Curae; Aliquam vitae metus vitae urna posuere ultrices. Integer eu
  odio urna. Fusce vel tristique arcu. Etiam tincidunt sapien ex, vel egestas
  velit pharetra in. Ut rhoncus scelerisque orci non auctor.
  // Add more content as needed
   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed purus risus.
  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
  cubilia Curae; Aliquam vitae metus vitae urna posuere ultrices. Integer eu
  odio urna. Fusce vel tristique arcu. Etiam tincidunt sapien ex, vel egestas
  velit pharetra in. Ut rhoncus scelerisque orci non auctor.
  // Add more content as needed
   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed purus risus.
  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
  cubilia Curae; Aliquam vitae metus vitae urna posuere ultrices. Integer eu
  odio urna. Fusce vel tristique arcu. Etiam tincidunt sapien ex, vel egestas
  velit pharetra in. Ut rhoncus scelerisque orci non auctor.
  // Add more content as needed
   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed purus risus.
  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
  cubilia Curae; Aliquam vitae metus vitae urna posuere ultrices. Integer eu
  odio urna. Fusce vel tristique arcu. Etiam tincidunt sapien ex, vel egestas
  velit pharetra in. Ut rhoncus scelerisque orci non auctor.
  // Add more content as needed

`;

const TermsAndConditionsModal: React.FC = () => {
  const [accepted, setAccepted] = useState<boolean>(false);

  useEffect(() => {
    const isAccepted = localStorage.getItem('TermsandConditions');
    if (isAccepted && isAccepted === 'true') {
      setAccepted(true);
    } else {
      // Show the modal after 1 second if not accepted
      setTimeout(() => {
        setAccepted(false);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('TermsandConditions', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-4/6 max-h-[75%] flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">Terms and Conditions</h2>
        <div className="scrollable-content flex-grow overflow-y-auto">
          {termsAndConditionsContent}
        </div> {/* Use the hardcoded content */}
        <button
          onClick={handleAccept}
          className="mt-4 px-6 py-2 text-blackrounded bg-[#37b063] hover:bg-green-500 focus:outline-none focus:ring focus:ring-blue-300 self-center"
        >
          Accept
        </button>
      </div>
    </div>


  );
};

export default TermsAndConditionsModal;
