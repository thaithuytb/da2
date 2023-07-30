import { useEffect, useState } from 'react'
import '../css/map.css'
import '../css/chart.css'
import { HistoryAPI } from '../api/history';
import { Select, Tooltip } from 'antd';
import { CoordinateAPI } from '../api/coordinate';
import { useLocation } from "react-router";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import dayjs from 'dayjs';

interface Item {
  key?: number
  value: string
  label: string
  history: any
}

const Chart = () => {
  const historyAPI = new HistoryAPI();
  const location = useLocation()
  // const { data } = location.state
  const [listItems, setListItems] = useState<Item[] | []>([])
  const [history, setHistory] = useState<any>()
  const coordinateAPI = new CoordinateAPI();
  const [listHeart, setListHeart] = useState<any[] | undefined>([])

  useEffect(() => {
    if (location.state?.data) {
      setHistory(location.state.data.history)
      setListHeart(location.state.data.data?.heartRate ? location.state.data.data?.heartRate : [])
    }
  }, [location.state])

  const onChange = async (value: string) => {
    const history = listItems.find((item) => item.value === value)
    if (history) {
      setHistory(value)
      try {
        const respones = await coordinateAPI.getCoordinates({ name: value })
        if (respones.success) {
          setListHeart(respones.data?.heartRate ? respones.data?.heartRate : [])
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
    <div className='chart'>
      <header>
        <Select
          style={{ minWidth: 200}}
          placeholder={"Chọn lịch sử di chuyển"}
          showSearch
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          options={listItems}
          value={history}
        />
      </header>
      {listHeart?.length ? <div style={{ width: "100%" }} id="chart">
                              <ResponsiveContainer width="100%" height={250}>
                                <LineChart margin={{ top: 30, bottom: 5 }}>
                    {/* bảng chú thich */}

                    <Legend
                      width={150}
                      wrapperStyle={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #d5d5d5",
                        borderRadius: 3,
                        fontSize: "15px",
                        textAlign: "start",
                        // height: 70,
                        padding: 7,
                      }}
                      align="left"
                    />
                    <XAxis
                      dataKey="createdAt"
                      name="createdAt"
                      // type="number"
                      // allowDecimals={false}
                      // tickCount={14}
                      // domain={[0, 24]}
                      tickFormatter={(value) => {
                        return `${value}h`;
                      }}
                    />
                    <YAxis domain={[0, 150]} width={30} />

                    {/* hover vào từng cột */}
                    {/* <Tooltip
                      labelFormatter={(value) => {
                        const hour = Math.floor(parseFloat(value));
                        const minute = Math.round(
                          (parseFloat(value) - hour) * 60
                        );
                        return `Thời gian: ${dayjs()
                          .hour(hour)
                          .minute(minute)
                          .format("h[h]mm[m]")}`;
                      }}
                    /> */}

                    {/* ô kẻ trong đồ thị */}
                    {/* <CartesianGrid stroke="#ccc" strokeDasharray="1 2" /> */}
                    <Line
                      type="monotone"
                      dataKey="heartRate"
                      name="Nhịp tim"
                      data={listHeart.map(
                        (item: any) => {
                          const hours =
                            dayjs(item.created).hour() +
                            dayjs(item.created).hour() / 60;
                          return {
                            heartRate: item.heartRate,
                            createdAt: hours.toFixed(2),
                          };
                        }
                      )}
                      stroke="red"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>: <p style={{ color: '#999'}}>Không có dữ liệu</p>}
    </div>
  )
}

export default Chart
