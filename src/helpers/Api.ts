import { AnimeInterface } from "../interfaces/anime-interface";
import { CharacterInterface } from "../interfaces/character-interface";
import { CompareRecInterface } from "../interfaces/compareRec-interface";

const link: string = "https://api.jikan.moe/v4/";

export const getSearchResults = async (request: string | null) => {
  return await fetch(`${link}anime?q=${request}`)
                .then(res => res.json())
                .then(res => res.data);
}

export const getSingleAnime = async (id: string | undefined) => {
  if (id) return await fetch(`${link}anime/${id}`)
                        .then(res => res.json())
                        .then(res => res.data)
}

export const getRecomendations = async (id: string | undefined) => {
  if (id) return await fetch(`${link}anime/${id}/recommendations`)
                        .then(res => res.json())
                        .then(res => res.data.slice(0, 4))
}

export const getRandomAnime = async (): Promise<AnimeInterface> => {
  return await fetch(`${link}random/anime`)
                .then(res => res.json())
                .then(res => res.data)
}

export const getTopAnimes = async (): Promise<AnimeInterface[]> => {
  return await fetch(`${link}top/anime`)
                .then(res => res.json())
                .then(res => res.data.slice(0, 18))
}

export const getTopCharacters = async (): Promise<CharacterInterface[]> => {
  return await fetch(`${link}top/characters`)
                .then(res => res.json())
                .then(res => res.data.slice(0, 4))
}

export const getCompareRecomendations = async (): Promise<CompareRecInterface[]> => {
  return await fetch(`${link}recommendations/anime`)
                .then(res => res.json())
                .then(res => res.data)
}