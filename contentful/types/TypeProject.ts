import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeProjectFields {
    name?: EntryFieldTypes.Symbol;
    slogan?: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    projectUrl?: EntryFieldTypes.Symbol;
    headerImage?: EntryFieldTypes.AssetLink;
    icon?: EntryFieldTypes.AssetLink;
    startDate?: EntryFieldTypes.Date;
    status: EntryFieldTypes.Symbol<"Active" | "Deprecated" | "Maintenance">;
    type?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"Kommerziell" | "Open Source" | "Privates Projekt">>;
    heroProject?: EntryFieldTypes.Boolean;
    shortDescription?: EntryFieldTypes.Text;
    description?: EntryFieldTypes.RichText;
}

export type TypeProjectSkeleton = EntrySkeletonType<TypeProjectFields, "project">;
export type TypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProjectSkeleton, Modifiers, Locales>;
