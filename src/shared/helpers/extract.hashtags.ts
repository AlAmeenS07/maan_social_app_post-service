
export const extractHashtags = (content: string): string[] => {

  const matches =
    content.match(/#(\w+)/g) || [];

  return [
    ...new Set(
      matches.map(tag =>
        tag
          .replace("#", "")
          .toLowerCase()
      )
    )
  ];
};