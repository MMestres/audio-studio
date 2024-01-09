import { getHomeComment } from '@/data/home'
import FormHomeComments from './FormHomeComments'

export default async function DashHomeComment () {
  const homeComments = await getHomeComment()

  return <FormHomeComments homeComment={homeComments} />
}
