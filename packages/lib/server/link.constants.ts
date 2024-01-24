import type { InsertDomain } from "./domain.schema";
import type { NextGeo } from "./next.schema";
import { raise } from "../utils/raise";

export const BARELY_SHORTLINK_DOMAIN: InsertDomain = {
  domain: "brl.to",
  workspaceId: "",
  type: "link",
  verified: true,
  target: "https://barely.link",
  description: "Barely Link",
  clicks: 0,
} as const;

export const DUMMY_GEO_DATA: NextGeo[] = [
  {
    city: "London",
    region: "England",
    country: "GB",
    latitude: "51.5074",
    longitude: "-0.1278",
  },
  {
    city: "Manchester",
    region: "England",
    country: "GB",
    latitude: "53.4808",
    longitude: "-2.2426",
  },
  {
    city: "Toronto",
    region: "Ontario",
    country: "CA",
    latitude: "43.6532",
    longitude: "-79.3832",
  },
  {
    city: "Sydney",
    region: "New South Wales",
    country: "AU",
    latitude: "-33.8688",
    longitude: "151.2093",
  },
  {
    city: "Auckland",
    region: "Auckland",
    country: "NZ",
    latitude: "-36.8485",
    longitude: "174.7633",
  },
  {
    city: "New York",
    region: "NY",
    country: "US",
    latitude: "40.7128",
    longitude: "74.0060",
  },
  {
    city: "Los Angeles",
    region: "CA",
    country: "US",
    latitude: "34.0522",
    longitude: "118.2437",
  },
  {
    city: "Chicago",
    region: "IL",
    country: "US",
    latitude: "41.8781",
    longitude: "87.6298",
  },
  {
    city: "Houston",
    region: "TX",
    country: "US",
    latitude: "29.7604",
    longitude: "95.3698",
  },
  {
    city: "Phoenix",
    region: "AZ",
    country: "US",
    latitude: "33.4484",
    longitude: "112.0740",
  },
];

export function getRandomGeoData() {
  const randomIndex = Math.floor(Math.random() * DUMMY_GEO_DATA.length);
  console.log("randomIndex => ", randomIndex);
  return DUMMY_GEO_DATA[randomIndex] ?? raise("no geo data");
}

export const ccTLDs = new Set([
  "af",
  "ax",
  "al",
  "dz",
  "as",
  "ad",
  "ao",
  "ai",
  "aq",
  "ag",
  "ar",
  "am",
  "aw",
  "ac",
  "au",
  "at",
  "az",
  "bs",
  "bh",
  "bd",
  "bb",
  "eus",
  "by",
  "be",
  "bz",
  "bj",
  "bm",
  "bt",
  "bo",
  "bq",
  "an",
  "nl",
  "ba",
  "bw",
  "bv",
  "br",
  "io",
  "vg",
  "bn",
  "bg",
  "bf",
  "mm",
  "bi",
  "kh",
  "cm",
  "ca",
  "cv",
  "cat",
  "ky",
  "cf",
  "td",
  "cl",
  "cn",
  "cx",
  "cc",
  "co",
  "km",
  "cd",
  "cg",
  "ck",
  "cr",
  "ci",
  "hr",
  "cu",
  "cw",
  "cy",
  "cz",
  "dk",
  "dj",
  "dm",
  "do",
  "tl",
  "tp",
  "ec",
  "eg",
  "sv",
  "gq",
  "er",
  "ee",
  "et",
  "eu",
  "fk",
  "fo",
  "fm",
  "fj",
  "fi",
  "fr",
  "gf",
  "pf",
  "tf",
  "ga",
  "gal",
  "gm",
  "ps",
  "ge",
  "de",
  "gh",
  "gi",
  "gr",
  "gl",
  "gd",
  "gp",
  "gu",
  "gt",
  "gg",
  "gn",
  "gw",
  "gy",
  "ht",
  "hm",
  "hn",
  "hk",
  "hu",
  "is",
  "in",
  "id",
  "ir",
  "iq",
  "ie",
  "im",
  "il",
  "it",
  "jm",
  "jp",
  "je",
  "jo",
  "kz",
  "ke",
  "ki",
  "kw",
  "kg",
  "la",
  "lv",
  "lb",
  "ls",
  "lr",
  "ly",
  "li",
  "lt",
  "lu",
  "mo",
  "mk",
  "mg",
  "mw",
  "my",
  "mv",
  "ml",
  "mt",
  "mh",
  "mq",
  "mr",
  "mu",
  "yt",
  "mx",
  "md",
  "mc",
  "mn",
  "me",
  "ms",
  "ma",
  "mz",
  "mm",
  "na",
  "nr",
  "np",
  "nl",
  "nc",
  "nz",
  "ni",
  "ne",
  "ng",
  "nu",
  "nf",
  "nc",
  "tr",
  "kp",
  "mp",
  "no",
  "om",
  "pk",
  "pw",
  "ps",
  "pa",
  "pg",
  "py",
  "pe",
  "ph",
  "pn",
  "pl",
  "pt",
  "pr",
  "qa",
  "ro",
  "ru",
  "rw",
  "re",
  "bq",
  "an",
  "bl",
  "gp",
  "fr",
  "sh",
  "kn",
  "lc",
  "mf",
  "gp",
  "fr",
  "pm",
  "vc",
  "ws",
  "sm",
  "st",
  "sa",
  "sn",
  "rs",
  "sc",
  "sl",
  "sg",
  "bq",
  "an",
  "nl",
  "sx",
  "an",
  "sk",
  "si",
  "sb",
  "so",
  "so",
  "za",
  "gs",
  "kr",
  "ss",
  "es",
  "lk",
  "sd",
  "sr",
  "sj",
  "sz",
  "se",
  "ch",
  "sy",
  "tw",
  "tj",
  "tz",
  "th",
  "tg",
  "tk",
  "to",
  "tt",
  "tn",
  "tr",
  "tm",
  "tc",
  "tv",
  "ug",
  "ua",
  "ae",
  "uk",
  "us",
  "vi",
  "uy",
  "uz",
  "vu",
  "va",
  "ve",
  "vn",
  "wf",
  "eh",
  "ma",
  "ye",
  "zm",
  "zw",
]);
