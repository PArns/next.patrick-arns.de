import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeSocialMediaLink'
 * @name TypeSocialMediaLinkFields
 * @type {TypeSocialMediaLinkFields}
 * @memberof TypeSocialMediaLink
 */
export interface TypeSocialMediaLinkFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized false
     */
    title?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'icon' (Icon)
     * @name Icon
     * @localized false
     */
    icon?: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'link' (Link)
     * @name Link
     * @localized false
     */
    link?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'order' (Order)
     * @name Order
     * @localized false
     */
    order?: EntryFieldTypes.Integer;
}

/**
 * Entry skeleton type definition for content type 'socialMediaLink' (Social Media Link)
 * @name TypeSocialMediaLinkSkeleton
 * @type {TypeSocialMediaLinkSkeleton}
 * @author 28mgw17I1VwQrLItWVp25J
 * @since 2023-02-10T16:43:08.742Z
 * @version 9
 */
export type TypeSocialMediaLinkSkeleton = EntrySkeletonType<TypeSocialMediaLinkFields, "socialMediaLink">;
/**
 * Entry type definition for content type 'socialMediaLink' (Social Media Link)
 * @name TypeSocialMediaLink
 * @type {TypeSocialMediaLink}
 * @author Patrick Arns<contentful@patrick-arns.de>
 * @since 2023-02-10T16:43:08.742Z
 * @version 9
 * @link https://app.contentful.com/spaces/1hyew6sbxidu/environments/master/content_types/socialMediaLink
 */
export type TypeSocialMediaLink<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSocialMediaLinkSkeleton, Modifiers, Locales>;
