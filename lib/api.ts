import axios, { type AxiosInstance } from "axios";
import type {
  ApiResponse,
  ContactFormData,
  DonationFormData,
  DonationInitiateResult,
  DonationVerifyResult,
  GalleryItem,
  ImpactStats,
} from "./types";

/**
 * Creates a configured Axios instance for the public API.
 */
function createApiClient(): AxiosInstance {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 15000,
  });
}

const apiClient = createApiClient();

/**
 * Fetches gallery items from the API.
 */
export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  const response = await apiClient.get<ApiResponse<GalleryItem[]>>("/gallery");
  return response.data.data;
}

/**
 * Fetches impact statistics from the API.
 */
export async function fetchImpactStats(): Promise<ImpactStats> {
  const response = await apiClient.get<ApiResponse<ImpactStats>>("/stats");
  return response.data.data;
}

/**
 * Submits a contact form message.
 * @param data - Contact form payload
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse<{ id: string }>> {
  const response = await apiClient.post<ApiResponse<{ id: string }>>(
    "/contact",
    data
  );
  return response.data;
}

/**
 * Starts a Paystack checkout for a one-time donation.
 */
export async function initiateDonation(
  data: DonationFormData
): Promise<DonationInitiateResult> {
  const response = await apiClient.post<ApiResponse<DonationInitiateResult>>(
    "/donations/initiate",
    data
  );
  return response.data.data;
}

/**
 * Confirms a Paystack payment by reference after redirect.
 */
export async function verifyDonation(
  reference: string
): Promise<DonationVerifyResult> {
  const response = await apiClient.post<ApiResponse<DonationVerifyResult>>(
    "/donations/verify",
    { reference }
  );
  return response.data.data;
}

export { apiClient };
