import { Empty } from 'antd'
import './NotFound.css'

export const NotFound = () => {
  return (
    <main className='notFound__main'>
      <h1>Error 404</h1>
      <Empty description='Página en construcción' />
    </main>
  )
}
