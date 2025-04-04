import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeTopCoasterFields {
    name: EntryFieldTypes.Symbol;
    park: EntryFieldTypes.Symbol;
    rank: EntryFieldTypes.Integer;
    coasterCloudId: EntryFieldTypes.Symbol;
    parkId: EntryFieldTypes.Integer;
    rideId: EntryFieldTypes.Integer;
    image: EntryFieldTypes.AssetLink;
    description?: EntryFieldTypes.RichText;
}

export type TypeTopCoasterSkeleton = EntrySkeletonType<TypeTopCoasterFields, "topCoaster">;
export type TypeTopCoaster<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTopCoasterSkeleton, Modifiers, Locales>;
