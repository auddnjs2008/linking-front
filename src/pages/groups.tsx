import GroupCard from "@/components/group-card";

export default function GroupPage() {
  return (
    <div className="p-6 h-full flex flex-col w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <GroupCard
            key={index}
            title="Group Title"
            description="Group Description"
            linkCount={10}
            createdDate="2021-01-01"
            ownerAvatar="https://github.com/shadcn.png"
            ownerInitials="CN"
            ownerName="John Doe"
          />
        ))}
      </div>
    </div>
  );
}
