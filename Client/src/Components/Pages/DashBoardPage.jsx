import React from 'react';
import { Card } from '../Common';
import { KoinCounter, BadgeDisplay } from '../Gamification';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KoinCounter koins={250} streak={7} level={3} />
        <BadgeDisplay />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h3 className="font-semibold">📚 Currently Reading</h3>
          <p className="text-[#636E72]">The Great Gatsby</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#0984E3] h-2 rounded-full" style={{width: '65%'}}></div>
          </div>
          <p className="text-sm text-[#636E72] mt-1">65% complete</p>
        </Card>
        <Card>
          <h3 className="font-semibold">🔄 Recent Exchanges</h3>
          <p className="text-[#636E72]">2 pending requests</p>
        </Card>
        <Card>
          <h3 className="font-semibold">🏆 Achievements</h3>
          <p className="text-[#636E72]">12 badges earned</p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;