import { apiRequest } from './apiClient'

export type ApiRole = 'TEACHER' | 'PREFECT' | 'ACADEMIC_SERVICES' | 'PSYCHOLOGIST'
export type ApiShift = 'MORNING' | 'AFTERNOON'
export type ApiInformationSource =
  | 'STUDENT_FILE'
  | 'TEACHER'
  | 'PREFECT'
  | 'SOCIAL_WORK'
  | 'GROUP_ADVISOR'
export type ApiManifestation =
  | 'SENSORY_DYSREGULATION'
  | 'DIFFICULTY_FOLLOWING_INSTRUCTIONS'
  | 'SOCIAL_ISOLATION'
  | 'READING_OR_MATH_DIFFICULTY'
export type ApiPriority = 'ORDINARY' | 'EXPEDITED' | 'URGENT'
export type ApiReferralStatus = 'PENDING' | 'RECEIVED'

export interface ApiUser {
  id: number
  username: string
  email: string
  fullName: string | null
  role: ApiRole
  teacherId: number | null
  active: boolean
}

export interface ApiLoginResponse {
  token: string
  tokenType: string
  user: ApiUser
}

export interface ApiRegisterUserRequest {
  username: string
  email: string
  fullName?: string
  password: string
  role: ApiRole
  teacherId?: number | null
}

export interface ApiGrade {
  id: number
  gradeNumber: number
}

export interface ApiSchoolGroup {
  id: number
  letter: string
}

export interface ApiStudent {
  id: number
  enrollmentNumber: string
  firstName: string
  lastName: string
  shift: ApiShift
  gradeId: number
  schoolGroupId: number
  active: boolean
}

export interface ApiCreateStudentRequest {
  enrollmentNumber: string
  firstName: string
  lastName: string
  gradeId: number
  schoolGroupId: number
  shift: ApiShift
}

export interface ApiStudentFilters {
  gradeId?: number
  schoolGroupId?: number
  shift?: ApiShift
}

export interface ApiReferral {
  id: number
  studentId: number
  informationSource: ApiInformationSource
  evaluatorName: string
  teacherSubject: string | null
  referralDate: string
  affectsAcademicPerformance: boolean
  situationDescription: string | null
  reasonForReferral: string | null
  priority: ApiPriority | null
  manifestations: ApiManifestation[]
  status: ApiReferralStatus
  folio: string | null
  createdByUserId: number
  createdAt: string
}

export interface ApiCreateReferralRequest {
  studentId: number
  informationSource: ApiInformationSource
  evaluatorName: string
  teacherSubject?: string | null
  referralDate: string
  affectsAcademicPerformance: boolean
  situationDescription?: string | null
  reasonForReferral?: string | null
  priority?: ApiPriority | null
  manifestations?: ApiManifestation[]
}

export interface ApiAppointment {
  id: number
  scheduledAt: string
  reason: string
  status: string
  teacherId: number
  technicalStaffId: number | null
  studentIds: number[]
  createdAt: string
}

export interface ApiCreateAppointmentRequest {
  scheduledAt: string
  reason: string
  technicalStaffId?: number | null
  studentIds: number[]
}

export interface ApiAcronym {
  id: number
  code: string
  meaning: string
  description: string | null
  category: string
}

function query(params: Record<string, string | number | undefined | null>): string {
  const search = new URLSearchParams()
  for (const [clave, valor] of Object.entries(params)) {
    if (valor !== undefined && valor !== null && valor !== '') search.set(clave, String(valor))
  }
  const texto = search.toString()
  return texto ? `?${texto}` : ''
}

export const usersApi = {
  login: (email: string, password: string, signal?: AbortSignal) =>
    apiRequest<ApiLoginResponse>('/v1/users/login', {
      method: 'POST',
      body: { email, password },
      signal,
      auth: false,
    }),
  register: (body: ApiRegisterUserRequest) =>
    apiRequest<ApiUser>('/v1/users', { method: 'POST', body }),
}

export const gradesApi = {
  list: (signal?: AbortSignal) => apiRequest<ApiGrade[]>('/v1/grades', { signal }),
}

export const schoolGroupsApi = {
  list: (signal?: AbortSignal) => apiRequest<ApiSchoolGroup[]>('/v1/school-groups', { signal }),
}

export const studentsApi = {
  list: (filters: ApiStudentFilters = {}, signal?: AbortSignal) =>
    apiRequest<ApiStudent[]>(`/v1/students${query({ ...filters })}`, { signal }),
  create: (body: ApiCreateStudentRequest) =>
    apiRequest<ApiStudent>('/v1/students', { method: 'POST', body }),
  changeShift: (id: number, shift: ApiShift) =>
    apiRequest<ApiStudent>(`/v1/students/${id}/shift`, { method: 'PATCH', body: { shift } }),
}

export const referralsApi = {
  list: (studentId?: number, signal?: AbortSignal) =>
    apiRequest<ApiReferral[]>(`/v1/referrals${query({ studentId })}`, { signal }),
  create: (body: ApiCreateReferralRequest) =>
    apiRequest<ApiReferral>('/v1/referrals', { method: 'POST', body }),
  receive: (id: number) =>
    apiRequest<ApiReferral>(`/v1/referrals/${id}/receive`, { method: 'PATCH' }),
}

export const appointmentsApi = {
  list: (signal?: AbortSignal) => apiRequest<ApiAppointment[]>('/v1/appointments', { signal }),
  create: (body: ApiCreateAppointmentRequest) =>
    apiRequest<ApiAppointment>('/v1/appointments', { method: 'POST', body }),
}

export const acronymsApi = {
  list: (signal?: AbortSignal) => apiRequest<ApiAcronym[]>('/v1/acronyms', { signal }),
  find: (code: string, signal?: AbortSignal) =>
    apiRequest<ApiAcronym>(`/v1/acronyms/${encodeURIComponent(code)}`, { signal }),
}
