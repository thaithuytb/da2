import { useEffect, useState } from 'react'
import '../css/map.css'
import { HistoryAPI } from '../api/history';
import { Select } from 'antd';
import { CoordinateAPI } from '../api/coordinate';
import { useLocation } from "react-router";

interface Item {
  key?: number
  value: string
  label: string
  history: any
}

const Chart = () => {
  const historyAPI = new HistoryAPI();
  const location = useLocation()
  const { data } = location.state
  const [listItems, setListItems] = useState<Item[] | []>([])
  const [history, setHistory] = useState<any>('')
  const coordinateAPI = new CoordinateAPI();

  useEffect(() => {
    if (data) {
      setHistory(data.history)
      console.log(data.data)
    }
  }, [data])

  const onChange = async (value: string) => {
    const history = listItems.find((item) => item.value === value)
    if (history) {
      setHistory(value)
      try {
        const respones = await coordinateAPI.getCoordinates({ name: value })
        if (respones.success) {
          console.log(respones)
        }
      } catch (error) {

      }
    }
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };


  useEffect(() => {
    (async () => {
      const response = await historyAPI.getHistories()
      if (response.success) {
        const items = response.data.histories.map((item: any, index: number) => (
          {
            key: index,
            value: item.name,
            label: item.name,
            historie: item
          }
        ))
        setListItems(items)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <header>
        <Select
          showSearch
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          options={listItems}
          value={history}
          placeholder={"Chọn cuoc chay muon xem"}
        />
      </header>
    </div>
  )
}

export default Chart