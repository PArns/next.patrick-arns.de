import PageBaseConfiguration from "@/configuration";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

import "@/app/globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export function generateMetadata(): Metadata {
  const config = PageBaseConfiguration();

  return {
    title: {
      default: config.title,
      template: `%s | ${config.title}`,
    },
    description: config.description,
    generator: "Next.js",
    creator: "Patrick Arns",
    publisher: config.publisher,
    metadataBase: config.baseUrl,
    alternates: {
      languages: {
        de: config.baseUrl + "de",
        en: config.baseUrl + "en",
      },
    },
    openGraph: {
      type: "website",
      title: config.title,
      description: config.description,
      locale: config.defaultLocale,
      url: config.baseUrl,
      siteName: config.title,
    },
  };
}

const HTML_COMMENT = `<!-- 

                                                                                                           dddddddd                                           
               AAA                                                                                         d::::::d                                           
              A:::A                                                                                        d::::::d                                           
             A:::::A                                                                                       d::::::d                                           
            A:::::::A                                                                                      d:::::d                                            
           A:::::::::A          rrrrr   rrrrrrrrr   nnnn  nnnnnnnn        ssssssssss               ddddddddd:::::d     eeeeeeeeeeee  vvvvvvv           vvvvvvv
          A:::::A:::::A         r::::rrr:::::::::r  n:::nn::::::::nn    ss::::::::::s            dd::::::::::::::d   ee::::::::::::ee v:::::v         v:::::v 
         A:::::A A:::::A        r:::::::::::::::::r n::::::::::::::nn ss:::::::::::::s          d::::::::::::::::d  e::::::eeeee:::::eev:::::v       v:::::v  
        A:::::A   A:::::A       rr::::::rrrrr::::::rnn:::::::::::::::ns::::::ssss:::::s        d:::::::ddddd:::::d e::::::e     e:::::e v:::::v     v:::::v   
       A:::::A     A:::::A       r:::::r     r:::::r  n:::::nnnn:::::n s:::::s  ssssss         d::::::d    d:::::d e:::::::eeeee::::::e  v:::::v   v:::::v    
      A:::::AAAAAAAAA:::::A      r:::::r     rrrrrrr  n::::n    n::::n   s::::::s              d:::::d     d:::::d e:::::::::::::::::e    v:::::v v:::::v     
     A:::::::::::::::::::::A     r:::::r              n::::n    n::::n      s::::::s           d:::::d     d:::::d e::::::eeeeeeeeeee      v:::::v:::::v      
    A:::::AAAAAAAAAAAAA:::::A    r:::::r              n::::n    n::::nssssss   s:::::s         d:::::d     d:::::d e:::::::e                v:::::::::v       
   A:::::A             A:::::A   r:::::r              n::::n    n::::ns:::::ssss::::::s        d::::::ddddd::::::dde::::::::e                v:::::::v        
  A:::::A               A:::::A  r:::::r              n::::n    n::::ns::::::::::::::s  ......  d:::::::::::::::::d e::::::::eeeeeeee         v:::::v         
 A:::::A                 A:::::A r:::::r              n::::n    n::::n s:::::::::::ss   .::::.   d:::::::::ddd::::d  ee:::::::::::::e          v:::v          
AAAAAAA                   AAAAAAArrrrrrr              nnnnnn    nnnnnn  sssssssssss     ......    ddddddddd   ddddd    eeeeeeeeeeeeee           vvv      

✨ arns.dev - Handcrafted with passion by Patrick Arns ✨

This page was built entirely from scratch using Next.js, TypeScript, a lot of love, and fun! 💻❤️🎉
I've used this project to deepen my knowledge of Next.js, polish my TypeScript skills, and reignite my Node.js expertise. 🚀👨‍💻
Of course, it's open source! If you want to see how this project is done, just visit: 📂https://github.com/PArns/next.patrick-arns.de

If you're from an amusement park or ride manufacturer 🎢 and have stumbled upon this page (and you like what you see), I'd love to hear from you! 🎡✨

Drop me a line at: 💌 your-page-is-awesome@arns.dev 📧 

-->`;

export default async function RootLayout({
  children,
  language,
}: {
  children: React.ReactNode;
  language?: string;
}) {
  return (
    <html suppressHydrationWarning lang={language}>
      <body className="overflow-hidden overscroll-none bg-neutral-200 subpixel-antialiased dark:bg-neutral-900">
        <ThemeProvider attribute="class">{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />

        <div dangerouslySetInnerHTML={{ __html: HTML_COMMENT }} />
      </body>
    </html>
  );
}
