"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/providers/language-provider";
import { SeoSnippetEditor } from "./seo-snippet-editor";
import Image from "next/image";

interface BlogPost {
    id?: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
    status: string;
    locale: string;
    seoTitle: string;
    seoDescription: string;
    translationGroupId?: string;
}

interface BlogEditorProps {
    initialData?: BlogPost;
    mode: "create" | "edit";
    initialTranslationGroupId?: string;
    translation?: any;
}

// Toolbar button component
function ToolbarButton({
    onClick,
    icon,
    title,
    active,
}: {
    onClick: () => void;
    icon: string;
    title: string;
    active?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`p-1.5 rounded-md transition-colors ${active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
        >
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </button>
    );
}

function ToolbarSeparator() {
    return <div className="w-px h-6 bg-border mx-1" />;
}

export function BlogEditor({ initialData, mode, initialTranslationGroupId, translation }: BlogEditorProps) {
    const router = useRouter();
    const { language } = useLanguage();
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState(initialData?.title || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
    const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
    const [status, setStatus] = useState(initialData?.status || "DRAFT");
    const [locale, setLocale] = useState(
        initialData?.locale ||
        (mode === "create" && initialTranslationGroupId ? (language === "tr" ? "tr" : "en") : "en")
    );
    const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
    const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || "");

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingInline, setUploadingInline] = useState(false);
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!initialData?.slug);

    // Auto-generate slug from title
    useEffect(() => {
        if (!slugManuallyEdited && title) {
            const generated = title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .slice(0, 80);
            setSlug(generated);
        }
    }, [title, slugManuallyEdited]);

    // Initialize editor content
    useEffect(() => {
        if (editorRef.current && initialData?.content) {
            editorRef.current.innerHTML = initialData.content;
        }
    }, []);

    // Editor commands
    const exec = useCallback((command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    }, []);

    const handleEditorInput = useCallback(() => {
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
        }
    }, []);

    // Handle inline image upload
    const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingInline(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/blog/upload-image", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const { url } = await res.json();
            exec("insertImage", url);
        } catch {
            setError("Failed to upload image");
        } finally {
            setUploadingInline(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    // Handle cover image upload
    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingCover(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/blog/upload-image", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const { url } = await res.json();
            setCoverImage(url);
        } catch {
            setError("Failed to upload cover image");
        } finally {
            setUploadingCover(false);
            if (coverInputRef.current) coverInputRef.current.value = "";
        }
    };

    // Insert link
    const insertLink = () => {
        const url = prompt("Enter URL:");
        if (url) {
            exec("createLink", url);
        }
    };

    // Insert heading
    const insertHeading = (level: string) => {
        exec("formatBlock", level);
    };

    // Handle paste to clean up formatting
    const handlePaste = useCallback((e: React.ClipboardEvent) => {
        e.preventDefault();
        const textHTML = e.clipboardData.getData("text/html");
        const textPlain = e.clipboardData.getData("text/plain");

        if (textHTML) {
            // Create a temp div to sanitize the HTML
            const temp = document.createElement("div");
            temp.innerHTML = textHTML;

            // Remove dangerous elements
            const dangerous = temp.querySelectorAll("script, style, iframe, object, embed");
            dangerous.forEach((el) => el.remove());

            // Strip styling attributes to prevent white background but keep semantic HTML logic
            const allElements = temp.getElementsByTagName("*");
            for (let i = 0; i < allElements.length; i++) {
                const el = allElements[i];
                const tagName = el.tagName.toLowerCase();

                // Keep track of essential attributes before stripping
                const essentialAttrs: Record<string, string> = {};
                if (tagName === "a") {
                    const href = el.getAttribute("href");
                    if (href) essentialAttrs["href"] = href;
                } else if (tagName === "img") {
                    const src = el.getAttribute("src");
                    const alt = el.getAttribute("alt");
                    if (src) essentialAttrs["src"] = src;
                    if (alt) essentialAttrs["alt"] = alt;
                }

                // Strip ALL attributes
                while (el.attributes.length > 0) {
                    el.removeAttribute(el.attributes[0].name);
                }

                // Restore essential attributes
                Object.entries(essentialAttrs).forEach(([name, val]) => {
                    el.setAttribute(name, val);
                });
            }

            document.execCommand("insertHTML", false, temp.innerHTML);
        } else if (textPlain) {
            document.execCommand("insertText", false, textPlain);
        }
    }, []);

    // Also handle a simplified paste for plain text if needed
    const handlePasteSpecial = useCallback((e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
    }, []);

    // Save post
    const handleSave = async (publishStatus?: string) => {
        setError("");
        setSaving(true);

        const finalStatus = publishStatus || status;

        try {
            const body = {
                title,
                slug,
                content: editorRef.current?.innerHTML || content,
                excerpt,
                coverImage,
                status: finalStatus,
                locale,
                seoTitle,
                seoDescription,
                translationGroupId: initialData?.translationGroupId || initialTranslationGroupId,
            };

            let res: Response;

            if (mode === "create") {
                res = await fetch("/api/blog", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
            } else {
                res = await fetch(`/api/blog/${initialData?.slug}?locale=${initialData?.locale}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...body, slug: slug !== initialData?.slug ? slug : undefined }),
                });
            }

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to save");
            }

            const data = await res.json();

            // If we just created, redirect to edit page instead of list
            if (mode === "create") {
                const editPath = `${language === "tr" ? "/tr/panel" : "/dashboard"}/manage-blog/${data.post.slug}/edit`;
                router.push(editPath);
            } else {
                router.refresh(); // Just refresh if we are already editing
                // Optional: show a toast or success message
            }
        } catch (err: any) {
            setError(err.message || "Failed to save post");
        } finally {
            setSaving(false);
        }
    };

    // Handle key events for shortcuts
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.metaKey || e.ctrlKey) {
            switch (e.key) {
                case "b":
                    e.preventDefault();
                    exec("bold");
                    break;
                case "i":
                    e.preventDefault();
                    exec("italic");
                    break;
                case "u":
                    e.preventDefault();
                    exec("underline");
                    break;
                case "k":
                    e.preventDefault();
                    insertLink();
                    break;
            }
        }
    }, [exec]);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {mode === "create"
                            ? language === "tr"
                                ? "Yeni Blog Yazısı"
                                : "New Blog Post"
                            : language === "tr"
                                ? "Yazıyı Düzenle"
                                : "Edit Post"}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg border border-border hover:bg-accent transition-colors"
                    >
                        {language === "tr" ? "İptal" : "Cancel"}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSave("DRAFT")}
                        disabled={saving || !title || !slug}
                        className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-accent transition-colors disabled:opacity-50"
                    >
                        {saving ? "..." : language === "tr" ? "Taslak Kaydet" : "Save Draft"}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSave("PUBLISHED")}
                        disabled={saving || !title || !slug}
                        className="px-4 py-2 text-sm font-bold rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-md"
                    >
                        {saving ? "..." : language === "tr" ? "Yayınla" : "Publish"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content — Left Column */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Title */}
                    <div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={language === "tr" ? "Yazı başlığı..." : "Post title..."}
                            className="w-full text-2xl font-bold bg-transparent border-0 border-b-2 border-border pb-3 focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                        />
                    </div>

                    {/* WYSIWYG Toolbar */}
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="flex items-center flex-wrap gap-0.5 px-3 py-2 bg-muted/50 border-b border-border">
                            {/* Text formatting */}
                            <ToolbarButton onClick={() => exec("bold")} icon="format_bold" title="Bold (⌘B)" />
                            <ToolbarButton onClick={() => exec("italic")} icon="format_italic" title="Italic (⌘I)" />
                            <ToolbarButton onClick={() => exec("underline")} icon="format_underlined" title="Underline (⌘U)" />
                            <ToolbarButton onClick={() => exec("strikeThrough")} icon="strikethrough_s" title="Strikethrough" />

                            <ToolbarSeparator />

                            {/* Headings */}
                            <select
                                onChange={(e) => insertHeading(e.target.value)}
                                className="h-8 px-2 text-xs rounded-md border border-border bg-background text-foreground focus:outline-none cursor-pointer"
                                defaultValue=""
                            >
                                <option value="" disabled>Heading</option>
                                <option value="p">Paragraph</option>
                                <option value="h2">Heading 2</option>
                                <option value="h3">Heading 3</option>
                                <option value="h4">Heading 4</option>
                            </select>

                            <ToolbarSeparator />

                            {/* Lists */}
                            <ToolbarButton onClick={() => exec("insertUnorderedList")} icon="format_list_bulleted" title="Bullet List" />
                            <ToolbarButton onClick={() => exec("insertOrderedList")} icon="format_list_numbered" title="Numbered List" />

                            <ToolbarSeparator />

                            {/* Alignment */}
                            <ToolbarButton onClick={() => exec("justifyLeft")} icon="format_align_left" title="Align Left" />
                            <ToolbarButton onClick={() => exec("justifyCenter")} icon="format_align_center" title="Align Center" />
                            <ToolbarButton onClick={() => exec("justifyRight")} icon="format_align_right" title="Align Right" />

                            <ToolbarSeparator />

                            {/* Links & Media */}
                            <ToolbarButton onClick={insertLink} icon="link" title="Insert Link (⌘K)" />
                            <ToolbarButton
                                onClick={() => fileInputRef.current?.click()}
                                icon="image"
                                title="Insert Image"
                            />
                            <ToolbarButton onClick={() => exec("formatBlock", "blockquote")} icon="format_quote" title="Blockquote" />
                            <ToolbarButton onClick={() => exec("insertHorizontalRule")} icon="horizontal_rule" title="Horizontal Rule" />

                            <ToolbarSeparator />

                            {/* Undo/Redo */}
                            <ToolbarButton onClick={() => exec("undo")} icon="undo" title="Undo" />
                            <ToolbarButton onClick={() => exec("redo")} icon="redo" title="Redo" />
                            <ToolbarButton onClick={() => exec("removeFormat")} icon="format_clear" title="Clear Formatting" />
                        </div>

                        {/* Editor Area */}
                        <div
                            ref={editorRef}
                            contentEditable
                            suppressContentEditableWarning
                            onInput={handleEditorInput}
                            onPaste={handlePaste}
                            onKeyDown={handleKeyDown}
                            className="min-h-[400px] p-5 focus:outline-none prose prose-sm dark:prose-invert max-w-none
                                [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3
                                [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-5 [&_h3]:mb-2
                                [&_h4]:text-base [&_h4]:font-bold [&_h4]:mt-4 [&_h4]:mb-2
                                [&_p]:mb-3 [&_p]:leading-relaxed
                                [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
                                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3
                                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3
                                [&_li]:mb-1
                                [&_a]:text-primary [&_a]:underline
                                [&_img]:rounded-lg [&_img]:max-w-full [&_img]:my-4 [&_img]:shadow-lg
                                [&_hr]:my-6 [&_hr]:border-border"
                            data-placeholder={language === "tr" ? "Yazınızı buraya yazın..." : "Start writing your post..."}
                        />

                        {uploadingInline && (
                            <div className="px-5 py-2 text-xs text-muted-foreground bg-muted/50 border-t border-border flex items-center gap-2">
                                <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>
                                Uploading image...
                            </div>
                        )}
                    </div>

                    {/* Hidden file inputs */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleInlineImageUpload}
                        className="hidden"
                    />
                </div>

                {/* Sidebar — Right Column */}
                <div className="space-y-5">
                    {/* Status & Locale */}
                    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                        <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg text-primary">settings</span>
                            {language === "tr" ? "Yazı Ayarları" : "Post Settings"}
                        </h3>

                        <div>
                            <label className="text-xs font-semibold text-foreground mb-1.5 block">
                                {language === "tr" ? "Durum" : "Status"}
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="DRAFT">{language === "tr" ? "Taslak" : "Draft"}</option>
                                <option value="PUBLISHED">{language === "tr" ? "Yayında" : "Published"}</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-foreground mb-1.5 block">
                                {language === "tr" ? "Dil" : "Language"}
                            </label>
                            <select
                                value={locale}
                                onChange={(e) => setLocale(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="en">English</option>
                                <option value="tr">Türkçe</option>
                            </select>
                        </div>
                    </div>

                    {/* Translations */}
                    {mode === "edit" && (
                        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg text-primary">translate</span>
                                {language === "tr" ? "Çeviri Bağlantısı" : "Translation Link"}
                            </h3>

                            {translation ? (
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs text-muted-foreground">
                                        {language === "tr" ? "Bu yazının çevirisi mevcut:" : "This post has a translation:"}
                                    </span>
                                    <a
                                        href={`${language === "tr" ? "/tr/panel" : "/dashboard"}/manage-blog/${translation.slug}/edit`}
                                        className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg hover:bg-accent border border-border transition-colors text-sm"
                                    >
                                        <div className="w-5 h-5 rounded-sm bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                                            {translation.locale.toUpperCase()}
                                        </div>
                                        <span className="flex-1 font-medium truncate">{translation.title}</span>
                                        <span className="material-symbols-outlined text-sm text-muted-foreground">edit</span>
                                    </a>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <span className="text-xs text-muted-foreground">
                                        {language === "tr"
                                            ? "Bu yazının henüz diğer dilde çevirisi yok."
                                            : "This post doesn't have a translation yet."}
                                    </span>
                                    <a
                                        href={`${language === "tr" ? "/tr/panel" : "/dashboard"}/manage-blog/new?translationGroupId=${initialData?.translationGroupId}`}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-lg text-sm font-bold transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">add</span>
                                        {language === "tr" ? "Çeviri Ekle" : "Add Translation"}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Cover Image */}
                    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                        <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg text-primary">image</span>
                            {language === "tr" ? "Kapak Fotoğrafı" : "Cover Image"}
                        </h3>

                        {coverImage ? (
                            <div className="relative group">
                                <div className="aspect-video rounded-lg overflow-hidden bg-muted border border-border">
                                    <img
                                        src={coverImage}
                                        alt="Cover"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                    <button
                                        type="button"
                                        onClick={() => coverInputRef.current?.click()}
                                        className="px-3 py-1.5 bg-white text-black text-xs font-bold rounded-lg hover:bg-white/90"
                                    >
                                        {language === "tr" ? "Değiştir" : "Change"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCoverImage("")}
                                        className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600"
                                    >
                                        {language === "tr" ? "Kaldır" : "Remove"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => coverInputRef.current?.click()}
                                disabled={uploadingCover}
                                className="w-full aspect-video rounded-lg border-2 border-dashed border-border hover:border-primary/50 bg-muted/30 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                            >
                                {uploadingCover ? (
                                    <span className="animate-spin material-symbols-outlined text-muted-foreground">progress_activity</span>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-2xl text-muted-foreground">cloud_upload</span>
                                        <span className="text-xs text-muted-foreground font-medium">
                                            {language === "tr" ? "Kapak fotoğrafı yükle" : "Upload cover image"}
                                        </span>
                                    </>
                                )}
                            </button>
                        )}

                        <input
                            ref={coverInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleCoverUpload}
                            className="hidden"
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                        <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg text-primary">short_text</span>
                            {language === "tr" ? "Özet" : "Excerpt"}
                        </h3>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            placeholder={
                                language === "tr"
                                    ? "Kısa bir özet yazın (liste sayfasında görünür)..."
                                    : "Write a short excerpt (shown on listing page)..."
                            }
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        />
                    </div>

                    {/* SEO Snippet Editor */}
                    <SeoSnippetEditor
                        seoTitle={seoTitle}
                        seoDescription={seoDescription}
                        slug={slug}
                        locale={locale}
                        onSeoTitleChange={setSeoTitle}
                        onSeoDescriptionChange={setSeoDescription}
                        onSlugChange={(val) => {
                            setSlugManuallyEdited(true);
                            setSlug(val);
                        }}
                        fallbackTitle={title ? `${title} | Approval Stitch` : undefined}
                        fallbackDescription={
                            editorRef.current?.innerText.substring(0, 160).trim() ||
                            content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 160) ||
                            ""
                        }
                    />
                </div>
            </div>

            {/* CSS for empty editor placeholder */}
            <style dangerouslySetInnerHTML={{
                __html: `
                [contenteditable]:empty::before {
                    content: attr(data-placeholder);
                    color: var(--muted-foreground);
                    opacity: 0.5;
                    pointer-events: none;
                }
            `}} />
        </div>
    );
}
