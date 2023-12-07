import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeBlogPostImageFields {
    name?: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
    showSubtitle?: EntryFieldTypes.Boolean;
    useDefaultStyle?: EntryFieldTypes.Boolean;
    useLightBox?: EntryFieldTypes.Boolean;
    floatingDirection?: EntryFieldTypes.Symbol<"Left" | "None" | "Right">;
    maxWidth: EntryFieldTypes.Integer;
    classes?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    imageClasses?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    styles?: EntryFieldTypes.Object;
}

export type TypeBlogPostImageSkeleton = EntrySkeletonType<TypeBlogPostImageFields, "blogPostImage">;
export type TypeBlogPostImage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBlogPostImageSkeleton, Modifiers, Locales>;
