import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeBlogPostVideo'
 * @name TypeBlogPostVideoFields
 * @type {TypeBlogPostVideoFields}
 * @memberof TypeBlogPostVideo
 */
export interface TypeBlogPostVideoFields {
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized true
     */
    title: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'videoUrl' (VideoUrl)
     * @name VideoUrl
     * @localized true
     */
    videoUrl: EntryFieldTypes.Symbol;
}

/**
 * Entry skeleton type definition for content type 'blogPostVideo' (Blog Post Video)
 * @name TypeBlogPostVideoSkeleton
 * @type {TypeBlogPostVideoSkeleton}
 * @author 28mgw17I1VwQrLItWVp25J
 * @since 2024-04-13T09:14:50.409Z
 * @version 1
 */
export type TypeBlogPostVideoSkeleton = EntrySkeletonType<TypeBlogPostVideoFields, "blogPostVideo">;
/**
 * Entry type definition for content type 'blogPostVideo' (Blog Post Video)
 * @name TypeBlogPostVideo
 * @type {TypeBlogPostVideo}
 * @author Patrick Arns<contentful@patrick-arns.de>
 * @since 2024-04-13T09:14:50.409Z
 * @version 1
 * @link https://app.contentful.com/spaces/1hyew6sbxidu/environments/master/content_types/blogPostVideo
 */
export type TypeBlogPostVideo<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBlogPostVideoSkeleton, Modifiers, Locales>;
