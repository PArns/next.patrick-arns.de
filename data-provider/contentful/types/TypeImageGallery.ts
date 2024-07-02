import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeImageGalleryFields {
    name: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    date?: EntryFieldTypes.Date;
    description?: EntryFieldTypes.Text;
    expandableInBlog: EntryFieldTypes.Boolean;
    teaserImage?: EntryFieldTypes.AssetLink;
    images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeImageGallerySkeleton = EntrySkeletonType<TypeImageGalleryFields, "imageGallery">;
export type TypeImageGallery<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeImageGallerySkeleton, Modifiers, Locales>;
