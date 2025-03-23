import { NewsFilters } from '@/types';

export const buildQueryParams = (filters: NewsFilters) => {
  const params = new URLSearchParams();

  if (filters.q) params.append('q', filters.q);
  if (filters.qInTitle) params.append('qInTitle', filters.qInTitle);
  if (filters.qInMeta) params.append('qInMeta', filters.qInMeta);
  if (filters.country) params.append('country', filters.country);
  if (filters.category) params.append('category', filters.category);
  if (filters.language) params.append('language', filters.language);
  if (filters.from) params.append('from', filters.from);
  if (filters.to) params.append('to', filters.to);
  if (filters.domain) params.append('domain', filters.domain);
  if (filters.excludeDomain)
    params.append('excludeDomain', filters.excludeDomain);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());

  return params.toString();
};
