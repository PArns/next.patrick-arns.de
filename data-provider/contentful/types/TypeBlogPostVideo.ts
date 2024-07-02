import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeBlogPostVideoFields {
    title: EntryFieldTypes.Symbol;
    videoUrl: EntryFieldTypes.Symbol;
}

export type TypeBlogPostVideoSkeleton = EntrySkeletonType<TypeBlogPostVideoFields, "blogPostVideo">;
export type TypeBlogPostVideo<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeBlogPostVideoSkeleton, Modifiers, Locales>;
