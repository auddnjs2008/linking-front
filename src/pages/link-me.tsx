import LinkCard from "@/components/link-card";
import ButtonController from "@/components/button-controller";

export default function LinkMe() {
  return (
    <div className="p-6 h-full flex flex-col w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <LinkCard
            id={1}
            key={index}
            thumbnailUrl={`https://picsum.photos/200/300?random=${index}`}
            title="Link Title"
            description="This article provides an in-depth overview of the latest trends in UI/UX design, offering practical tips and real-world examples to inspire your next project."
          />
        ))}
      </div>
      <ButtonController type="link" />
    </div>
  );
}
