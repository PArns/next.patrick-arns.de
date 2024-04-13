import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeBlogPostImage'
 * @name TypeBlogPostImageFields
 * @type {TypeBlogPostImageFields}
 * @memberof TypeBlogPostImage
 */
export interface TypeBlogPostImageFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized true
     */
    name?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'image' (Image)
     * @name Image
     * @localized false
     */
    image: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'showSubtitle' (Show subtitle)
     * @name Show subtitle
     * @localized false
     */
    showSubtitle?: EntryFieldTypes.Boolean;
    /**
     * Field type definition for field 'useDefaultStyle' (Use default Style)
     * @name Use default Style
     * @localized false
     */
    useDefaultStyle?: EntryFieldTypes.Boolean;
    /**
     * Field type definition for field 'useLightBox' (LightBox)
     * @name LightBox
     * @localized false
     */
    useLightBox?: EntryFieldTypes.Boolean;
    /**
     * Field type definition for field 'floatingDirection' (Float)
     * @name Float
     * @localized false
     */
    floatingDirection?: EntryFieldTypes.Symbol<"Left" | "None" | "Right">;
    /**
     * Field type definition for field 'maxWidth' (Max Width)
     * @name Max Width
     * @localized false
     */
    maxWidth: EntryFieldTypes.Integer;
    /**
     * Field type definition for field 'classes' (Classes)
     * @name Classes
     * @localized false
     */
    classes?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    /**
     * Field type definition for field 'imageClasses' (Image Classes)
     * @name Image Classes
     * @localized false
     */
    imageClasses?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    /**
     * Field type definition for field 'styles' (Styles)
     * @name Styles
     * @localized false
     */
    styles?: EntryFieldTypes.Object;
}

/**
 * Entry skeleton type definition for content type 'blogPostImage' (Blog Post Image)
 * @name TypeBlogPostImageSkeleton
 * @type {TypeBlogPostImageSkeleton}
 * @author 28mgw17I1VwQrLItWVp25J
 * @since 2023-02-12T11:29:06.508Z
 * @version 37
 */
export type TypeBlogPostImageSkeleton = EntrySkeletonType<TypeBlogPostImageFields, "blogPostImage">;
/**
 * Entry type definition for content type 'blogPostImage' (Blog Post Image)
 * @name TypeBlogPostImage
 * @type {TypeBlogPostImage}
 * @author Patrick Arns<contentful@patrick-arns.de>
 * @since 2023-02-12T11:29:06.508Z
 * @version 37
 * @link https://app.contentful.com/spaces/1hyew6sbxidu/environments/master/content_types/blogPostImage
 */
export type TypeBlogPostImage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBlogPostImageSkeleton, Modifiers, Locales>;
