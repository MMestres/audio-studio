import { type PlayListItemSummary } from '@/types/PlayListItemSummary'
import { type PlaylistItem } from '@/types/PlaylistItem'

export const getPlaylistVideos = async (playlistId: string): Promise<PlayListItemSummary[]> => {
  const API_KEY = process.env.YOUTUBE_API_KEY ?? ''
  const youtubeBaseUrl = 'https://www.youtube.com/watch?v='
  const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${API_KEY}&maxResults=50`
    )

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    const videoInfo = data.items.map((video: PlaylistItem) => ({
      videoId: video.snippet.resourceId.videoId,
      thumbnailUrl: video.snippet.thumbnails.default.url,
      title: video.snippet.title,
      channelTitle: video.snippet.channelTitle,
      description: video.snippet.description,
      videoUrl: `${youtubeBaseUrl}${video.snippet.resourceId.videoId}`,
      playlistUrl
    }))

    return videoInfo
  } catch (error) {
    console.error('Error al obtener la lista de reproducción:', error)
    throw error
  }
}
