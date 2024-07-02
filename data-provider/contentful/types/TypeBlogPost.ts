import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeBlogPostFields {
    title?: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    subTitle?: EntryFieldTypes.Symbol;
    publishedAt: EntryFieldTypes.Date;
    translations?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"DE" | "EN">>;
    listEntry: EntryFieldTypes.Boolean;
    image: EntryFieldTypes.AssetLink;
    body: EntryFieldTypes.RichText;
    excerpt: EntryFieldTypes.Text;
    relatesTo?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeBlogPostSkeleton>>;
}

export type TypeBlogPostSkeleton = EntrySkeletonType<TypeBlogPostFields, "blogPost">;
export type TypeBlogPost<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;
