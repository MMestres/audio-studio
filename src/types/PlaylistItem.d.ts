export interface PlaylistItem {
  id: string
  snippet: {
    resourceId: {
      videoId: string
    }
    thumbnails: {
      default: {
        url: string
      }
    }
    title: string
    channelTitle: string
    description: string
  }
}
