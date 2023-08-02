import { useDispatch } from "react-redux"
import { addStrategy } from "../../actions/backtesting"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";

const CreateStrategyBtn = ({ setShowModal, role }) => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onClick = () => {
		if (role == 'create') {
			dispatch(addStrategy());
			// window.location.href = '/dashboard';
			navigate('/backtestig/strategy/test1', { replace : false })
		} else {
			setShowModal((prev) => !prev)
		}
	}
	return (
		<Button type='primary' onClick={onClick}>
			{
				role !== 'create' ?
					'Customize Criteria and Run Test'
					:
					<><PlusOutlined style={{margin:"0 5px 0 -10px"}}/>Create New Strategy</>
			}
		</Button>
	)
}

export default CreateStrategyBtn