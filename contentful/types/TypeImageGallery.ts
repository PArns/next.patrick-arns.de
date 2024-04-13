import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeImageGallery'
 * @name TypeImageGalleryFields
 * @type {TypeImageGalleryFields}
 * @memberof TypeImageGallery
 */
export interface TypeImageGalleryFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized true
     */
    name: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'slug' (Slug)
     * @name Slug
     * @localized true
     */
    slug?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'date' (Date)
     * @name Date
     * @localized false
     */
    date?: EntryFieldTypes.Date;
    /**
     * Field type definition for field 'description' (Description)
     * @name Description
     * @localized true
     */
    description?: EntryFieldTypes.Text;
    /**
     * Field type definition for field 'expandableInBlog' (Expandable in Blog)
     * @name Expandable in Blog
     * @localized false
     */
    expandableInBlog: EntryFieldTypes.Boolean;
    /**
     * Field type definition for field 'teaserImage' (TeaserImage)
     * @name TeaserImage
     * @localized false
     */
    teaserImage?: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'images' (Images)
     * @name Images
     * @localized false
     */
    images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

/**
 * Entry skeleton type definition for content type 'imageGallery' (Image Gallery)
 * @name TypeImageGallerySkeleton
 * @type {TypeImageGallerySkeleton}
 * @author 28mgw17I1VwQrLItWVp25J
 * @since 2023-02-10T18:33:21.266Z
 * @version 15
 */
export type TypeImageGallerySkeleton = EntrySkeletonType<TypeImageGalleryFields, "imageGallery">;
/**
 * Entry type definition for content type 'imageGallery' (Image Gallery)
 * @name TypeImageGallery
 * @type {TypeImageGallery}
 * @author Patrick Arns<contentful@patrick-arns.de>
 * @since 2023-02-10T18:33:21.266Z
 * @version 15
 * @link https://app.contentful.com/spaces/1hyew6sbxidu/environments/master/content_types/imageGallery
 */
export type TypeImageGallery<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeImageGallerySkeleton, Modifiers, Locales>;
