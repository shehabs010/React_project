import http from './httpServices';

export const getSearchResult = (Term, PageNumber, PageSize, WideFieldCode, NarrowFieldCode, DetailedFieldCode) =>
  http.get('/api/Mdm/FindRanks', { params: { Term, WideFieldCode, NarrowFieldCode, DetailedFieldCode, PageNumber, PageSize } });

export const autoCompleteSearch = Term => http.get('/api/Mdm/SearchRanks', { params: { Term } });
