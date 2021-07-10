import http from './httpServices';

export const getCities = () => http.get('/api/Tarmeez/Cities');

export const getDegrees = () => http.get('/api/Tarmeez/Degrees');

export const getGender = () => http.get('/api/Tarmeez/Gender');

export const getUniversitiesType = () => http.get('/api/Tarmeez/UniversitiesType');

export const getFilterResults = (specialityRankCode, pageNumber, pageSize, locationsIds, degreesIds, gendersIds, educationAuthoritiesTypes) =>
  http.post('/api/Applications/Filter', {
    pageNumber,
    pageSize,
    specialityRankCode,
    locationsIds,
    educationAuthoritiesTypes,
    gendersIds,
    degreesIds,
  });

// ?InstituteId=3&LocationId=2&RankCode=038b8e2f-c660-4baf-aaa1-c98b57f8793f
export const getApplication = params => http.get('/api/Applications', { params });

/** Instituation path
 ============================== */

export const getInstitutes = (pageNumber, pageSize, locationsIds, degreesIds, gendersIds, educationAuthoritiesType) =>
  http.post('/api/Institutes/Filter', { pageNumber, pageSize, locationsIds, educationAuthoritiesType, gendersIds, degreesIds });
export const getInstitutesTopPart = InstitueId => http.get(`/api/Institutes/${InstitueId}`);
export const getInstitutesColleges = InstitueId => http.get(`/api/Institutes/${InstitueId}/Colleges`);
export const getInstitutesDepartments = (InstitueId, collegesId) => http.get(`/api/Institutes/${InstitueId}/Colleges/ ${collegesId}/Departments`);
export const getInstitutesMajors = (InstitueId, collegesId, MajorsId) =>
  http.get(`/api/Institutes/${InstitueId}/Colleges/ ${collegesId}/Departments/${MajorsId}/Majors`);
export const getInstitutesDegrees = () => http.get('/api/Institutes/Degrees');
export const getInstitutesApplication = (InstitueId, collegesId, DepartmentsId, MajorsId, DegreeId) =>
  http.get(
    `/api/Applications/TRMZ?InstituteId=${InstitueId}&CollegeId=${collegesId}&DepartmentId=${DepartmentsId}&MajorId=${MajorsId}&DegreeId=${DegreeId}`
  );
