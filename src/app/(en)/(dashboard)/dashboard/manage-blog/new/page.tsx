import { BlogEditor } from "@/components/dashboard/blog-editor";

export default async function NewBlogPostPage({
    searchParams,
}: {
    searchParams: Promise<{ translationGroupId?: string }>;
}) {
    const { translationGroupId } = await searchParams;

    return (
        <div className="p-6 md:p-8">
            <BlogEditor mode="create" initialTranslationGroupId={translationGroupId} />
        </div>
    );
}
