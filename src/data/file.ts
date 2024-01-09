import ImageKit from 'imagekit'

function getImageKit () {
  return new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY ?? '',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? '',
    urlEndpoint: process.env.IMAGEKIT_URL ?? ''
  })
}

export async function uploadFile (file: unknown, filename: string) {
  const imageKit = getImageKit()

  const fileupload = await imageKit.upload({
    file: file as string,
    fileName: filename
  })

  return {
    url: fileupload.url,
    id: fileupload.fileId
  }
}

export async function deleteFile (filename: string) {
  const imageKit = getImageKit()
  const files = await imageKit.listFiles({
    searchQuery: `name = "${filename.split('/').pop()}"`
  })

  if (files.length > 0) {
    try {
      await imageKit.deleteFile(files[0].fileId)
    } catch {
      console.log('Failed to delete file', filename)
    }
  }
}
