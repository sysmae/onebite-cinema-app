import MoviePage from '@/app/movie/[id]/page'
import Modal from '@/components/Modal'

const Page = (props: any) => {
  return (
    <div>
      <Modal>
        <MoviePage {...props} />
      </Modal>
    </div>
  )
}

export default Page
