import { useContext } from "react";
import { SongContext } from "../Song.Context";
import { getsong } from "../services/song.api";

export const useSong = () => {

  const context = useContext(SongContext);

  const { song, setsong } = context;

  async function handlesong(mood) {
    try {
      const response = await getsong({ mood });
      console.log(response.song);
      setsong(response.song);
    } catch (error) {
      console.log(error);
    }
  }

  return { song, handlesong };
};