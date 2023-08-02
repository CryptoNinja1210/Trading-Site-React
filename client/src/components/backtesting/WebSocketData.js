import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getDefaultStrategies } from "../../actions/backtesting";
import Spinner from "../layout/Spinner";

const apiCall = {
    event: 'bts:subscribe',
    data: { channel: 'order_book_btcusd' },
};

const WebSocketData = () => {

    const [bids, setBids] = useState([0]);

    const dispatch = useDispatch()
    const {defaultStrategies, loading} = useSelector(({backtesting}) => backtesting)
    const [stateDefaultStrategies, setStateDefaultStategies] = useState('')

    useEffect(() => {
        dispatch(getDefaultStrategies())
    },[getDefaultStrategies])

    const ws = new WebSocket('wss://ws.bitstamp.net');
    useEffect(() => {
        ws.onopen = (event) => {
            ws.send(JSON.stringify(apiCall));
        };
        ws.onmessage = function (event) {
            const json = JSON.parse(event.data);
            try {
                if ((json.event == 'data')) {
                    setBids(json.data.bids.slice(0, 10));
                    // console.log(json)
                }
            } catch (err) {
                console.log(err);
            }
        };
        //clean up function
        return () => ws.close();
    }, []);
    // ws.close();
    useEffect(()=> {
        setTimeout(() => {
            ws.close();
            console.log('closed')
        }, 10000);
    },[])
    const firstBids = bids.map((item, index) => (
        <div key={index}>
            <p> {item}</p>
        </div>
    ));

    useEffect(() => {
        setStateDefaultStategies(defaultStrategies)
    },[defaultStrategies])

    // console.log(defaultStrategies[0].subject)

    return loading || defaultStrategies == null ?
     <Spinner /> :
    (
        <div className="container-fluid">
            <ul>
                <li>
                    This is a Web Socket API live data fetching test.
                </li>
                <li>
                    As you can see, Web Socket API is working well.
                </li>
                {/* {stateDefaultStrategies.map((item) => <li>{item.subject}</li>)} */}
            </ul>
            <div>{firstBids}</div>
        </div>
    )
}

export default WebSocketData