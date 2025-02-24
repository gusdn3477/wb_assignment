import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { campaignData } from '@/data/Campaigns';
import { Campaign } from '@/types';
import { ROLE } from '@/constants';
import Grid, { Column } from '@/components/Grid';
import Pagination from '@/components/Pagination';
import Switch from '@/components/Switch';

const SIZE = 25;

export default function CampaignManagament() {
  const [data, setData] = useState<Campaign[]>(campaignData);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = useCallback((id: number) => {
    setCurrentPage(id);
  }, []);
  const { role } = useParams();

  const startIndex = (currentPage - 1) * SIZE;
  const selectedData = data.slice(startIndex, startIndex + SIZE);

  const handleToggle = () => {
    console.log('업데이트 함수');
  };

  const columns: Column<Campaign>[] = [
    { key: 'id', label: '번호' },
    {
      key: 'enabled',
      label: '상태',
      render: (row) => (
        <Switch checked={row.enabled} onChange={handleToggle} disabled={role === ROLE.VIEWER} />
      ),
    },
    { key: 'name', label: '캠페인명' },
    { key: 'campaign_objective', label: '캠페인 목적' },
    { key: 'impressions', label: '노출수', render: (row) => row.impressions.toLocaleString() },
    { key: 'clicks', label: '클릭수', render: (row) => row.clicks.toLocaleString() },
    { key: 'ctr', label: 'CTR', render: (row) => `${row.ctr}%` },
    {
      key: 'video_views',
      label: '동영상조회수',
      render: (row) => row.video_views.toLocaleString(),
    },
    { key: 'vtr', label: 'VTR', render: (row) => `${row.vtr}%` },
  ];

  return (
    <>
      <h2 className="h-12">캠페인 관리</h2>
      <div className="flex-1">
        <Grid data={selectedData} columns={columns} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.floor(data.length / 25)}
        onPageChange={handlePageChange}
        className="flex h-16 items-center justify-center"
      />
    </>
  );
}
