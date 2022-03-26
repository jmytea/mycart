import React, {memo} from 'react'
import { Link } from 'react-router-dom'

function NewGoods({data}) {
  return (
    <div className="new-goods">
      {
        data.map(item=>(
          <div className="new-goods-item" key={item.get('id')}>
            <img src={item.get('picUrl')} alt=""/>
            <Link to={{
              pathname: '/detail/'+item.get('id'),
              state: {modal: true}
            }}>{item.get('name')}</Link>
            <p>¥{item.get('retailPrice')}</p>
          </div>
        ))
      }
    </div>
  )
}
export default memo(NewGoods);