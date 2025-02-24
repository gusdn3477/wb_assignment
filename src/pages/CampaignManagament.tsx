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
    { key: 'id', label: '번호', hidden: true },
    {
      key: 'enabled',
      label: '상태',
      render: (row) => (
        <div className="flex items-center justify-center">
          <Switch checked={row.enabled} onChange={handleToggle} disabled={role === ROLE.VIEWER} />
        </div>
      ),
      renderHeader: () => <div className="flex items-center justify-center">{'상태'}</div>,
    },
    { key: 'name', label: '캠페인명' },
    { key: 'campaign_objective', label: '캠페인 목적' },
    {
      key: 'impressions',
      label: '노출수',
      render: (row) => <span className="flex justify-end">{row.impressions.toLocaleString()}</span>,
      renderHeader: () => <span className="flex justify-end">{'노출 수'}</span>,
    },
    {
      key: 'ctr',
      label: 'CTR',
      render: (row) => <span className="flex justify-end">{row.ctr}%</span>,
      renderHeader: () => <span className="flex justify-end">{'ctr'}</span>,
    },
    {
      key: 'video_views',
      label: '동영상조회수',
      render: (row) => <span className="flex justify-end">{row.video_views.toLocaleString()}</span>,
      renderHeader: () => <span className="flex justify-end">{'동영상조회수'}</span>,
    },
    {
      key: 'vtr',
      label: 'VTR',
      render: (row) => <span className="flex justify-end">{row.vtr}%</span>,
      renderHeader: () => <span className="flex justify-end">{'VTR'}</span>,
    },
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
