// 캠페인 목적 Enum
const CampaignObjective = {
  WEBSITE_CONVERSIONS: 'WEBSITE_CONVERSIONS',
  WEBSITE_TRAFFIC: 'WEBSITE_TRAFFIC',
  SALES: 'SALES',
  APP_INSTALLATION: 'APP_INSTALLATION',
  LEAD: 'LEAD',
  BRAND: 'BRAND',
  VIDEO_VIEWS: 'VIDEO_VIEWS',
} as const;

type CampaignObjective = (typeof CampaignObjective)[keyof typeof CampaignObjective];

// 캠페인 개별 항목 타입
export interface Campaign {
  id: number;
  name: string;
  enabled: boolean;
  campaign_objective: CampaignObjective;
  impressions: number;
  clicks: number;
  ctr: number;
  video_views: number;
  vtr: number;
}

interface Sort {
  [key: string]: any;
}

export interface CampaignResponse {
  content: Campaign[]; // ✅ 캠페인 배열
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number; // 페이지 번호 (0부터 시작)
  size: number; // 페이지당 요소 개수
  sort: Sort; // 정렬 기준
  number_of_elements: number; // 조회된 요소 개수
  first: boolean; // 첫 번째 페이지 여부
  empty: boolean; // 데이터가 비어있는지 여부
}
