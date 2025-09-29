import { apiInstance } from "../api";

type ReqUploadProfile = {
  body: FormData;
};

type ResUploadProfile = {
  fileName: string;
  imageUrl: string;
  message: string;
};

export const uploadProfile = async (
  req: ReqUploadProfile
): Promise<ResUploadProfile> => {
  const result = await apiInstance.post<ResUploadProfile>(
    `/user/upload-profile-image`,
    req.body,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return result.data;
};
