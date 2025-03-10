import { CampaignResponse, PageParams, Result } from '@/types';
import qs from 'qs';
import API from './API';

export const CampaignRepository = {
  async getCampaigns({ page, size }: PageParams): Promise<CampaignResponse[] | null> {
    try {
      const queryString = qs.stringify({ page, size }, { skipNulls: true, addQueryPrefix: true });
      const response = await API.get(`/api/campaigns${queryString}`);
      return response.data;
    } catch {
      return null;
    }
  },

  async patch({ id }: { id: number }): Promise<Result | null> {
    try {
      const response = await API.patch(`/api/campaigns/${id}`);
      return response.data;
    } catch {
      return null;
    }
  },
};
