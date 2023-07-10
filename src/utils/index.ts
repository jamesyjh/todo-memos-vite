export const getMemoSlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-");

export enum colors {
  YELLOW = "#fcffcd",
  GREEN = "#8fffb1",
  PINK = "#efa5ca",
  PURPLE = "#cea3ff",
  BLUE = "#cdf2ff",
  DEFAULT = "#efefef",
}

export const colorMap = {
  yellow: colors.YELLOW,
  green: colors.GREEN,
  pink: colors.PINK,
  purple: colors.PURPLE,
  blue: colors.BLUE,
  default: colors.DEFAULT,
};

export type ColorMap = {
  yellow: string;
  green: string;
  pink: string;
  purple: string;
  blue: string;
  default: string;
};

export type ColorMapKey = keyof ColorMap;

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: tzid,
  };

  return date.toLocaleString("en-US", options);
};
