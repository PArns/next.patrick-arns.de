interface ITranslation {
  lang: string;
  children: React.ReactNode;
}

export default function TranslateSwitch({
  locale,
  children,
}: {
  locale: string;
  children: Array<React.ReactElement<ITranslation>>;
}) {
  const renderChildren = children.map((child) => {
    if (child.props.lang === locale) {
      return child;
    }
  });

  if (renderChildren === undefined)
    return (
      <>
        TRANSLATION FOR {locale} COULD NOT BE FOUND! PLEASE ADD A &lt;Translate
        lang=&ldquo;{locale}&ldquo;&gt;Some children&lt;/Translate&gt;
        component!
      </>
    );

  return <>{renderChildren}</>;
}

export const Translation: React.FunctionComponent<ITranslation> = ({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};
