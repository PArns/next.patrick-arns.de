import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeTopParksFields {
    name: EntryFieldTypes.Symbol;
    rank: EntryFieldTypes.Integer;
    image: EntryFieldTypes.AssetLink;
    description?: EntryFieldTypes.RichText;
}

export type TypeTopParksSkeleton = EntrySkeletonType<TypeTopParksFields, "topParks">;
export type TypeTopParks<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTopParksSkeleton, Modifiers, Locales>;
