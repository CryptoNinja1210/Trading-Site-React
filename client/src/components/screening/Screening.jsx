import { useSelector } from "react-redux"
import BreadCrumb from "../layout/BreadCrumb"
import PageDescription from "../layout/PageDescription"
import { Button, DatePicker } from "antd"
import { useRef, useState } from "react"

const Screening = () => {
	const { strategies } = useSelector(({backtesting}) => backtesting)
	const [showModal, setShowModal] = useState(false)
	const [date, setDate] = useState('')
	const [targetIndex, setTargetIndex] = useState('')
	const datepickerRef = useRef();
	const onDateChange = (date,dateString) => {
		setDate(dateString);
	};
	const handleCreateModal = () => {
		setShowModal((prev)=>!prev)
	}
	return (
		<div className="container-fluid">
			<BreadCrumb  props={window.location.pathname} />
			<PageDescription page="screening"/>
			<div className="datepicker-screening" style={{display:showModal ? "flex" : "none"}}>
				<Button onClick={() => datepickerRef.current.focus()}>Date</Button>
				<DatePicker onChange={onDateChange} ref={datepickerRef} placement='bottomleft' /><br/>
				<Button onClick={() => datepickerRef.current.focus()}>Date</Button>
			</div>
			<Button type='primary' onClick={handleCreateModal}>{strategies.length == 0 ?'Create New Strategy':'Customize Criteria and Run Test'}</Button>
			<h2>{targetIndex}</h2>
		</div>
	)
}

export default Screening