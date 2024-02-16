import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CardDonaciones from '@/components/CardDonaciones/CardDonaciones';
import { DonationResponse, FormattedDonation, UserData, ProjectData } from '@/app/pages/admin/donaciones/page';
import './donaciones.css'



const formatDonation = (donation: DonationResponse): FormattedDonation => {
  return {
    id: donation.id,
    amount: donation.amount,
    type: donation.type,
    userId: donation.userId,
    user: Array.isArray(donation.user) ? donation.user[0] : donation.user,
  };
};

const DashDonaciones: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(1); 
  const [modal, setModal] = useState(true);
  const [usersWithProjects, setUsersWithProjects] = useState<{ [key: number]: UserData }>({});
  const [donations, setDonations] = useState<DonationResponse[]>([]);
  const [formattedDonations, setFormattedDonations] = useState<FormattedDonation[]>([]);

  useEffect(() => {
    Axios.get('https://juntxs.vercel.app/donations')
      .then((response) => {
        const donationData: DonationResponse[] = response.data;
        setDonations(donationData);
        setFormattedDonations(donationData.map(formatDonation));
      })
      .catch((error) => console.error('Error al obtener donaciones:', error));
  }, []);

  const handleUserClick = async (userId: number) => {
    setSelectedUserId(userId);

    try {
      const userProjectsResponse = await Axios.get(`https://juntxs.vercel.app/users/donations/1`);
      const userProjects: ProjectData[] = userProjectsResponse.data;

      const selectedDonation = donations.find((donation) => donation.userId === userId);

      if (selectedDonation) {
        setModal(true);
      }

      setUsersWithProjects((prevUsers) => ({
        ...prevUsers,
        [userId]: { ...prevUsers[userId], projects: userProjects },
      }));
    } catch (error) {
      console.error('Error al obtener información del proyecto:', error);
    }
  };

  const selectedDonation = donations.find((donation) => donation.userId === selectedUserId);

  const handleCloseDetail = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="dashboard-container">
      <CardDonaciones
        donations={donations}
        formattedDonations={formattedDonations}
        onCloseDetail={handleCloseDetail}
        onUserClick={handleUserClick}
        selectedUserId={selectedUserId}
      />
    </div>
  );
};

export default DashDonaciones;