import React from 'react';

import CardDonaciones from '../../../components/CardDonaciones/CardDonaciones';
import DonacionesDetail from '../../../components/DonacionesDetail/DonacionesDetail';

function formatDonation(donation) {
    const formattedDonation = {
      id: donation.id,
      amount: donation.amount,
      type: donation.type,
      userId: donation.userId,
      user: donation.user, 
      date: donation.date,
      project: donation.project, 
    };
  
    return formattedDonation;
  }

  
  function ServerComponent({ donations, onUserClick, onCloseDetail }) {
    return (
      <div>
        <CardDonaciones
          formattedDonations={donations.map(formatDonation)}
          onCloseDetail={onCloseDetail}
          onUserClick={onUserClick}
          selectedUserId={null}
        />
        {donations.map((donation) => (
          <DonacionesDetail
            key={donation.id}
            donation={donation}
            project={donation.project}
            onClose={onCloseDetail}
          />
        ))}
      </div>
    );
  }

export default ServerComponent;