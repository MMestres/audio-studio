import { getHomeBanner } from '@/data/home'
import FormHomeBanner from './FormHomeBanner'

export default async function DashHomeBanner () {
  const homeBanner = await getHomeBanner()

  return <FormHomeBanner homeBanner={homeBanner} />
}
