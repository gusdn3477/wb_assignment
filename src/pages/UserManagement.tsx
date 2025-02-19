import { useCallback, useState } from 'react';
import { Campaign } from '@/types';
import Button from '@/components/Button';
import Grid, { Column } from '@/components/Grid';
import SignupModal from '@/components/SignupModal';

const data: Campaign[] = [
  {
    id: 1,
    enabled: true,
    name: 'Black Friday Sale',
    campaign_objective: 'WEBSITE_CONVERSIONS',
    impressions: 500000,
    clicks: 25000,
    ctr: 5.0,
    video_views: 100000,
    vtr: 20.0,
  },
  {
    id: 2,
    enabled: false,
    name: 'New Year Promotion',
    campaign_objective: 'LEAD',
    impressions: 300000,
    clicks: 15000,
    ctr: 5.0,
    video_views: 50000,
    vtr: 16.7,
  },
  {
    id: 3,
    enabled: true,
    name: 'Summer Collection',
    campaign_objective: 'BRAND',
    impressions: 700000,
    clicks: 35000,
    ctr: 5.0,
    video_views: 200000,
    vtr: 28.6,
  },
  {
    id: 4,
    enabled: true,
    name: 'Winter Special',
    campaign_objective: 'VIDEO_VIEWS',
    impressions: 200000,
    clicks: 5000,
    ctr: 2.5,
    video_views: 40000,
    vtr: 20.0,
  },
  {
    id: 5,
    enabled: false,
    name: 'Spring Festival',
    campaign_objective: 'SALES',
    impressions: 600000,
    clicks: 18000,
    ctr: 3.0,
    video_views: 120000,
    vtr: 20.0,
  },
];

const columns: Column<Campaign>[] = [
  { key: 'id', label: '번호' },
  { key: 'enabled', label: '상태' },
  { key: 'name', label: '캠페인명' },
  { key: 'campaign_objective', label: '캠페인 목적' },
  { key: 'impressions', label: '노출수' },
  { key: 'clicks', label: '클릭수' },
  { key: 'ctr', label: 'CTR' },
  { key: 'video_views', label: '동영상조회수' },
  { key: 'vtr', label: 'VTR' },
];

export default function UserManagement() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <div>
      <h2>사용자 관리</h2>
      <Button text="생성" onClick={handleModalOpen} className="ml-2" />
      <Grid data={data} columns={columns} />

      <SignupModal open={modalOpen} onClose={handleModalClose} />
    </div>
  );
}
