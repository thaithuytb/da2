import React, { useEffect, useState } from 'react';
import '../css/history.css'
import { useNavigate } from 'react-router-dom';
import { HistoryAPI } from '../api/history';
import dayjs from 'dayjs';

interface IListHistory {
  createdAt: string
  deviceId: number
  id: number
  name: string
  updatedAt: string
}

const History = () => {
  const historyAPI = new HistoryAPI();

  const navigate = useNavigate()
  const [listHistory, setListHistory] = useState<IListHistory[] | []>([])

  const detail = (item: IListHistory) => {
    console.log(item)
    navigate(`/history/${item.id}`, {state: {item: item}})
  }

  useEffect(() => {
    (async () => {
      const response = await historyAPI.getHistories()
      if(response.success){
        console.log(response.data.histories)
        const newData = response.data.histories.map((item: IListHistory) => ({
          ...item,
          createdAt: dayjs(item.createdAt).format("DD-MM-YYYY")
        }))
        setListHistory(newData)
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='history'>
      <div>
        <h4 style={{padding: ' 10px 0 0 10px'}}>Lịch sử theo dõi: </h4>
      </div>
      {listHistory.map((item: IListHistory, index: number) => {
        return (
          <div style={{display: 'flex', position:'relative', width:'100%'}}>
            <div key={index} className='history-item' onClick={() => detail(item)}>
              <span>{item.name}</span>
              <span>{item.createdAt}</span>
            </div>
            <div id='circle'>1</div>
          </div>
          
        )
      })}
    </div>
  )
}

export default History