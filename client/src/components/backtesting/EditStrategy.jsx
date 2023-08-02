import React, { useRef, useState } from "react";
import { CloseCircleOutlined, DeleteFilled, DeleteOutlined, DownOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Input } from "antd";
import { useDispatch } from "react-redux";
import { addStrategy } from "../../actions/backtesting";

const EditStrategy = ({showSection, setShowEditSection, status}) => {

	const includeItemLists = {
		"Exchange":[
			"Indices",
			"Nasdaq CM",
			"Nasdaq GM",
			"Nasdaq GS",
			"NYSE",
			"NYSE Arca",
			"NYSE MKT",
		],
		"Index Components":[
			'Dow Jones 30',
			"NASDAQ 100",
			"S&P 100",
			"S&P 500"
		],
		"US ETFs":[
			"All ETFs"
		],
		"Watch List":[],
		"Specific":[],
		"US Sector":[
			"Basic Materials",
			"Communication Services",
			"Conglomerates",
			"Consumer Cyclical",
			"Consumer Defensive",
			"Consumer Goods",
			"Energy",
			"Financial",
			"Financial Services",
			"Healthcare",
			"Industrial Goods",
			"Industrials",
			"Real Estate",
			"Services",
			"Technology",
			"Utilities",
		],
		"US Industry":[],
	}
	const [ includeValue, setIncludeValue ] = useState('Exchange')
	const [ indexValue, setIndexValue ] = useState(Object.keys(includeItemLists).reduce((initial, keys) => {return {...initial, [keys]:[]}},{}))
	const [ showDropdownMenu, setShowDropdownMenu ] = useState(false)
	const [ showSubDropdownMenu, setShowSubDropdownMenu ] = useState(false)
	const [ criteriaNum, setCriteriaNum ] = useState(1)
	const [ criteria, setCriteria ] = useState([
		{
			interval:'Daily',
			parameter:'High',
			condition:'equal to',
			standard:'High 52',
		},
	])
	const [ strategyName, setStrategyName ] = useState('')

	const dispatch = useDispatch()
	const handleSubmit = () => {
		// dispatch(addStrategy(strategyName));
	}
	const submenuList = useRef();
	const handleMenuClick = () => {
		setShowDropdownMenu((prev)=>!prev)
		setShowSubDropdownMenu(false)
	}
	const handleDropdown1 = (label) => {
		setIncludeValue(label);
		()=>submenuList.current.focus();
		setShowDropdownMenu(false);
		setShowSubDropdownMenu(true);
	}
	const handleSubMenuClick = () => {
		setShowSubDropdownMenu((prev)=>!prev);
		setShowDropdownMenu(false)
	}
	const handleDropdown2 = (label) => {
		setIndexValue({
			...indexValue,
			[includeValue]: indexValue[includeValue].indexOf(label) == -1 ?
											[...indexValue[includeValue],label] : 
											[...indexValue[includeValue]].filter((item)=>item !== label)
		})
		console.log(indexValue);
	}
	const handleInputChange = (e) => {
		setStrategyName(e.target.value)
	}
	const arr = new Array(3).fill(0);
	const handleCheck = (e) => {
		console.log(e.target.id)
	}
	const handleNewCriteria = () => {
		setCriteriaNum((prev) => prev+1)
	}
	return (
		<div className="edit-strategy-section" style={{display:showSection?'block':'none'}}>
			<Card
				size="small"
				title={status == 'new' ? 'Customize Criteria':'Customize Criteria and Run Test'}
				extra={<a onClick={()=>setShowEditSection(false)}><CloseCircleOutlined /></a>}
				style={{
					width: "600px",
					margin:"5px 0"
				}}
			>
				<h5>Exchange, Index, Watch List, Symbols...</h5>
				<div className="d-flex" style={{alignItems:"start"}}>
					<h4 style={{marginTop:"5px"}}>Include</h4>
					<div style={{margin:"5px"}}>
						<Button size="small" onClick={handleMenuClick}>
							{includeValue}
							<DownOutlined style={{fontSize:"8px",position:"relative", display:"inline-block"}}/>
						</Button>
						<div style={{
							border:"1px solid lightgrey", 
							padding:"0 10px",
							borderRadius:"5px",
							display:showDropdownMenu ? "block":"none"
						}}>
							<ul style={{textAlign:"start"}}>
								{Object.keys(includeItemLists).map((item, i) => <a key={`${i}_${item}`} onClick={()=>handleDropdown1(item)}><li>{item}</li></a>)}
							</ul>
						</div>
					</div>
					<div style={{margin:"5px"}}>
						<Button ref={submenuList} size="small" onClick={handleSubMenuClick} style={{maxWidth:"200px", alignItems:"center", display:"flex", fontSize:"12px"}}><div style={{maxWidth:"170px",overflow:"hidden"}}>
							{
								indexValue[includeValue].length == 0 ?
									'none':
									indexValue[includeValue].length <= 2 ?
										indexValue[includeValue].join(',') :
										`${indexValue[includeValue].length} items selected`
							}
							</div><DownOutlined style={{fontSize:"8px",position:"relative",marginLeft:"5px" }}/>
						</Button>
						<div style={{
							border:"1px solid lightgrey", 
							padding:"0 10px",
							borderRadius:"5px",
							display:showSubDropdownMenu ? "block":"none"
						}}>
							<ul style={{textAlign:"start"}}>
								{includeItemLists[includeValue].map((item, i) => <li key={`${includeValue}_${item}`}><Checkbox onChange={()=>handleDropdown2(item)} checked={indexValue[includeValue].indexOf(item) !== -1}>{item}</Checkbox></li>)}
							</ul>
						</div>
					</div>
				</div>
				<h4>Screening Criteria</h4>
				{Array(criteriaNum).fill(0).map((item, i) => 
					<div style={{margin:"5px 0"}} key={`${i}_${item}`}>
						<Button size="small" style={{marginRight:"5px"}}><DeleteOutlined /></Button>
						<Button size="small" style={{marginRight:"5px"}}><UpOutlined /></Button>
						<Button size="small" style={{marginRight:"5px"}}><DownOutlined /></Button>
						<Checkbox id={i} onChange={handleCheck}></Checkbox>
					</div>
				)}
				<Button onClick={handleNewCriteria} size="small" type="primary" style={{marginBottom:"5px"}}><PlusOutlined />New Criteria</Button>
				<div className="d-flex">
					<Button type="primary" size="small" onClick={handleSubmit}>Run Test</Button>
					<Input type="text" value={strategyName} size="small" style={{width:"200px"}} onChange={handleInputChange}/>
				</div>
			</Card>
		</div>
	)
}

export default EditStrategy