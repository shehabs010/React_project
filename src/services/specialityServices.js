import http from './httpServices';

export const getWideFields = () => http.get('api/Mdm/WideFields');

export const getNarrowFields = widefieldsid => http.get(`api/Mdm/NarrowFields/${widefieldsid}`);

export const getDetailedFields = (NarrowFieldCode, NarrowFieldParentCode) =>
  http.get(`api/Mdm/DetailedFields/${NarrowFieldCode}/${NarrowFieldParentCode}`);

export const getPublicCards = (PageNumber, PageSize, WideFieldCode, NarrowFieldCode, DetailedFieldCode) =>
  http.get('api/Mdm/PublicCards/', { params: { PageNumber, PageSize, WideFieldCode, NarrowFieldCode, DetailedFieldCode } });

export const getCardDetails = Code => http.get('api/Applications/SpecificCard', { params: { Code } });
