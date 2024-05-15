import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeProject'
 * @name TypeProjectFields
 * @type {TypeProjectFields}
 * @memberof TypeProject
 */
export interface TypeProjectFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'slogan' (Slogan)
     * @name Slogan
     * @localized false
     */
    slogan?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'slug' (Slug)
     * @name Slug
     * @localized false
     */
    slug?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'projectUrl' (ProjectUrl)
     * @name ProjectUrl
     * @localized false
     */
    projectUrl?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'headerImage' (HeaderImage)
     * @name HeaderImage
     * @localized false
     */
    headerImage?: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'icon' (Icon)
     * @name Icon
     * @localized false
     */
    icon?: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'startDate' (StartDate)
     * @name StartDate
     * @localized false
     */
    startDate?: EntryFieldTypes.Date;
    /**
     * Field type definition for field 'status' (Status)
     * @name Status
     * @localized false
     */
    status: EntryFieldTypes.Symbol<"Active" | "Deprecated" | "Maintenance">;
    /**
     * Field type definition for field 'type' (Type)
     * @name Type
     * @localized false
     */
    type?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"Kommerziell" | "Open Source" | "Privates Projekt">>;
    /**
     * Field type definition for field 'heroProject' (Hero Project)
     * @name Hero Project
     * @localized false
     */
    heroProject?: EntryFieldTypes.Boolean;
    /**
     * Field type definition for field 'shortDescription' (ShortDescription)
     * @name ShortDescription
     * @localized false
     */
    shortDescription?: EntryFieldTypes.Text;
    /**
     * Field type definition for field 'description' (Description)
     * @name Description
     * @localized false
     */
    description?: EntryFieldTypes.RichText;
}

/**
 * Entry skeleton type definition for content type 'project' (Project)
 * @name TypeProjectSkeleton
 * @type {TypeProjectSkeleton}
 * @author 28mgw17I1VwQrLItWVp25J
 * @since 2023-02-24T16:03:15.813Z
 * @version 25
 */
export type TypeProjectSkeleton = EntrySkeletonType<TypeProjectFields, "project">;
/**
 * Entry type definition for content type 'project' (Project)
 * @name TypeProject
 * @type {TypeProject}
 * @author Patrick Arns<contentful@patrick-arns.de>
 * @since 2023-02-24T16:03:15.813Z
 * @version 25
 * @link https://app.contentful.com/spaces/1hyew6sbxidu/environments/master/content_types/project
 */
export type TypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProjectSkeleton, Modifiers, Locales>;
