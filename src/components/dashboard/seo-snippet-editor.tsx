"use client";

import { useState, useEffect } from "react";

interface SeoSnippetEditorProps {
    seoTitle: string;
    seoDescription: string;
    slug: string;
    siteUrl?: string;
    locale: string;
    onSeoTitleChange: (value: string) => void;
    onSeoDescriptionChange: (value: string) => void;
    onSlugChange: (value: string) => void;
    fallbackTitle?: string;
    fallbackDescription?: string;
}

export function SeoSnippetEditor({
    seoTitle,
    seoDescription,
    slug,
    siteUrl = "www.approvalstitch.com",
    locale,
    onSeoTitleChange,
    onSeoDescriptionChange,
    onSlugChange,
    fallbackTitle,
    fallbackDescription,
}: SeoSnippetEditorProps) {
    const [isEditing, setIsEditing] = useState(false);

    const displayTitle = seoTitle || fallbackTitle || "Post Title | Approval Stitch";
    const displayDescription = seoDescription || fallbackDescription || "Enter a meta description for better search engine visibility...";
    const displayUrl = `${siteUrl}/${locale === "tr" ? "tr/" : ""}blog/${slug || "your-post-slug"}`;

    const titleLength = seoTitle.length;
    const descLength = seoDescription.length;
    const titleMax = 60;
    const descMax = 160;

    return (
        <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">search</span>
                    <h3 className="font-bold text-sm text-foreground">SEO Preview</h3>
                </div>
                <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-xs font-medium text-primary hover:underline"
                >
                    {isEditing ? "Close Editor" : "Edit Snippet"}
                </button>
            </div>

            {/* Google Preview */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                <div className="text-xs text-[#202124] dark:text-zinc-400 font-normal mb-1 flex items-center gap-1.5">
                    <div className="w-[18px] h-[18px] rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-blue-700 dark:text-blue-300">AS</span>
                    </div>
                    <span className="truncate">{displayUrl}</span>
                </div>
                <h3 className="text-[#1a0dab] dark:text-blue-400 text-xl font-normal leading-snug mb-1 cursor-pointer hover:underline line-clamp-1">
                    {displayTitle}
                </h3>
                <p className="text-[#4d5156] dark:text-zinc-400 text-sm leading-relaxed line-clamp-2">
                    {displayDescription}
                </p>
            </div>

            {/* Editor Fields */}
            {isEditing && (
                <div className="mt-4 space-y-4 pt-4 border-t border-border">
                    {/* SEO Title */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-semibold text-foreground">SEO Title</label>
                            <span
                                className={`text-xs font-mono ${titleLength > titleMax
                                    ? "text-red-500"
                                    : titleLength > titleMax - 10
                                        ? "text-amber-500"
                                        : "text-muted-foreground"
                                    }`}
                            >
                                {titleLength}/{titleMax}
                            </span>
                        </div>
                        <input
                            type="text"
                            value={seoTitle}
                            onChange={(e) => onSeoTitleChange(e.target.value)}
                            placeholder={fallbackTitle || "Enter SEO title (recommended: 50-60 chars)"}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-12"
                        />
                        <div className="mt-1 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${titleLength > titleMax
                                    ? "bg-red-500"
                                    : titleLength > titleMax - 10
                                        ? "bg-amber-500"
                                        : "bg-emerald-500"
                                    }`}
                                style={{ width: `${Math.min(100, (titleLength / titleMax) * 100)}%` }}
                            />
                        </div>
                    </div>

                    {/* URL Slug */}
                    <div>
                        <label className="text-xs font-semibold text-foreground mb-1.5 block">URL Slug</label>
                        <div className="flex items-center gap-0 rounded-lg border border-border overflow-hidden">
                            <span className="px-3 py-2 bg-muted text-xs text-muted-foreground whitespace-nowrap border-r border-border">
                                /{locale === "tr" ? "tr/" : ""}blog/
                            </span>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => {
                                    const cleaned = e.target.value
                                        .toLowerCase()
                                        .replace(/[^a-z0-9-]/g, "-")
                                        .replace(/-+/g, "-");
                                    onSlugChange(cleaned);
                                }}
                                placeholder="your-post-slug"
                                className="flex-1 px-3 py-2 bg-background text-sm focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* SEO Description */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-semibold text-foreground">Meta Description</label>
                            <span
                                className={`text-xs font-mono ${descLength > descMax
                                    ? "text-red-500"
                                    : descLength > descMax - 20
                                        ? "text-amber-500"
                                        : "text-muted-foreground"
                                    }`}
                            >
                                {descLength}/{descMax}
                            </span>
                        </div>
                        <textarea
                            value={seoDescription}
                            onChange={(e) => onSeoDescriptionChange(e.target.value)}
                            placeholder={fallbackDescription || "Enter meta description (recommended: 120-160 chars)"}
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        />
                        <div className="mt-1 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${descLength > descMax
                                    ? "bg-red-500"
                                    : descLength > descMax - 20
                                        ? "bg-amber-500"
                                        : "bg-emerald-500"
                                    }`}
                                style={{ width: `${Math.min(100, (descLength / descMax) * 100)}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
