import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeBackgroundImages'
 * @name TypeBackgroundImagesFields
 * @type {TypeBackgroundImagesFields}
 * @memberof TypeBackgroundImages
 */
export interface TypeBackgroundImagesFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'position' (Position)
     * @name Position
     * @localized false
     */
    position: EntryFieldTypes.Symbol<"Bottom" | "Center" | "Top">;
    /**
     * Field type definition for field 'image' (Image)
     * @name Image
     * @localized false
     */
    image?: EntryFieldTypes.AssetLink;
}

/**
 * Entry skeleton type definition for content type 'backgroundImages' (Background Images)
 * @name TypeBackgroundImagesSkeleton
 * @type {TypeBackgroundImagesSkeleton}
 * @author 28mgw17I1VwQrLItWVp25J
 * @since 2022-05-27T15:02:15.459Z
 * @version 11
 */
export type TypeBackgroundImagesSkeleton = EntrySkeletonType<TypeBackgroundImagesFields, "backgroundImages">;
/**
 * Entry type definition for content type 'backgroundImages' (Background Images)
 * @name TypeBackgroundImages
 * @type {TypeBackgroundImages}
 * @author Patrick Arns<contentful@patrick-arns.de>
 * @since 2022-05-27T15:02:15.459Z
 * @version 11
 * @link https://app.contentful.com/spaces/1hyew6sbxidu/environments/master/content_types/backgroundImages
 */
export type TypeBackgroundImages<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBackgroundImagesSkeleton, Modifiers, Locales>;
