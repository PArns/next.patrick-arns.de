import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSocialMediaLinkFields {
    name?: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    icon?: EntryFieldTypes.AssetLink;
    link?: EntryFieldTypes.Symbol;
    order?: EntryFieldTypes.Integer;
}

export type TypeSocialMediaLinkSkeleton = EntrySkeletonType<TypeSocialMediaLinkFields, "socialMediaLink">;
export type TypeSocialMediaLink<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSocialMediaLinkSkeleton, Modifiers, Locales>;
