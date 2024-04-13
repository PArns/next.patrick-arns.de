import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeBlogPost'
 * @name TypeBlogPostFields
 * @type {TypeBlogPostFields}
 * @memberof TypeBlogPost
 */
export interface TypeBlogPostFields {
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized true
     */
    title?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'slug' (Slug)
     * @name Slug
     * @localized true
     */
    slug: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'subTitle' (Sub Title)
     * @name Sub Title
     * @localized true
     */
    subTitle?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'publishedAt' (Published at)
     * @name Published at
     * @localized false
     */
    publishedAt: EntryFieldTypes.Date;
    /**
     * Field type definition for field 'translations' (Translations)
     * @name Translations
     * @localized false
     */
    translations?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"DE" | "EN">>;
    /**
     * Field type definition for field 'listEntry' (List entry)
     * @name List entry
     * @localized false
     */
    listEntry: EntryFieldTypes.Boolean;
    /**
     * Field type definition for field 'image' (Image)
     * @name Image
     * @localized false
     */
    image: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'body' (Body)
     * @name Body
     * @localized true
     */
    body: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'excerpt' (Excerpt)
     * @name Excerpt
     * @localized true
     */
    excerpt: EntryFieldTypes.Text;
}

/**
 * Entry skeleton type definition for content type 'blogPost' (Blog Post)
 * @name TypeBlogPostSkeleton
 * @type {TypeBlogPostSkeleton}
 * @author 28mgw17I1VwQrLItWVp25J
 * @since 2023-01-20T16:33:53.681Z
 * @version 37
 */
export type TypeBlogPostSkeleton = EntrySkeletonType<TypeBlogPostFields, "blogPost">;
/**
 * Entry type definition for content type 'blogPost' (Blog Post)
 * @name TypeBlogPost
 * @type {TypeBlogPost}
 * @author Patrick Arns<contentful@patrick-arns.de>
 * @since 2023-01-20T16:33:53.681Z
 * @version 37
 * @link https://app.contentful.com/spaces/1hyew6sbxidu/environments/master/content_types/blogPost
 */
export type TypeBlogPost<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;
