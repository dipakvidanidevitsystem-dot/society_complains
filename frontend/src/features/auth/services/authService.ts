import api from "../../../config/api";
import type { ApiResponse, User } from "../../../types";
import type { LoginValues } from "../../../utils/validation";

export const authService = {
  login: (body: LoginValues) => api.post<ApiResponse<User>>("/auth/login", body).then((r) => r.data),
  register: (formData: FormData) => api.post<ApiResponse<User>>("/auth/register", formData).then((r) => r.data),
  logout: () => api.post<ApiResponse<null>>("/auth/logout").then((r) => r.data),
  me: () => api.get<ApiResponse<User>>("/auth/me").then((r) => r.data),
};
