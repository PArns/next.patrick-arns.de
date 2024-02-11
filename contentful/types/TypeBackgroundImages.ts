import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeBackgroundImagesFields {
    name?: EntryFieldTypes.Symbol;
    position: EntryFieldTypes.Symbol<"Bottom" | "Center" | "Top">;
    image?: EntryFieldTypes.AssetLink;
}

export type TypeBackgroundImagesSkeleton = EntrySkeletonType<TypeBackgroundImagesFields, "backgroundImages">;
export type TypeBackgroundImages<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBackgroundImagesSkeleton, Modifiers, Locales>;
