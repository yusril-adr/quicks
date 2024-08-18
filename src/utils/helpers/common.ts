export const capitalizeEachWord = (text: string): string =>
  text
    .split(' ')
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
