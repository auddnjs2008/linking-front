import { useState } from "react";
import { useMeQuery } from "@/hooks/rqhooks/user/useMeQuery";
import { useUserStatsQuery } from "@/hooks/rqhooks/user/useUserStatsQuery";
import { useUpdateUserMutation } from "@/hooks/rqhooks/user/useUpdateUserMutation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Edit2,
  Save,
  X,
  Camera,
  Link,
  FolderOpen,
  Bookmark,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { useUploadProfileMutation } from "@/hooks/rqhooks/user/useUploadProfileMutation";

export default function UserProfilePage() {
  const { data: user, isLoading: userLoading } = useMeQuery();
  const { data: stats, isLoading: statsLoading } = useUserStatsQuery(
    user?.id ?? -1
  );
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUserMutation(
    user?.id ?? -1
  );

  const { mutate: uploadProfile } = useUploadProfileMutation();

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");

  const handleEditName = () => {
    if (user) {
      setEditedName(user.name);
      setIsEditingName(true);
    }
  };

  const handleSaveName = () => {
    if (editedName.trim() && editedName !== user?.name) {
      updateUser({ name: editedName.trim() });
    }
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setEditedName("");
    setIsEditingName(false);
  };

  const handleProfileImageClick = () => {
    const input = document.getElementById(
      "profile-image-input"
    ) as HTMLInputElement;
    input?.click();
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 검증 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      // 파일 타입 검증
      if (!file.type.startsWith("image/")) {
        toast.error("이미지 파일만 업로드 가능합니다.");
        return;
      }

      const formData = new FormData();
      formData.set("file", file);

      uploadProfile({ body: formData });
    }
  };

  if (userLoading || statsLoading) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <p className="text-gray-500">사용자 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-6 h-full max-w-4xl mx-auto">
      {/* 프로필 헤더 */}
      <div className="mb-8">
        <div className="flex items-start gap-6">
          {/* 프로필 이미지 */}
          <div className="relative group">
            <div
              className="relative cursor-pointer"
              onClick={handleProfileImageClick}
              title="프로필 이미지 변경"
            >
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.profile} alt={user.name} />
                <AvatarFallback className="text-2xl bg-blue-100 text-blue-600 font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* 호버 시 오버레이 */}
              <div className="absolute inset-0 rounded-full group-hover:bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-200">
                <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-image-input"
              onChange={handleProfileImageChange}
            />
          </div>

          {/* 사용자 정보 */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-2xl font-bold h-10"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    onClick={handleSaveName}
                    disabled={isUpdating}
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                  <Button size="sm" variant="ghost" onClick={handleEditName}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            <p className="text-gray-600 text-lg">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              {user.loginType === "google" ? "Google 계정" : "로컬 계정"} •
              가입일: {new Date(user.createdAt).toLocaleDateString("ko-KR")}
            </p>
          </div>
        </div>
      </div>

      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">내 링크</CardTitle>
            <Link className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.createdLinkCount || 0}
            </div>
            <p className="text-xs text-muted-foreground">작성한 링크 개수</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">내 그룹</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.createdGroupCount || 0}
            </div>
            <p className="text-xs text-muted-foreground">생성한 그룹 개수</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">링크 북마크</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.receivedLinkBookmark || 0}
            </div>
            <p className="text-xs text-muted-foreground">받은 링크 북마크 수</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">그룹 북마크</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.receivedGroupBookmark || 0}
            </div>
            <p className="text-xs text-muted-foreground">받은 그룹 북마크 수</p>
          </CardContent>
        </Card>
      </div>

      {/* 추가 정보 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>계정 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                이메일
              </label>
              <p className="text-sm">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                계정 타입
              </label>
              <p className="text-sm">
                {user.loginType === "google" ? "Google 계정" : "로컬 계정"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                가입일
              </label>
              <p className="text-sm">
                {new Date(user.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                마지막 업데이트
              </label>
              <p className="text-sm">
                {new Date(user.updatedAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>활동 요약</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">총 링크 수</span>
              <span className="font-semibold">
                {stats?.createdLinkCount || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">총 그룹 수</span>
              <span className="font-semibold">
                {stats?.createdGroupCount || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">총 링크 북마크</span>
              <span className="font-semibold">
                {stats?.receivedLinkBookmark || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">총 그룹 북마크</span>
              <span className="font-semibold">
                {stats?.receivedGroupBookmark || 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
