import axios, { type AxiosInstance } from "axios";
import type {
  ApiResponse,
  ContactFormData,
  DonationFormData,
  DonationInitiateResult,
  DonationVerifyResult,
} from "./types";

/**
 * Browser/client Axios instance for interactive mutations only.
 * Content GETs belong in `lib/server-api.ts` (SSR + Next cache).
 */
function createApiClient(): AxiosInstance {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5002",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 15000,
  });
}

const apiClient = createApiClient();

/**
 * Submits a contact form message.
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse<{ id: string }>> {
  const response = await apiClient.post<ApiResponse<{ id: string }>>(
    "/messages",
    {
      name: data.name,
      email: data.email,
      inquiryType: data.inquiryType,
      message: data.message,
    }
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
