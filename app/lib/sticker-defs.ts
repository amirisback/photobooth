// ─── PhotoBooth Pro: Sticker Definitions ─────────────────────────────────────
// Stickers from https://github.com/amirisback/photo-panda-bear-dudu-bubu

export interface StickerDef {
  id: string;
  label: string;
  src: string; // path relative to /stickers/
}

export const stickers: StickerDef[] = [
  { id: "bear-happy", label: "Happy Bear", src: "/stickers/bear-happy-dancing-self.gif" },
  { id: "bear-kissed", label: "Bear Kiss", src: "/stickers/bear-kissed.gif" },
  { id: "bear-smile", label: "Bear Smile", src: "/stickers/bear-senyum-lebar.gif" },
  { id: "bear-angry", label: "Bear Angry", src: "/stickers/bear-angry.gif" },
  { id: "bear-annoying", label: "Bear Annoyed", src: "/stickers/bear-annoying.gif" },
  { id: "bear-balloon", label: "Bear Balloon", src: "/stickers/bear-bawa-palu-balon.gif" },
  { id: "bear-bath", label: "Bear Bath", src: "/stickers/bear-berendam-air-panas.gif" },
  { id: "bear-cliff", label: "Bear Cliff", src: "/stickers/bear-berdiri-di-tebing.gif" },
  { id: "bubu-happy", label: "Bubu Happy", src: "/stickers/bubu-happy.gif" },
  { id: "bubu-walk", label: "Bubu Walk", src: "/stickers/bubu-walk.gif" },
  { id: "bubu-eat", label: "Bubu Eat", src: "/stickers/bubu-eat.gif" },
  { id: "dudu-walk", label: "Dudu Walk", src: "/stickers/dudu-walk.gif" },
  { id: "dudu-eat", label: "Dudu Eat", src: "/stickers/dudu-eat.gif" },
];
